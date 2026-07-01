from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("gestion", "0004_reactivacion"),
    ]

    operations = [
        migrations.CreateModel(
            name="Operativo",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("fecha", models.DateField()),
                ("consecutivo", models.CharField(blank=True, max_length=20)),
                ("numero_patronal", models.CharField(max_length=50)),
                ("patrono_1", models.CharField(max_length=180)),
                ("patrono_2", models.CharField(blank=True, max_length=180)),
                ("movimiento", models.CharField(choices=[("inicial", "INICIAL"), ("seguimiento", "SEGUIMIENTO"), ("citacion", "CITACION"), ("conclusion", "CONCLUSION"), ("sanciones", "SANCIONES")], default="inicial", max_length=20)),
                ("fecha_informe", models.DateField(blank=True, null=True)),
                ("numero_informe", models.CharField(blank=True, max_length=50)),
                ("salario", models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ("empleados_nacionales", models.PositiveIntegerField(blank=True, null=True)),
                ("empleados_extranjeros", models.PositiveIntegerField(blank=True, null=True)),
                ("entrevistados", models.PositiveIntegerField(blank=True, null=True)),
                ("omitidos_nacionales", models.PositiveIntegerField(blank=True, null=True)),
                ("omitidos_extranjeros", models.PositiveIntegerField(blank=True, null=True)),
                ("sin_ficha", models.PositiveIntegerField(blank=True, null=True)),
                ("recien_ingresados", models.PositiveIntegerField(blank=True, null=True)),
                ("citados", models.PositiveIntegerField(blank=True, null=True)),
                ("no_inscritos", models.PositiveIntegerField(blank=True, null=True)),
                ("creado_en", models.DateTimeField(auto_now_add=True)),
            ],
            options={"verbose_name": "operativo", "verbose_name_plural": "operativos", "ordering": ["-fecha", "-creado_en"]},
        ),
    ]
