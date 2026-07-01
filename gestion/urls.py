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
    path("gestion/<slug:slug>/", views.detalle_modulo, name="detalle_modulo"),
]
