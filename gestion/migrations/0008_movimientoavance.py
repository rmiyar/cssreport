import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("gestion", "0007_planillaoperativo"),
    ]

    operations = [
        migrations.CreateModel(
            name="MovimientoAvance",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("avance", models.TextField(blank=True, default="")),
                ("creado_en", models.DateTimeField(auto_now_add=True)),
                ("actualizado_en", models.DateTimeField(auto_now=True)),
                (
                    "inscripcion",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="movimiento_avance",
                        to="gestion.inscripcion",
                    ),
                ),
            ],
            options={
                "verbose_name": "avance de movimiento",
                "verbose_name_plural": "avances de movimientos",
            },
        ),
    ]
