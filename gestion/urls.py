from django.urls import path

from . import views

app_name = "gestion"

urlpatterns = [
    path("", views.panel_gestion, name="panel"),
    path(
        "gestion/reactivacion/guardar/",
        views.guardar_reactivacion,
        name="guardar_reactivacion",
    ),
    path(
        "gestion/operativos/guardar/",
        views.guardar_operativo,
        name="guardar_operativo",
    ),
    path(
        "gestion/inactividad/guardar/",
        views.guardar_inactividad,
        name="guardar_inactividad",
    ),
    path(
        "gestion/planilla/guardar/",
        views.guardar_planilla,
        name="guardar_planilla",
    ),
    path(
        "gestion/movimientos/guardar/",
        views.guardar_movimientos,
        name="guardar_movimientos",
    ),
    path("gestion/calculo-dias/calcular/", views.calcular_dias, name="calcular_dias"),
    path(
        "gestion/calculo-dias/guardar/",
        views.guardar_calculo_dias,
        name="guardar_calculo_dias",
    ),
    path("gestion/feriados/guardar/", views.guardar_feriado, name="guardar_feriado"),
    path("gestion/feriados/eliminar/", views.eliminar_feriado, name="eliminar_feriado"),
    path(
        "gestion/informe-inscripcion/guardar/",
        views.guardar_informe_inscripcion,
        name="guardar_informe_inscripcion",
    ),
    path("gestion/<slug:slug>/", views.detalle_modulo, name="detalle_modulo"),
]
