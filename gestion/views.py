import json
from datetime import date
from datetime import timedelta

from django.contrib import messages
from django.core.paginator import Paginator
from django.db import transaction
from django.http import Http404
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from django.shortcuts import render
from django.views.decorators.http import require_POST

from .forms import FormularioInscripcion
from .forms import FormularioOperativo
from .modulos import MODULOS_GESTION
from .models import Inscripcion
from .models import InformeInscripcion
from .models import CalculoDiasExpediente
from .models import Feriado
from .models import Inactividad
from .models import MovimientoAvance
from .models import Operativo
from .models import PlanillaOperativo
from .models import Reactivacion


def panel_gestion(request):
    modulo_inscripcion = next(
        (modulo for modulo in MODULOS_GESTION if modulo["slug"] == "inscripcion"),
        None,
    )
    if modulo_inscripcion is None:
        raise Http404("El módulo de inscripción no existe.")

    return formulario_inscripcion(request, modulo_inscripcion)


def detalle_modulo(request, slug):
    modulo = next(
        (modulo for modulo in MODULOS_GESTION if modulo["slug"] == slug),
        None,
    )
    if modulo is None:
        raise Http404("El módulo solicitado no existe.")

    if slug == "inscripcion":
        return formulario_inscripcion(request, modulo)

    contexto = {
        "modulo": modulo,
        "seccion_activa": "gestion",
        "usuario_actual": {
            "iniciales": "AD",
            "nombre": "Administrador",
        },
    }
    return render(request, "gestion/detalle_modulo.html", contexto)


def formulario_inscripcion(request, modulo):
    inscripcion_id = request.GET.get("editar")
    inscripcion_en_edicion = None

    if inscripcion_id:
        inscripcion_en_edicion = get_object_or_404(Inscripcion, pk=inscripcion_id)

    formulario = FormularioInscripcion(
        request.POST or None,
        instance=inscripcion_en_edicion,
    )
    paginador = Paginator(Inscripcion.objects.all(), 5)
    pagina_inscripciones = paginador.get_page(request.GET.get("pagina"))
    total_inscripciones = Inscripcion.objects.count()
    ultima_inscripcion = Inscripcion.objects.first()
    registros_operativos = Inscripcion.objects.all().order_by(
        "-fecha_operacion",
        "-creado_en",
    )
    registros_movimientos = Inscripcion.objects.select_related(
        "movimiento_avance"
    ).order_by("-fecha_operacion", "-creado_en")
    expedientes_calculo = Inscripcion.objects.order_by(
        "nombre_establecimiento",
        "empleador_razon_social",
    )
    feriados_configurados = Feriado.objects.order_by("fecha")
    registros_informe_inscripcion = Inscripcion.objects.filter(
        tipo_gestion=Inscripcion.TIPO_GESTION_INSCRIPCION
    ).select_related("informe_inscripcion").order_by("nombre_establecimiento")
    informes_inscripcion_datos = {
        str(registro.pk): registro.informe_inscripcion.datos
        for registro in registros_informe_inscripcion
        if hasattr(registro, "informe_inscripcion")
    }
    calculos_inscripcion_datos = {}
    for registro in registros_informe_inscripcion:
        calculo = registro.calculos_dias.first()
        if calculo:
            calculos_inscripcion_datos[str(registro.pk)] = {
                "total_dias": calculo.total_dias,
                "dias_habiles": calculo.dias_habiles,
                "dias_libres": calculo.fines_semana + calculo.feriados,
            }
    operativos_guardados = Operativo.objects.all()
    reactivaciones = list(Inscripcion.objects.filter(
        tipo_gestion=Inscripcion.TIPO_GESTION_REACTIVACION
    ).select_related("formulario_reactivacion"))
    reactivaciones_datos = {
        str(inscripcion.pk): inscripcion.formulario_reactivacion.datos
        for inscripcion in reactivaciones
        if hasattr(inscripcion, "formulario_reactivacion")
    }
    inactividades = list(Inscripcion.objects.filter(
        tipo_gestion=Inscripcion.TIPO_GESTION_CIERRE
    ).select_related("formulario_inactividad"))
    inactividades_datos = {
        str(inscripcion.pk): inscripcion.formulario_inactividad.datos
        for inscripcion in inactividades
        if hasattr(inscripcion, "formulario_inactividad")
    }
    planillas_datos = {
        str(planilla.inscripcion_id): planilla.datos
        for planilla in PlanillaOperativo.objects.select_related("inscripcion")
    }

    if request.method == "POST" and formulario.is_valid():
        formulario.save()
        if inscripcion_en_edicion:
            messages.success(request, "La inscripción fue actualizada correctamente.")
        else:
            messages.success(request, "La inscripción fue validada correctamente.")
        return redirect("gestion:detalle_modulo", slug=modulo["slug"])

    contexto = {
        "formulario": formulario,
        "inscripcion_en_edicion": inscripcion_en_edicion,
        "inscripciones": pagina_inscripciones,
        "total_inscripciones": total_inscripciones,
        "ultima_inscripcion": ultima_inscripcion,
        "registros_operativos": registros_operativos,
        "registros_movimientos": registros_movimientos,
        "expedientes_calculo": expedientes_calculo,
        "total_feriados_configurados": Feriado.objects.filter(activo=True).count(),
        "feriados_configurados": feriados_configurados,
        "registros_informe_inscripcion": registros_informe_inscripcion,
        "informes_inscripcion_datos": informes_inscripcion_datos,
        "calculos_inscripcion_datos": calculos_inscripcion_datos,
        "operativos_guardados": operativos_guardados,
        "total_operativos": registros_operativos.count() + operativos_guardados.count(),
        "tipos_gestion": Inscripcion.TIPOS_GESTION,
        "reactivaciones": reactivaciones,
        "reactivaciones_datos": reactivaciones_datos,
        "inactividades": inactividades,
        "inactividades_datos": inactividades_datos,
        "planillas_datos": planillas_datos,
        "modulo": modulo,
        "seccion_activa": "gestion",
        "mostrar_barra_lateral": False,
        "usuario_actual": {
            "iniciales": "AD",
            "nombre": "Administrador",
        },
    }
    return render(request, "gestion/inscripcion.html", contexto)


@require_POST
def guardar_planilla(request):
    try:
        contenido = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse(
            {"ok": False, "mensaje": "Los datos enviados no son vÃ¡lidos."},
            status=400,
        )

    inscripcion_id = contenido.get("inscripcion_id")
    datos = contenido.get("datos")
    if not inscripcion_id or not isinstance(datos, dict):
        return JsonResponse(
            {"ok": False, "mensaje": "Seleccione un establecimiento vÃ¡lido."},
            status=400,
        )

    try:
        inscripcion = Inscripcion.objects.get(pk=inscripcion_id)
    except Inscripcion.DoesNotExist:
        return JsonResponse(
            {"ok": False, "mensaje": "El establecimiento seleccionado no existe."},
            status=404,
        )

    planilla, creada = PlanillaOperativo.objects.update_or_create(
        inscripcion=inscripcion,
        defaults={"datos": datos},
    )
    return JsonResponse(
        {
            "ok": True,
            "mensaje": (
                "La planilla fue guardada correctamente."
                if creada
                else "La planilla fue actualizada correctamente."
            ),
            "datos": planilla.datos,
        }
    )


@require_POST
def guardar_movimientos(request):
    try:
        contenido = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse(
            {"ok": False, "mensaje": "Los datos enviados no son válidos."},
            status=400,
        )

    registros = contenido.get("registros")
    if not isinstance(registros, list):
        return JsonResponse(
            {"ok": False, "mensaje": "No se recibieron avances para guardar."},
            status=400,
        )

    avances = {}
    for registro in registros:
        if not isinstance(registro, dict):
            return JsonResponse(
                {"ok": False, "mensaje": "Hay un avance con formato incorrecto."},
                status=400,
            )
        inscripcion_id = registro.get("inscripcion_id")
        avance = registro.get("avance", "")
        if not isinstance(inscripcion_id, int) or not isinstance(avance, str):
            return JsonResponse(
                {"ok": False, "mensaje": "Hay un avance con datos incorrectos."},
                status=400,
            )
        avance = avance.strip()
        if len(avance) > 1000:
            return JsonResponse(
                {"ok": False, "mensaje": "Cada comentario admite hasta 1000 caracteres."},
                status=400,
            )
        avances[inscripcion_id] = avance

    inscripciones = {
        inscripcion.pk: inscripcion
        for inscripcion in Inscripcion.objects.filter(pk__in=avances)
    }
    if len(inscripciones) != len(avances):
        return JsonResponse(
            {"ok": False, "mensaje": "Uno de los registros ya no existe."},
            status=404,
        )

    with transaction.atomic():
        for inscripcion_id, avance in avances.items():
            MovimientoAvance.objects.update_or_create(
                inscripcion=inscripciones[inscripcion_id],
                defaults={"avance": avance},
            )

    return JsonResponse(
        {
            "ok": True,
            "mensaje": "Los avances fueron guardados correctamente.",
            "actualizados": len(avances),
        }
    )


NOMBRES_DIAS = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
]


def calcular_rango_dias(fecha_inicial, fecha_final):
    feriados = {
        feriado.fecha: feriado.nombre
        for feriado in Feriado.objects.filter(
            activo=True,
            fecha__range=(fecha_inicial, fecha_final),
        )
    }
    detalle = []
    dias_habiles = 0
    fines_semana = 0
    total_feriados = 0
    fecha_actual = fecha_inicial

    while fecha_actual <= fecha_final:
        motivo = feriados.get(fecha_actual, "")
        if motivo:
            condicion = "Feriado"
            total_feriados += 1
        elif fecha_actual.weekday() >= 5:
            condicion = "Fin de semana"
            fines_semana += 1
        else:
            condicion = "Día hábil"
            dias_habiles += 1

        detalle.append(
            {
                "fecha": fecha_actual.isoformat(),
                "fecha_texto": fecha_actual.strftime("%d/%m/%Y"),
                "dia": NOMBRES_DIAS[fecha_actual.weekday()],
                "condicion": condicion,
                "motivo": motivo,
            }
        )
        fecha_actual += timedelta(days=1)

    return {
        "total_dias": len(detalle),
        "dias_habiles": dias_habiles,
        "fines_semana": fines_semana,
        "feriados": total_feriados,
        "detalle": detalle,
    }


def obtener_fechas_calculo(contenido):
    try:
        fecha_inicial = date.fromisoformat(contenido.get("fecha_inicial", ""))
        fecha_final = date.fromisoformat(contenido.get("fecha_final", ""))
    except (TypeError, ValueError):
        return None, None, "Introduzca fechas válidas."

    if fecha_inicial > fecha_final:
        return None, None, "La fecha inicial no puede ser posterior a la fecha final."
    if (fecha_final - fecha_inicial).days > 3660:
        return None, None, "El rango no puede superar diez años."
    return fecha_inicial, fecha_final, ""


@require_POST
def calcular_dias(request):
    try:
        contenido = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"ok": False, "mensaje": "Los datos no son válidos."}, status=400)

    fecha_inicial, fecha_final, error = obtener_fechas_calculo(contenido)
    if error:
        return JsonResponse({"ok": False, "mensaje": error}, status=400)

    return JsonResponse({"ok": True, **calcular_rango_dias(fecha_inicial, fecha_final)})


@require_POST
def guardar_calculo_dias(request):
    try:
        contenido = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"ok": False, "mensaje": "Los datos no son válidos."}, status=400)

    fecha_inicial, fecha_final, error = obtener_fechas_calculo(contenido)
    if error:
        return JsonResponse({"ok": False, "mensaje": error}, status=400)

    try:
        inscripcion = Inscripcion.objects.get(pk=contenido.get("inscripcion_id"))
    except (Inscripcion.DoesNotExist, TypeError, ValueError):
        return JsonResponse(
            {"ok": False, "mensaje": "Seleccione un expediente válido."},
            status=400,
        )

    resultado = calcular_rango_dias(fecha_inicial, fecha_final)
    calculo = CalculoDiasExpediente.objects.create(
        inscripcion=inscripcion,
        fecha_inicial=fecha_inicial,
        fecha_final=fecha_final,
        total_dias=resultado["total_dias"],
        dias_habiles=resultado["dias_habiles"],
        fines_semana=resultado["fines_semana"],
        feriados=resultado["feriados"],
        detalle=resultado["detalle"],
    )
    return JsonResponse(
        {
            "ok": True,
            "mensaje": "El cálculo fue guardado en el expediente.",
            "calculo_id": calculo.pk,
            **resultado,
        },
        status=201,
    )


@require_POST
def guardar_feriado(request):
    try:
        contenido = json.loads(request.body)
        fecha_feriado = date.fromisoformat(contenido.get("fecha", ""))
    except (json.JSONDecodeError, UnicodeDecodeError, TypeError, ValueError):
        return JsonResponse({"ok": False, "mensaje": "Introduzca una fecha válida."}, status=400)

    nombre = str(contenido.get("nombre", "")).strip()
    if not nombre:
        return JsonResponse({"ok": False, "mensaje": "Escriba el nombre del feriado."}, status=400)
    if len(nombre) > 180:
        return JsonResponse({"ok": False, "mensaje": "El nombre admite hasta 180 caracteres."}, status=400)

    feriado_id = contenido.get("feriado_id")
    feriado = Feriado.objects.filter(pk=feriado_id).first() if feriado_id else None
    if feriado_id and feriado is None:
        return JsonResponse({"ok": False, "mensaje": "El feriado ya no existe."}, status=404)
    if Feriado.objects.filter(fecha=fecha_feriado).exclude(pk=getattr(feriado, "pk", None)).exists():
        return JsonResponse({"ok": False, "mensaje": "Ya existe un feriado para esa fecha."}, status=400)

    if feriado is None:
        feriado = Feriado()
    feriado.fecha = fecha_feriado
    feriado.nombre = nombre
    feriado.activo = contenido.get("activo") is not False
    feriado.save()

    return JsonResponse(
        {
            "ok": True,
            "mensaje": "Feriado guardado correctamente.",
            "feriado": {
                "id": feriado.pk,
                "fecha": feriado.fecha.isoformat(),
                "fecha_texto": feriado.fecha.strftime("%d/%m/%Y"),
                "nombre": feriado.nombre,
                "activo": feriado.activo,
            },
        }
    )


@require_POST
def guardar_informe_inscripcion(request):
    try:
        contenido = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"ok": False, "mensaje": "Los datos no son válidos."}, status=400)

    inscripcion_id = contenido.get("inscripcion_id")
    datos = contenido.get("datos")
    if not isinstance(datos, dict):
        return JsonResponse({"ok": False, "mensaje": "El informe tiene un formato incorrecto."}, status=400)
    try:
        inscripcion = Inscripcion.objects.get(
            pk=inscripcion_id,
            tipo_gestion=Inscripcion.TIPO_GESTION_INSCRIPCION,
        )
    except Inscripcion.DoesNotExist:
        return JsonResponse({"ok": False, "mensaje": "Seleccione un registro de inscripción válido."}, status=404)

    informe, creado = InformeInscripcion.objects.update_or_create(
        inscripcion=inscripcion,
        defaults={"datos": datos},
    )
    return JsonResponse(
        {
            "ok": True,
            "mensaje": "El informe de inscripción fue guardado correctamente.",
            "datos": informe.datos,
            "creado": creado,
        }
    )


@require_POST
def eliminar_feriado(request):
    try:
        contenido = json.loads(request.body)
        feriado_id = int(contenido.get("feriado_id"))
    except (json.JSONDecodeError, UnicodeDecodeError, TypeError, ValueError):
        return JsonResponse({"ok": False, "mensaje": "Seleccione un feriado válido."}, status=400)

    try:
        feriado = Feriado.objects.get(pk=feriado_id)
    except Feriado.DoesNotExist:
        return JsonResponse({"ok": False, "mensaje": "El feriado ya no existe."}, status=404)
    feriado.delete()
    return JsonResponse({"ok": True, "mensaje": "Feriado eliminado correctamente."})


@require_POST
def guardar_operativo(request):
    try:
        contenido = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse(
            {"ok": False, "mensaje": "Los datos enviados no son válidos."},
            status=400,
        )

    formulario = FormularioOperativo(contenido)
    if not formulario.is_valid():
        return JsonResponse(
            {
                "ok": False,
                "mensaje": "Revise los campos indicados.",
                "errores": formulario.errors.get_json_data(),
            },
            status=400,
        )

    operativo = formulario.save()
    return JsonResponse(
        {
            "ok": True,
            "mensaje": "El registro operativo fue guardado correctamente.",
            "operativo": {
                "id": operativo.pk,
                "fecha": operativo.fecha.strftime("%d/%m/%Y"),
                "consecutivo": operativo.consecutivo or "-",
                "numero_patronal": operativo.numero_patronal,
                "patrono_1": operativo.patrono_1,
                "patrono_2": operativo.patrono_2,
                "movimiento": operativo.get_movimiento_display(),
                "fecha_informe": operativo.fecha_informe.strftime("%d/%m/%Y") if operativo.fecha_informe else "//",
                "numero_informe": operativo.numero_informe,
                "salario": f"{operativo.salario:.2f}",
                "empleados_nacionales": operativo.empleados_nacionales,
                "empleados_extranjeros": operativo.empleados_extranjeros,
                "entrevistados": operativo.entrevistados,
                "omitidos_nacionales": operativo.omitidos_nacionales,
                "omitidos_extranjeros": operativo.omitidos_extranjeros,
                "sin_ficha": operativo.sin_ficha,
                "recien_ingresados": operativo.recien_ingresados,
                "citados": operativo.citados,
                "no_inscritos": operativo.no_inscritos,
            },
        },
        status=201,
    )


@require_POST
def guardar_inactividad(request):
    try:
        contenido = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"ok": False, "mensaje": "Los datos enviados no son válidos."}, status=400)

    inscripcion_id = contenido.get("inscripcion_id")
    datos = contenido.get("datos")
    if not inscripcion_id or not isinstance(datos, dict):
        return JsonResponse({"ok": False, "mensaje": "Seleccione una gestión válida."}, status=400)

    try:
        inscripcion = Inscripcion.objects.get(pk=inscripcion_id, tipo_gestion=Inscripcion.TIPO_GESTION_CIERRE)
    except Inscripcion.DoesNotExist:
        return JsonResponse({"ok": False, "mensaje": "La gestión de cierre o inactividad no existe."}, status=404)

    inactividad, creada = Inactividad.objects.update_or_create(inscripcion=inscripcion, defaults={"datos": datos})
    return JsonResponse({"ok": True, "mensaje": "La inactividad fue guardada correctamente." if creada else "La inactividad fue actualizada correctamente.", "datos": inactividad.datos})


@require_POST
def guardar_reactivacion(request):
    try:
        contenido = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse(
            {"ok": False, "mensaje": "Los datos enviados no son válidos."},
            status=400,
        )

    inscripcion_id = contenido.get("inscripcion_id")
    datos = contenido.get("datos")

    if not inscripcion_id or not isinstance(datos, dict):
        return JsonResponse(
            {"ok": False, "mensaje": "Debe seleccionar una reactivación válida."},
            status=400,
        )

    try:
        inscripcion = Inscripcion.objects.get(
            pk=inscripcion_id,
            tipo_gestion=Inscripcion.TIPO_GESTION_REACTIVACION,
        )
    except Inscripcion.DoesNotExist:
        return JsonResponse(
            {"ok": False, "mensaje": "La gestión de reactivación no existe."},
            status=404,
        )

    reactivacion, creada = Reactivacion.objects.update_or_create(
        inscripcion=inscripcion,
        defaults={"datos": datos},
    )

    return JsonResponse(
        {
            "ok": True,
            "mensaje": (
                "La reactivación fue guardada correctamente."
                if creada
                else "La reactivación fue actualizada correctamente."
            ),
            "datos": reactivacion.datos,
        }
    )
