from django.http import Http404
from django.contrib import messages
from django.shortcuts import redirect
from django.shortcuts import render

from .forms import FormularioInscripcion
from .modulos import MODULOS_GESTION


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
    formulario = FormularioInscripcion(request.POST or None)

    if request.method == "POST" and formulario.is_valid():
        formulario.save()
        messages.success(request, "La inscripción fue validada correctamente.")
        return redirect("gestion:detalle_modulo", slug=modulo["slug"])

    contexto = {
        "formulario": formulario,
        "modulo": modulo,
        "seccion_activa": "gestion",
        "mostrar_barra_lateral": False,
        "usuario_actual": {
            "iniciales": "AD",
            "nombre": "Administrador",
        },
    }
    return render(request, "gestion/inscripcion.html", contexto)
