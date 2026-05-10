from django.db import models


class Inscripcion(models.Model):
    TIPO_ACTIVIDAD_EMPRESAS = "empresas"
    TIPO_ACTIVIDAD_CONSTRUCCION = "construccion"

    TIPOS_ACTIVIDAD = [
        (TIPO_ACTIVIDAD_EMPRESAS, "Empresas"),
        (TIPO_ACTIVIDAD_CONSTRUCCION, "Construcción"),
    ]

    TIPOS_CEDULA_REPRESENTANTE = [
        ("", "Seleccione"),
        ("nacional", "Nacional"),
        ("extranjera", "Extranjera"),
        ("pasaporte", "Pasaporte"),
    ]

    numero_registro = models.CharField(max_length=20, blank=True, default="1")
    fecha_operacion = models.DateField(null=True, blank=True)
    tipo_actividad = models.CharField(
        max_length=20,
        choices=TIPOS_ACTIVIDAD,
        default=TIPO_ACTIVIDAD_EMPRESAS,
    )
    letra_binding_case = models.CharField(max_length=15, blank=True)
    numero_sipe = models.CharField(max_length=50, blank=True)
    numero_mainframe = models.CharField(max_length=50, blank=True)
    nombre_establecimiento = models.CharField(max_length=180)
    empleador_razon_social = models.CharField(max_length=180)
    cedula_ruc = models.CharField(max_length=80)
    telefono = models.CharField(max_length=30, blank=True)
    celular = models.CharField(max_length=30, blank=True)
    representante_legal = models.CharField(max_length=160, blank=True)
    tipo_cedula_representante = models.CharField(
        max_length=20,
        choices=TIPOS_CEDULA_REPRESENTANTE,
        blank=True,
    )
    cedula_representante = models.CharField(max_length=80, blank=True)
    direccion_establecimiento = models.CharField(max_length=220, blank=True)
    numero_entrevistados = models.PositiveIntegerField(null=True, blank=True)
    monto_salarios = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
    )
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "inscripción"
        verbose_name_plural = "inscripciones"
        ordering = ["-creado_en"]

    def __str__(self):
        return f"{self.nombre_establecimiento} - {self.cedula_ruc}"
