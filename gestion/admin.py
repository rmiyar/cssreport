from django.contrib import admin

from .models import CalculoDiasExpediente
from .models import Feriado


@admin.register(Feriado)
class FeriadoAdmin(admin.ModelAdmin):
    list_display = ("fecha", "nombre", "activo")
    list_filter = ("activo",)
    search_fields = ("nombre",)
    ordering = ("fecha",)


@admin.register(CalculoDiasExpediente)
class CalculoDiasExpedienteAdmin(admin.ModelAdmin):
    list_display = (
        "inscripcion",
        "fecha_inicial",
        "fecha_final",
        "total_dias",
        "dias_habiles",
        "fines_semana",
        "feriados",
    )
    list_filter = ("fecha_inicial", "fecha_final")
    search_fields = (
        "inscripcion__nombre_establecimiento",
        "inscripcion__empleador_razon_social",
        "inscripcion__numero_sipe",
    )
