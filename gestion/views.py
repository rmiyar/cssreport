from django.contrib import messages
from django.core.paginator import Paginator
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from django.shortcuts import render

from .forms import FormularioInscripcion
from .modulos import MODULOS_GESTION
from .models import Inscripcion


def panel_gestion(request):
    contexto = {
        "modulos": MODULOS_GESTION,
        "seccion_activa": "gestion",
        "usuario_actual": {
            "iniciales": "AD",
            "nombre": "Administrador",
        },
    }
    return render(request, "gestion/panel.html", contexto)


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
        "modulo": modulo,
        "seccion_activa": "gestion",
        "mostrar_barra_lateral": False,
        "usuario_actual": {
            "iniciales": "AD",
            "nombre": "Administrador",
        },
    }
    return render(request, "gestion/inscripcion.html", contexto)
