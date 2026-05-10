from django.test import TestCase
from django.urls import reverse

from .models import Inscripcion


class PruebasPanelGestion(TestCase):
    def test_panel_gestion_responde_correctamente(self):
        respuesta = self.client.get(reverse("gestion:panel"))

        self.assertEqual(respuesta.status_code, 200)
        self.assertContains(respuesta, "Gestión")
        self.assertContains(respuesta, "Inscripción")

    def test_detalle_modulo_responde_correctamente(self):
        respuesta = self.client.get(
            reverse("gestion:detalle_modulo", kwargs={"slug": "inscripcion"})
        )

        self.assertEqual(respuesta.status_code, 200)
        self.assertContains(respuesta, "Inscripción")
        self.assertContains(respuesta, "Información General")
        self.assertContains(respuesta, "Información de Contacto y Representante")

    def test_formulario_inscripcion_guarda_datos_validos(self):
        respuesta = self.client.post(
            reverse("gestion:detalle_modulo", kwargs={"slug": "inscripcion"}),
            data={
                "tipo_actividad": "empresas",
                "nombre_establecimiento": "Comercial Centro",
                "empleador_razon_social": "Comercial Centro S.A.",
                "cedula_ruc": "155-999-123",
            },
        )

        self.assertRedirects(
            respuesta,
            reverse("gestion:detalle_modulo", kwargs={"slug": "inscripcion"}),
        )
        self.assertTrue(
            Inscripcion.objects.filter(cedula_ruc="155-999-123").exists()
        )
