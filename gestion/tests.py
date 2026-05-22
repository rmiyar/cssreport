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
        self.assertContains(respuesta, "Inscripciones creadas")
        self.assertContains(respuesta, "Información General")
        self.assertContains(respuesta, "Información de Contacto y Representante")
        self.assertContains(respuesta, "Acciones del módulo")
        self.assertContains(respuesta, "Movimientos")
        self.assertContains(respuesta, "Vista previa")
        self.assertContains(respuesta, "DETALLE DE EMPLEADOS")

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

    def test_lista_inscripciones_creadas_en_la_misma_pantalla(self):
        Inscripcion.objects.create(
            tipo_actividad="empresas",
            nombre_establecimiento="Almacen Central",
            empleador_razon_social="Almacen Central S.A.",
            cedula_ruc="8-888-111",
            telefono="2222-3333",
        )

        respuesta = self.client.get(
            reverse("gestion:detalle_modulo", kwargs={"slug": "inscripcion"})
        )

        self.assertContains(respuesta, "Almacen Central")
        self.assertContains(respuesta, "8-888-111")

    def test_listado_inscripciones_tiene_paginacion(self):
        for numero in range(7):
            Inscripcion.objects.create(
                tipo_actividad="empresas",
                nombre_establecimiento=f"Empresa {numero}",
                empleador_razon_social=f"Empresa {numero} S.A.",
                cedula_ruc=f"8-888-{numero}",
            )

        respuesta = self.client.get(
            reverse("gestion:detalle_modulo", kwargs={"slug": "inscripcion"}),
            {"pagina": 2},
        )

        self.assertContains(respuesta, "Página 2 de 2")
        self.assertContains(respuesta, "Anterior")
