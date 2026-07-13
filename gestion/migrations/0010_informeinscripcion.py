import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("gestion", "0009_feriado_calculodiasexpediente")]

    operations = [
        migrations.CreateModel(
            name="InformeInscripcion",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("datos", models.JSONField(blank=True, default=dict)),
                ("creado_en", models.DateTimeField(auto_now_add=True)),
                ("actualizado_en", models.DateTimeField(auto_now=True)),
                ("inscripcion", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="informe_inscripcion", to="gestion.inscripcion")),
            ],
            options={"verbose_name": "informe de inscripción", "verbose_name_plural": "informes de inscripción"},
        )
    ]
