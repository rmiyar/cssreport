import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("gestion", "0008_movimientoavance"),
    ]

    operations = [
        migrations.CreateModel(
            name="Feriado",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("fecha", models.DateField(unique=True)),
                ("nombre", models.CharField(max_length=180)),
                ("activo", models.BooleanField(default=True)),
            ],
            options={"verbose_name": "feriado", "verbose_name_plural": "feriados", "ordering": ["fecha"]},
        ),
        migrations.CreateModel(
            name="CalculoDiasExpediente",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("fecha_inicial", models.DateField()),
                ("fecha_final", models.DateField()),
                ("total_dias", models.PositiveIntegerField()),
                ("dias_habiles", models.PositiveIntegerField()),
                ("fines_semana", models.PositiveIntegerField()),
                ("feriados", models.PositiveIntegerField()),
                ("detalle", models.JSONField(default=list)),
                ("creado_en", models.DateTimeField(auto_now_add=True)),
                ("inscripcion", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="calculos_dias", to="gestion.inscripcion")),
            ],
            options={
                "verbose_name": "cálculo de días de expediente",
                "verbose_name_plural": "cálculos de días de expedientes",
                "ordering": ["-creado_en"],
            },
        ),
    ]
