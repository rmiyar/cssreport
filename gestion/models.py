from django.db import models


class Inscripcion(models.Model):
    TIPO_GESTION_INSCRIPCION = "inscripcion"
    TIPO_GESTION_MOROSIDAD = "morosidad"
    TIPO_GESTION_RECLAMOS = "reclamos"
    TIPO_GESTION_PLANILLAS = "planillas_complementarias"
    TIPO_GESTION_CASOS_JUEZ = "casos_juez_ejecutor"
    TIPO_GESTION_CIERRE = "cierre_inactividad"
    TIPO_GESTION_TRABAJO_OFICINA = "trabajo_oficina"
    TIPO_GESTION_OPERATIVOS = "operativos"
    TIPO_GESTION_REACTIVACION = "reactivacion"
    TIPO_GESTION_CERTIFICACIONES = "certificaciones"
    TIPO_GESTION_OTROS = "otros"

    TIPO_ACTIVIDAD_EMPRESAS = "empresas"
    TIPO_ACTIVIDAD_CONSTRUCCION = "construccion"
    ESTADO_GESTION_INICIAL = "inicial"
    ESTADO_GESTION_SEGUIMIENTO = "seguimiento"
    ESTADO_GESTION_CITACION = "citacion"
    ESTADO_GESTION_CONCLUSION = "conclusion"
    ESTADO_GESTION_SANCIONES = "sanciones"

    TIPOS_GESTION = [
        (TIPO_GESTION_INSCRIPCION, "1. INSCRIPCION"),
        (TIPO_GESTION_MOROSIDAD, "2. MOROSIDAD"),
        (TIPO_GESTION_RECLAMOS, "3. RECLAMOS"),
        (TIPO_GESTION_PLANILLAS, "4. PLANILLAS COMPLEMENTARIAS"),
        (TIPO_GESTION_CASOS_JUEZ, "5. CASOS DEL JUEZ EJECUTOR"),
        (TIPO_GESTION_CIERRE, "6. CIERRE E INACTIVIDAD"),
        (TIPO_GESTION_TRABAJO_OFICINA, "7. TRABAJO DE OFICINA"),
        (TIPO_GESTION_OPERATIVOS, "8. OPERATIVOS"),
        (TIPO_GESTION_REACTIVACION, "9. REACTIVACION"),
        (TIPO_GESTION_CERTIFICACIONES, "C. CERTIFICACIONES"),
        (TIPO_GESTION_OTROS, "O. OTROS (CITACIONES, CORRECCION)"),
    ]

    TIPOS_ACTIVIDAD = [
        (TIPO_ACTIVIDAD_EMPRESAS, "Empresas"),
        (TIPO_ACTIVIDAD_CONSTRUCCION, "Construcción"),
    ]

    ESTADOS_GESTION = [
        (ESTADO_GESTION_INICIAL, "INICIAL"),
        (ESTADO_GESTION_SEGUIMIENTO, "SEGUIMIENTO"),
        (ESTADO_GESTION_CITACION, "CITACION"),
        (ESTADO_GESTION_CONCLUSION, "CONCLUSION"),
        (ESTADO_GESTION_SANCIONES, "SANCIONES"),
    ]

    TIPOS_CEDULA_REPRESENTANTE = [
        ("", "Seleccione"),
        ("nacional", "Nacional"),
        ("extranjera", "Extranjera"),
        ("pasaporte", "Pasaporte"),
    ]

    numero_registro = models.CharField(max_length=20, blank=True, default="1")
    tipo_gestion = models.CharField(
        max_length=40,
        choices=TIPOS_GESTION,
        default=TIPO_GESTION_INSCRIPCION,
    )
    estado_gestion = models.CharField(
        max_length=20,
        choices=ESTADOS_GESTION,
        default=ESTADO_GESTION_INICIAL,
    )
    fecha_calendario = models.DateField(null=True, blank=True)
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


class Operativo(models.Model):
    MOVIMIENTOS = Inscripcion.ESTADOS_GESTION

    fecha = models.DateField()
    consecutivo = models.CharField(max_length=20, blank=True)
    numero_patronal = models.CharField(max_length=50)
    patrono_1 = models.CharField(max_length=180)
    patrono_2 = models.CharField(max_length=180, blank=True)
    movimiento = models.CharField(
        max_length=20,
        choices=MOVIMIENTOS,
        default=Inscripcion.ESTADO_GESTION_INICIAL,
    )
    fecha_informe = models.DateField(null=True, blank=True)
    numero_informe = models.CharField(max_length=50, blank=True)
    salario = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    empleados_nacionales = models.PositiveIntegerField(null=True, blank=True)
    empleados_extranjeros = models.PositiveIntegerField(null=True, blank=True)
    entrevistados = models.PositiveIntegerField(null=True, blank=True)
    omitidos_nacionales = models.PositiveIntegerField(null=True, blank=True)
    omitidos_extranjeros = models.PositiveIntegerField(null=True, blank=True)
    sin_ficha = models.PositiveIntegerField(null=True, blank=True)
    recien_ingresados = models.PositiveIntegerField(null=True, blank=True)
    citados = models.PositiveIntegerField(null=True, blank=True)
    no_inscritos = models.PositiveIntegerField(null=True, blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "operativo"
        verbose_name_plural = "operativos"
        ordering = ["-fecha", "-creado_en"]

    def __str__(self):
        return f"{self.numero_patronal} - {self.patrono_1}"


class Inactividad(models.Model):
    inscripcion = models.OneToOneField(
        Inscripcion,
        on_delete=models.CASCADE,
        related_name="formulario_inactividad",
    )
    datos = models.JSONField(default=dict, blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "inactividad"
        verbose_name_plural = "inactividades"

    def __str__(self):
        return f"Inactividad de {self.inscripcion}"


class PlanillaOperativo(models.Model):
    inscripcion = models.OneToOneField(
        Inscripcion,
        on_delete=models.CASCADE,
        related_name="planilla_operativo",
    )
    datos = models.JSONField(default=dict, blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "planilla de operativo"
        verbose_name_plural = "planillas de operativos"

    def __str__(self):
        return f"Planilla de {self.inscripcion}"


class MovimientoAvance(models.Model):
    inscripcion = models.OneToOneField(
        Inscripcion,
        on_delete=models.CASCADE,
        related_name="movimiento_avance",
    )
    avance = models.TextField(blank=True, default="")
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "avance de movimiento"
        verbose_name_plural = "avances de movimientos"

    def __str__(self):
        return f"Avance de {self.inscripcion}"


class Feriado(models.Model):
    fecha = models.DateField(unique=True)
    nombre = models.CharField(max_length=180)
    activo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "feriado"
        verbose_name_plural = "feriados"
        ordering = ["fecha"]

    def __str__(self):
        return f"{self.fecha:%d/%m/%Y} - {self.nombre}"


class CalculoDiasExpediente(models.Model):
    inscripcion = models.ForeignKey(
        Inscripcion,
        on_delete=models.CASCADE,
        related_name="calculos_dias",
    )
    fecha_inicial = models.DateField()
    fecha_final = models.DateField()
    total_dias = models.PositiveIntegerField()
    dias_habiles = models.PositiveIntegerField()
    fines_semana = models.PositiveIntegerField()
    feriados = models.PositiveIntegerField()
    detalle = models.JSONField(default=list)
    creado_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "cálculo de días de expediente"
        verbose_name_plural = "cálculos de días de expedientes"
        ordering = ["-creado_en"]

    def __str__(self):
        return f"Cálculo {self.fecha_inicial:%d/%m/%Y} - {self.fecha_final:%d/%m/%Y}"


class InformeInscripcion(models.Model):
    inscripcion = models.OneToOneField(
        Inscripcion,
        on_delete=models.CASCADE,
        related_name="informe_inscripcion",
    )
    datos = models.JSONField(default=dict, blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "informe de inscripción"
        verbose_name_plural = "informes de inscripción"

    def __str__(self):
        return f"Informe de {self.inscripcion}"


class Reactivacion(models.Model):
    inscripcion = models.OneToOneField(
        Inscripcion,
        on_delete=models.CASCADE,
        related_name="formulario_reactivacion",
    )
    datos = models.JSONField(default=dict, blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "reactivación"
        verbose_name_plural = "reactivaciones"

    def __str__(self):
        return f"Reactivación de {self.inscripcion}"
