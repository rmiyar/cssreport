from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("gestion", "0002_inscripcion_tipo_gestion"),
    ]

    operations = [
        migrations.AddField(
            model_name="inscripcion",
            name="estado_gestion",
            field=models.CharField(
                choices=[
                    ("inicial", "INICIAL"),
                    ("seguimiento", "SEGUIMIENTO"),
                    ("citacion", "CITACION"),
                    ("conclusion", "CONCLUSION"),
                    ("sanciones", "SANCIONES"),
                ],
                default="inicial",
                max_length=20,
            ),
        ),
        migrations.AddField(
            model_name="inscripcion",
            name="fecha_calendario",
            field=models.DateField(blank=True, null=True),
        ),
    ]
