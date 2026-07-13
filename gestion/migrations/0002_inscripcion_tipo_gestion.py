from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("gestion", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="inscripcion",
            name="tipo_gestion",
            field=models.CharField(
                choices=[
                    ("inscripcion", "1. INSCRIPCION"),
                    ("morosidad", "2. MOROSIDAD"),
                    ("reclamos", "3. RECLAMOS"),
                    ("planillas_complementarias", "4. PLANILLAS COMPLEMENTARIAS"),
                    ("casos_juez_ejecutor", "5. CASOS DEL JUEZ EJECUTOR"),
                    ("cierre_inactividad", "6. CIERRE E INACTIVIDAD"),
                    ("trabajo_oficina", "7. TRABAJO DE OFICINA"),
                    ("operativos", "8. OPERATIVOS"),
                    ("reactivacion", "9. REACTIVACION"),
                    ("certificaciones", "C. CERTIFICACIONES"),
                    ("otros", "O. OTROS (CITACIONES, CORRECCION)"),
                ],
                default="inscripcion",
                max_length=40,
            ),
        ),
    ]
