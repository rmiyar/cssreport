from django.urls import path

from . import views

app_name = "gestion"

urlpatterns = [
    path("", views.panel_gestion, name="panel"),
    path("gestion/<slug:slug>/", views.detalle_modulo, name="detalle_modulo"),
]
