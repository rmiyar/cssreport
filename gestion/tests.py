import json

from django.test import TestCase
from django.urls import reverse

from .models import Inscripcion
from .models import Inactividad
from .models import InformeInscripcion
from .models import CalculoDiasExpediente
from .models import Feriado
from .models import MovimientoAvance
from .models import Operativo
from .models import PlanillaOperativo
from .models import Reactivacion


class PruebasPanelGestion(TestCase):
    def test_panel_gestion_responde_correctamente(self):
        Inscripcion.objects.create(
            tipo_gestion="inscripcion",
            estado_gestion="inicial",
            tipo_actividad="empresas",
            nombre_establecimiento="Empresa Demo",
            empleador_razon_social="Empresa Demo S.A.",
            cedula_ruc="8-100-200",
        )
        respuesta = self.client.get(reverse("gestion:panel"))

        self.assertEqual(respuesta.status_code, 200)
        self.assertContains(respuesta, "investigacion")
        self.assertContains(respuesta, "Inscripción")
        self.assertContains(respuesta, "Lista de Registros")
        self.assertContains(respuesta, "Información General")
        self.assertContains(respuesta, "Tipo de Gestión")
        self.assertContains(respuesta, "Estado de Gestión")
        self.assertContains(respuesta, "SEGUIMIENTO")
        self.assertContains(respuesta, "Calendario")
        self.assertContains(respuesta, "1. INSCRIPCION")
        self.assertContains(respuesta, "O. OTROS (CITACIONES, CORRECCION)")
        self.assertContains(respuesta, "<th>Tipo Gestión</th>", html=True)
        self.assertContains(respuesta, "<th>Estado</th>", html=True)
        self.assertContains(respuesta, "<th>Tipo Actividad</th>", html=True)
        self.assertContains(respuesta, "<th>R.U.C.</th>", html=True)
        self.assertContains(respuesta, "<th>Empleador</th>", html=True)
        self.assertNotContains(respuesta, "<th>Acciones</th>", html=True)
        self.assertNotContains(respuesta, "<th>No. SIPE</th>", html=True)
        self.assertNotContains(respuesta, "<th>Calendario</th>", html=True)
        self.assertNotContains(respuesta, "<th>Fecha de Operación</th>", html=True)
        self.assertNotContains(respuesta, "<th>Establecimiento</th>", html=True)
        self.assertNotContains(respuesta, "Seleccione una opción")
        self.assertNotContains(respuesta, "grid-modulos")

    def test_detalle_modulo_responde_correctamente(self):
        respuesta = self.client.get(
            reverse("gestion:detalle_modulo", kwargs={"slug": "inscripcion"})
        )

        self.assertEqual(respuesta.status_code, 200)
        self.assertContains(respuesta, "Inscripción")
        self.assertContains(respuesta, "Lista de Registros")
        self.assertContains(respuesta, "Información General")
        self.assertContains(respuesta, "Información de Contacto y Representante")
        self.assertContains(respuesta, "Acciones del módulo")
        self.assertContains(respuesta, "Movimientos")
        self.assertContains(respuesta, 'data-accion="abrir-modulo-inactividad"')
        self.assertContains(respuesta, 'data-modulo-inactividad')
        self.assertContains(respuesta, "Gestiones tipo 6")
        self.assertContains(respuesta, "I. Investigación interna")
        self.assertContains(respuesta, 'data-inactividad-campo="fechaCese"')
        self.assertContains(respuesta, 'data-inactividad-campo="montoPlanilla"')
        self.assertContains(respuesta, 'data-inactividad-tab="parte-2"')
        self.assertContains(respuesta, "IV. Períodos afectados")
        self.assertContains(respuesta, "V. Documentos adjuntos")
        self.assertContains(respuesta, 'data-inactividad-campo="documentoPlanillaRecibo"')
        self.assertContains(respuesta, 'data-inactividad-campo="trasladoJuzgado"')
        self.assertContains(respuesta, "VIII. Sanciones a aplicar")
        self.assertContains(respuesta, 'data-inactividad-campo="sancionNegativaInformacion"')
        self.assertContains(respuesta, 'data-accion="guardar-inactividad"')
        self.assertContains(respuesta, 'data-accion="abrir-operativos"')
        self.assertContains(respuesta, 'data-modulo-operativos')
        self.assertContains(respuesta, "Núm. patronal")
        self.assertContains(respuesta, "Patrono 1")
        self.assertContains(respuesta, "Patrono 2")
        self.assertContains(respuesta, 'data-operativos-busqueda')
        self.assertContains(respuesta, 'data-operativos-mes')
        self.assertContains(respuesta, 'data-operativos-anio')
        self.assertContains(respuesta, 'data-accion="generar-pdf-operativos"')
        self.assertContains(respuesta, 'data-reporte-operativos')
        self.assertContains(respuesta, "RESULTADO PRELIMINAR DE EMPRESAS INSPECCIONADAS EN OPERATIVO")
        self.assertContains(respuesta, "S.S. 23% salarios B/.")
        self.assertContains(respuesta, 'data-accion="nuevo-operativo"')
        self.assertContains(respuesta, 'data-formulario-operativo')
        self.assertContains(respuesta, 'data-accion="guardar-operativo"')
        self.assertContains(respuesta, "Vista previa")
        self.assertContains(respuesta, "DETALLE DE EMPLEADOS")
        self.assertContains(respuesta, 'data-accion="abrir-reporte-avances"')
        self.assertContains(respuesta, "BITÁCORA DE LA INVESTIGACIÓN A EMPRESAS")
        self.assertContains(respuesta, 'data-accion="abrir-reporte-acta"')
        self.assertContains(respuesta, 'data-reporte-acta')
        self.assertContains(respuesta, 'data-acta="empleador"')
        self.assertContains(respuesta, 'data-acta="telefono"')
        self.assertContains(respuesta, 'data-acta="comercial"')
        self.assertContains(respuesta, 'data-acta="direccion"')
        self.assertContains(respuesta, 'data-accion="abrir-reporte-citacion"')
        self.assertContains(respuesta, "Módulo de boletas de citación")
        self.assertContains(respuesta, 'data-accion="generar-reporte-citacion"')
        self.assertContains(respuesta, "BOLETA DE CITACIÓN")
        self.assertContains(respuesta, 'data-accion="abrir-planilla"')
        self.assertContains(respuesta, 'data-modulo-planilla')
        self.assertContains(respuesta, 'data-accion="guardar-planilla"')
        self.assertContains(respuesta, "Cálculo de planilla originada de operativo")
        self.assertContains(respuesta, "SALARIOS OMITIDOS")
        self.assertContains(respuesta, "SUELDO SIPE")
        self.assertContains(respuesta, 'data-accion="abrir-modulo-reactivacion"')
        self.assertContains(respuesta, "Gestiones de reactivación")
        self.assertContains(respuesta, "Informe N°")
        self.assertContains(respuesta, "PARTE 1")
        self.assertContains(respuesta, "PARTE 2")
        self.assertContains(respuesta, "No. de identificación")
        self.assertContains(respuesta, "I- INVESTIGACION INTERNA")
        self.assertContains(respuesta, "RESULTADO DE INVESTIGACIÓN")
        self.assertContains(respuesta, 'name="localizado-reactivacion"', count=2)
        self.assertContains(respuesta, 'name="nueva-direccion-reactivacion"', count=2)
        self.assertContains(respuesta, "data-reactivacion-direccion-actual")
        contenido = respuesta.content.decode()
        self.assertLess(
            contenido.index("RESULTADO DE INVESTIGACIÓN"),
            contenido.index('id="panel-reactivacion-parte-2"'),
        )
        self.assertLess(
            contenido.index("CIERRE O INACTIVIDAD"),
            contenido.index('id="panel-reactivacion-parte-2"'),
        )
        self.assertLess(
            contenido.index("ÚLTIMA PLANILLA"),
            contenido.index('id="panel-reactivacion-parte-2"'),
        )
        self.assertContains(respuesta, "Tipo de inactividad")
        self.assertContains(respuesta, 'name="patrono-activo-reactivacion"', count=2)
        self.assertContains(respuesta, 'name="tipo-inactividad-reactivacion"', count=2)
        self.assertContains(respuesta, 'data-reactivacion-campo="fechaCese"')
        self.assertContains(respuesta, 'data-reactivacion-campo="presentacion"')
        self.assertContains(respuesta, 'data-reactivacion-campo="empleados"')
        self.assertContains(respuesta, 'data-reactivacion-campo="montoPlanilla"')
        self.assertContains(respuesta, 'name="sancionar-reactivacion"', count=2)
        self.assertContains(respuesta, 'data-reactivacion-campo="articulos"')
        self.assertContains(respuesta, "III. RESULTADOS")
        self.assertContains(respuesta, "Agente administrativo")
        self.assertContains(respuesta, "IV. RECOMENDACIONES - PRODUCTO DE LAS INVESTIGACIONES")
        self.assertContains(respuesta, 'data-reactivacion-campo="trasladoArchivo"')
        self.assertContains(respuesta, 'data-reactivacion-campo="trasladoDenunciasSanciones"')
        self.assertContains(respuesta, 'data-reactivacion-campo="motivoTraslado"')
        self.assertContains(respuesta, "V. PERÍODOS AFECTADOS")
        self.assertContains(respuesta, 'data-reactivacion-campo="periodoEliminarDeuda"')
        self.assertContains(respuesta, 'data-reactivacion-campo="montoProcederCobro"')
        self.assertContains(respuesta, "VI. DOCUMENTOS ADJUNTOS")
        self.assertContains(respuesta, 'data-reactivacion-campo="documentoDatosGenerales"')
        self.assertContains(respuesta, 'data-reactivacion-campo="documentoOtros"')
        self.assertContains(respuesta, "VII. OTRAS RECOMENDACIONES Y/O OBSERVACIONES")
        self.assertContains(respuesta, 'data-reactivacion-campo="otrasRecomendaciones"')
        self.assertContains(respuesta, 'data-accion="guardar-reactivacion"')
        self.assertContains(respuesta, 'data-accion="generar-reporte-reactivacion"')
        self.assertContains(respuesta, "Informe de reactivación")
        self.assertContains(respuesta, "CAJA DE SEGURO SOCIAL")
        self.assertContains(respuesta, "SECCIÓN DE INVESTIGACIONES DE EMPRESAS")
        self.assertContains(respuesta, "IV. RECOMENDACIONES PRODUCTO DE LAS INVESTIGACIONES")
        self.assertContains(respuesta, "VII. OTRAS RECOMENDACIONES Y/O OBSERVACIONES")
        self.assertContains(respuesta, 'class="hoja-reporte hoja-reactivacion"', count=3)

    def test_guardar_formulario_reactivacion(self):
        inscripcion = Inscripcion.objects.create(
            tipo_gestion="reactivacion",
            tipo_actividad="empresas",
            nombre_establecimiento="Empresa Reactiva",
            empleador_razon_social="Empresa Reactiva S.A.",
            cedula_ruc="8-900-100",
        )
        datos = {
            "campos": {
                "informe": "R-001",
                "periodo": "2025-2026",
                "trasladoArchivo": True,
                "otrasRecomendaciones": "Dar seguimiento.",
            },
            "radios": {
                "condicion-reactivacion": "si",
                "patrono-activo-reactivacion": "no",
            },
        }

        respuesta = self.client.post(
            reverse("gestion:guardar_reactivacion"),
            data=json.dumps(
                {
                    "inscripcion_id": inscripcion.pk,
                    "datos": datos,
                }
            ),
            content_type="application/json",
        )

        self.assertEqual(respuesta.status_code, 200)
        self.assertTrue(respuesta.json()["ok"])
        reactivacion = Reactivacion.objects.get(inscripcion=inscripcion)
        self.assertEqual(reactivacion.datos, datos)

    def test_modulo_reactivacion_lista_solo_gestiones_reactivacion(self):
        reactivacion = Inscripcion.objects.create(
            tipo_gestion="reactivacion",
            estado_gestion="seguimiento",
            tipo_actividad="empresas",
            nombre_establecimiento="Empresa Reactiva",
            empleador_razon_social="Empresa Reactiva S.A.",
            cedula_ruc="8-555-100",
        )
        Inscripcion.objects.create(
            tipo_gestion="morosidad",
            tipo_actividad="empresas",
            nombre_establecimiento="Empresa Morosa",
            empleador_razon_social="Empresa Morosa S.A.",
            cedula_ruc="8-555-200",
        )

        respuesta = self.client.get(
            reverse("gestion:detalle_modulo", kwargs={"slug": "inscripcion"})
        )

        self.assertEqual(list(respuesta.context["reactivaciones"]), [reactivacion])
        self.assertContains(respuesta, "<strong>8-555-100</strong>", html=True)
        self.assertContains(respuesta, "<span>Empresa Reactiva</span>", html=True)
        self.assertNotContains(respuesta, "<strong>Empresa Reactiva S.A.</strong>", html=True)

    def test_formulario_inscripcion_guarda_datos_validos(self):
        respuesta = self.client.post(
            reverse("gestion:detalle_modulo", kwargs={"slug": "inscripcion"}),
            data={
                "tipo_gestion": "morosidad",
                "estado_gestion": "seguimiento",
                "fecha_calendario": "2026-06-15",
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
        inscripcion = Inscripcion.objects.get(cedula_ruc="155-999-123")
        self.assertEqual(inscripcion.tipo_gestion, "morosidad")
        self.assertEqual(inscripcion.estado_gestion, "seguimiento")
        self.assertEqual(inscripcion.fecha_calendario.isoformat(), "2026-06-15")

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

    def test_operativos_muestra_todos_los_registros_en_tabla(self):
        for numero in range(7):
            Inscripcion.objects.create(
                estado_gestion="inicial",
                tipo_actividad="empresas",
                numero_sipe=f"43-400-10{numero}",
                nombre_establecimiento=f"Patrono operativo {numero}",
                empleador_razon_social=f"Empresa operativa {numero}",
                cedula_ruc=f"8-700-{numero}",
                numero_entrevistados=numero,
                monto_salarios="100.00",
            )

        respuesta = self.client.get(
            reverse("gestion:detalle_modulo", kwargs={"slug": "inscripcion"})
        )

        self.assertContains(respuesta, 'data-operativos-fila', count=7)
        self.assertContains(respuesta, "43-400-106")
        self.assertContains(respuesta, "Patrono operativo 6")
        self.assertContains(respuesta, "Empresa operativa 6")

    def test_guardar_y_consultar_registro_operativo(self):
        datos = {
            "fecha": "2026-06-30",
            "consecutivo": "8",
            "numero_patronal": "43-400-10999",
            "patrono_1": "Patrono de prueba",
            "patrono_2": "Empresa de prueba, S.A.",
            "movimiento": "inicial",
            "fecha_informe": "2026-07-01",
            "numero_informe": "INF-900",
            "salario": "3250.50",
            "empleados_nacionales": 12,
            "empleados_extranjeros": 2,
            "entrevistados": 4,
            "omitidos_nacionales": 1,
            "omitidos_extranjeros": 0,
            "sin_ficha": 3,
            "recien_ingresados": 2,
            "citados": 1,
            "no_inscritos": 0,
        }

        respuesta = self.client.post(
            reverse("gestion:guardar_operativo"),
            data=json.dumps(datos),
            content_type="application/json",
        )

        self.assertEqual(respuesta.status_code, 201)
        self.assertTrue(respuesta.json()["ok"])
        self.assertEqual(Operativo.objects.count(), 1)
        operativo = Operativo.objects.get()
        self.assertEqual(operativo.numero_patronal, "43-400-10999")
        self.assertEqual(operativo.entrevistados, 4)

        consulta = self.client.get(
            reverse("gestion:detalle_modulo", kwargs={"slug": "inscripcion"})
        )
        self.assertContains(consulta, "43-400-10999")
        self.assertContains(consulta, "Patrono de prueba")
        self.assertContains(consulta, "INF-900")

    def test_guardar_planilla_operativo(self):
        inscripcion = Inscripcion.objects.create(
            tipo_gestion=Inscripcion.TIPO_GESTION_OPERATIVOS,
            nombre_establecimiento="Hotel de prueba",
            empleador_razon_social="Hotel de prueba S.A.",
            cedula_ruc="8-800-100",
            numero_sipe="43-800-100",
        )
        datos = {
            "campos": {
                "establecimiento": "Hotel de prueba",
                "razon": "Hotel de prueba S.A.",
                "sipe": "43-800-100",
            },
            "filas": [["4-123-456", "Empleado Uno", "01/01/2026", "", "", "", "1", "500.00", "//", "", "memo"]],
            "notas": "Registro manual.",
            "resumen": {"salariosOmitidos": "500.00", "seguroSocial": "115.00"},
        }

        respuesta = self.client.post(
            reverse("gestion:guardar_planilla"),
            data=json.dumps({"inscripcion_id": inscripcion.pk, "datos": datos}),
            content_type="application/json",
        )

        self.assertEqual(respuesta.status_code, 200)
        self.assertTrue(respuesta.json()["ok"])
        self.assertEqual(PlanillaOperativo.objects.get(inscripcion=inscripcion).datos, datos)

        consulta = self.client.get(reverse("gestion:detalle_modulo", kwargs={"slug": "inscripcion"}))
        self.assertContains(consulta, "Registro manual.")

    def test_inactividad_lista_tipo_seis_y_guarda_formulario(self):
        cierre = Inscripcion.objects.create(
            tipo_gestion=Inscripcion.TIPO_GESTION_CIERRE,
            nombre_establecimiento="Empresa en cierre",
            empleador_razon_social="Empresa en cierre S.A.",
            cedula_ruc="8-600-100",
        )
        Inscripcion.objects.create(
            tipo_gestion=Inscripcion.TIPO_GESTION_MOROSIDAD,
            nombre_establecimiento="Empresa morosa",
            empleador_razon_social="Empresa morosa S.A.",
            cedula_ruc="8-600-200",
        )

        pantalla = self.client.get(reverse("gestion:detalle_modulo", kwargs={"slug": "inscripcion"}))
        self.assertContains(pantalla, 'data-inactividad-item', count=1)
        self.assertContains(pantalla, "Empresa en cierre")

        datos = {"campos": {"informe": "84765", "resultado": "Cierre definitivo."}, "radios": {"inactividad-localizado": "si"}}
        respuesta = self.client.post(
            reverse("gestion:guardar_inactividad"),
            data=json.dumps({"inscripcion_id": cierre.pk, "datos": datos}),
            content_type="application/json",
        )
        self.assertEqual(respuesta.status_code, 200)
        self.assertTrue(respuesta.json()["ok"])
        self.assertEqual(Inactividad.objects.get(inscripcion=cierre).datos, datos)

    def test_clic_en_inscripcion_carga_datos_en_formulario_existente(self):
        inscripcion = Inscripcion.objects.create(
            tipo_actividad="construccion",
            nombre_establecimiento="Constructora Norte",
            empleador_razon_social="Constructora Norte S.A.",
            cedula_ruc="8-777-222",
            telefono="6000-1111",
        )

        respuesta = self.client.get(
            reverse("gestion:detalle_modulo", kwargs={"slug": "inscripcion"}),
            {"editar": inscripcion.pk},
        )

        self.assertContains(respuesta, 'href="?editar=')
        self.assertContains(respuesta, "Editar inscripción")
        self.assertContains(respuesta, 'value="Constructora Norte"')
        self.assertContains(respuesta, 'value="8-777-222"')
        self.assertContains(respuesta, "Actualizar")

    def test_formulario_inscripcion_actualiza_registro_existente(self):
        inscripcion = Inscripcion.objects.create(
            tipo_actividad="empresas",
            nombre_establecimiento="Comercial Viejo",
            empleador_razon_social="Comercial Viejo S.A.",
            cedula_ruc="8-111-000",
        )

        respuesta = self.client.post(
            reverse("gestion:detalle_modulo", kwargs={"slug": "inscripcion"})
            + f"?editar={inscripcion.pk}",
            data={
                "tipo_gestion": "operativos",
                "estado_gestion": "citacion",
                "tipo_actividad": "empresas",
                "nombre_establecimiento": "Comercial Actualizado",
                "empleador_razon_social": "Comercial Actualizado S.A.",
                "cedula_ruc": "8-111-999",
                "telefono": "2222-4444",
            },
        )

        self.assertRedirects(
            respuesta,
            reverse("gestion:detalle_modulo", kwargs={"slug": "inscripcion"}),
        )
        self.assertEqual(Inscripcion.objects.count(), 1)
        inscripcion.refresh_from_db()
        self.assertEqual(inscripcion.nombre_establecimiento, "Comercial Actualizado")
        self.assertEqual(inscripcion.cedula_ruc, "8-111-999")
        self.assertEqual(inscripcion.tipo_gestion, "operativos")
        self.assertEqual(inscripcion.estado_gestion, "citacion")

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

        self.assertContains(respuesta, "Mostrando 6 a 7 de 7 registros")
        self.assertContains(respuesta, "Anterior")

    def test_movimientos_muestra_y_guarda_comentario_de_avance(self):
        inscripcion = Inscripcion.objects.create(
            fecha_operacion="2026-07-11",
            numero_sipe="43-612-10156",
            nombre_establecimiento="Ventas de Plantas D",
            empleador_razon_social="Seila Montes Guerra",
            cedula_ruc="4-155-1",
        )

        pantalla = self.client.get(reverse("gestion:panel"))
        self.assertContains(pantalla, "Movimientos y avances")
        self.assertContains(pantalla, "Ventas de Plantas D")
        self.assertContains(pantalla, "data-movimiento-avance")
        self.assertContains(pantalla, "data-accion=\"imprimir-movimiento\"")
        self.assertContains(pantalla, "DETALLE DE AVANCES DE INVESTIGACIONES A EMPLEADORES")

        respuesta = self.client.post(
            reverse("gestion:guardar_movimientos"),
            data=json.dumps(
                {
                    "registros": [
                        {
                            "inscripcion_id": inscripcion.pk,
                            "avance": "Patrono citado; pendiente de documentos.",
                        }
                    ]
                }
            ),
            content_type="application/json",
        )

        self.assertEqual(respuesta.status_code, 200)
        self.assertTrue(respuesta.json()["ok"])
        self.assertEqual(
            MovimientoAvance.objects.get(inscripcion=inscripcion).avance,
            "Patrono citado; pendiente de documentos.",
        )

    def test_calculo_dias_consulta_feriados_y_se_guarda_en_expediente(self):
        inscripcion = Inscripcion.objects.create(
            numero_sipe="43-100-200",
            nombre_establecimiento="Empresa Calendario",
            empleador_razon_social="Empresa Calendario S.A.",
            cedula_ruc="8-100-200",
        )
        Feriado.objects.create(
            fecha="2026-07-11",
            nombre="Feriado configurado de prueba",
        )
        datos = {"fecha_inicial": "2026-07-10", "fecha_final": "2026-07-13"}

        respuesta = self.client.post(
            reverse("gestion:calcular_dias"),
            data=json.dumps(datos),
            content_type="application/json",
        )
        self.assertEqual(respuesta.status_code, 200)
        resultado = respuesta.json()
        self.assertEqual(resultado["total_dias"], 4)
        self.assertEqual(resultado["dias_habiles"], 2)
        self.assertEqual(resultado["fines_semana"], 1)
        self.assertEqual(resultado["feriados"], 1)
        self.assertEqual(resultado["detalle"][1]["motivo"], "Feriado configurado de prueba")

        respuesta_guardar = self.client.post(
            reverse("gestion:guardar_calculo_dias"),
            data=json.dumps({**datos, "inscripcion_id": inscripcion.pk}),
            content_type="application/json",
        )
        self.assertEqual(respuesta_guardar.status_code, 201)
        calculo = CalculoDiasExpediente.objects.get(inscripcion=inscripcion)
        self.assertEqual(calculo.total_dias, 4)
        self.assertEqual(calculo.feriados, 1)

    def test_catalogo_feriados_permite_crear_editar_y_eliminar(self):
        crear = self.client.post(
            reverse("gestion:guardar_feriado"),
            data=json.dumps({"fecha": "2026-12-25", "nombre": "Navidad", "activo": True}),
            content_type="application/json",
        )
        self.assertEqual(crear.status_code, 200)
        feriado_id = crear.json()["feriado"]["id"]
        self.assertTrue(Feriado.objects.get(pk=feriado_id).activo)

        editar = self.client.post(
            reverse("gestion:guardar_feriado"),
            data=json.dumps(
                {
                    "feriado_id": feriado_id,
                    "fecha": "2026-12-25",
                    "nombre": "Navidad actualizada",
                    "activo": False,
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(editar.status_code, 200)
        feriado = Feriado.objects.get(pk=feriado_id)
        self.assertEqual(feriado.nombre, "Navidad actualizada")
        self.assertFalse(feriado.activo)

        eliminar = self.client.post(
            reverse("gestion:eliminar_feriado"),
            data=json.dumps({"feriado_id": feriado_id}),
            content_type="application/json",
        )
        self.assertEqual(eliminar.status_code, 200)
        self.assertFalse(Feriado.objects.filter(pk=feriado_id).exists())

    def test_maestro_incluye_botones_y_registros_de_los_cuatro_tipos(self):
        for tipo, nombre in (
            ("cierre_inactividad", "Empresa tipo 6"),
            ("reactivacion", "Empresa tipo 9"),
            ("operativos", "Empresa tipo 8"),
            ("certificaciones", "Empresa tipo C"),
        ):
            Inscripcion.objects.create(
                tipo_gestion=tipo,
                fecha_operacion="2026-07-11",
                numero_sipe=f"SIPE-{tipo}",
                nombre_establecimiento=nombre,
                empleador_razon_social=f"{nombre} S.A.",
                cedula_ruc=f"RUC-{tipo}",
            )

        respuesta = self.client.get(reverse("gestion:panel"))
        self.assertContains(respuesta, "data-modulo-maestro")
        self.assertContains(respuesta, 'data-generar-maestro="cierre_inactividad"')
        self.assertContains(respuesta, 'data-generar-maestro="reactivacion"')
        self.assertContains(respuesta, 'data-generar-maestro="operativos"')
        self.assertContains(respuesta, 'data-generar-maestro="certificaciones"')
        self.assertContains(respuesta, "Empresa tipo 6")
        self.assertContains(respuesta, "Empresa tipo C")

    def test_informe_inscripcion_lista_tipo_uno_y_guarda_datos(self):
        inscripcion = Inscripcion.objects.create(
            tipo_gestion="inscripcion",
            fecha_operacion="2026-07-12",
            numero_sipe="43-INF-001",
            nombre_establecimiento="Comercio Informe",
            empleador_razon_social="Comercio Informe S.A.",
            cedula_ruc="RUC-INF-001",
        )
        pantalla = self.client.get(reverse("gestion:panel"))
        self.assertContains(pantalla, "data-modulo-informe-inscripcion")
        self.assertContains(pantalla, "Comercio Informe")
        self.assertContains(pantalla, "Cálculo de días")
        self.assertContains(pantalla, "Planillas complementarias presentadas")
        self.assertContains(pantalla, "Documentos pendientes")
        self.assertContains(pantalla, "Nombre empresa relacionada")
        self.assertContains(pantalla, "Representante legal")

        datos = {
            "fechaInforme": "2026-07-12",
            "numeroInforme": "INF-001",
            "empresaLocalizada": True,
            "observaciones": "Registro verificado.",
            "aceptarInscripcion": True,
        }
        respuesta = self.client.post(
            reverse("gestion:guardar_informe_inscripcion"),
            data=json.dumps({"inscripcion_id": inscripcion.pk, "datos": datos}),
            content_type="application/json",
        )
        self.assertEqual(respuesta.status_code, 200)
        self.assertEqual(InformeInscripcion.objects.get(inscripcion=inscripcion).datos, datos)
