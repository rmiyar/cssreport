from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [("gestion", "0005_operativo")]

    operations = [
        migrations.CreateModel(
            name="Inactividad",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("datos", models.JSONField(blank=True, default=dict)),
                ("creado_en", models.DateTimeField(auto_now_add=True)),
                ("actualizado_en", models.DateTimeField(auto_now=True)),
                ("inscripcion", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="formulario_inactividad", to="gestion.inscripcion")),
            ],
            options={"verbose_name": "inactividad", "verbose_name_plural": "inactividades"},
        )
    ]
