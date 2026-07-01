import json

from django.contrib import messages
from django.core.paginator import Paginator
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
from .models import Inactividad
from .models import Operativo
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
    registros_operativos = Inscripcion.objects.all()
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
        "operativos_guardados": operativos_guardados,
        "total_operativos": registros_operativos.count() + operativos_guardados.count(),
        "reactivaciones": reactivaciones,
        "reactivaciones_datos": reactivaciones_datos,
        "inactividades": inactividades,
        "inactividades_datos": inactividades_datos,
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
