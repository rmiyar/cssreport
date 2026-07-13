const contenedor = document.querySelector("[data-contenedor]");
const perfil = document.querySelector("[data-perfil]");
const botonPerfil = document.querySelector("[data-accion='alternar-perfil']");
const botonMenu = document.querySelector("[data-accion='alternar-menu']");

botonMenu?.addEventListener("click", () => {
    contenedor?.classList.toggle("menu-abierto");
});

botonPerfil?.addEventListener("click", () => {
    const estaAbierto = perfil?.classList.toggle("abierto") ?? false;
    botonPerfil.setAttribute("aria-expanded", String(estaAbierto));
});

document.addEventListener("click", (evento) => {
    const objetivo = evento.target;

    if (perfil && objetivo instanceof Node && !perfil.contains(objetivo)) {
        perfil.classList.remove("abierto");
        botonPerfil?.setAttribute("aria-expanded", "false");
    }
});

const modalReporte = document.querySelector("[data-reporte-detalle-empleados]");
const modalActa = document.querySelector("[data-reporte-acta]");
const modalPlanilla = document.querySelector("[data-modulo-planilla]");
const modalOperativos = document.querySelector("[data-modulo-operativos]");
const modalInactividad = document.querySelector("[data-modulo-inactividad]");
const modalReporteOperativos = document.querySelector("[data-reporte-operativos]");
const modalModuloCitacion = document.querySelector("[data-modulo-citacion]");
const modalModuloReactivacion = document.querySelector("[data-modulo-reactivacion]");
const modalReporteReactivacion = document.querySelector("[data-reporte-reactivacion]");
const modalCitacion = document.querySelector("[data-reporte-citacion]");
const modalAvances = document.querySelector("[data-reporte-avances]");
const modalPreliminar = document.querySelector("[data-modulo-preliminar]");
const modalReportePreliminar = document.querySelector("[data-reporte-preliminar]");
const modalMovimientos = document.querySelector("[data-modulo-movimientos]");
const modalReporteMovimiento = document.querySelector("[data-reporte-movimiento]");
const modalCalculoDias = document.querySelector("[data-modulo-calculo-dias]");
const modalReporteCalculoDias = document.querySelector("[data-reporte-calculo-dias]");
const modalCatalogoFeriados = document.querySelector("[data-catalogo-feriados]");
const modalMaestro = document.querySelector("[data-modulo-maestro]");
const modalReporteMaestro = document.querySelector("[data-reporte-maestro]");
const modalInformeInscripcion = document.querySelector("[data-modulo-informe-inscripcion]");
const botonAbrirReporte = document.querySelector("[data-accion='abrir-reporte-detalle-empleados']");
const botonAbrirActa = document.querySelector("[data-accion='abrir-reporte-acta']");
const botonAbrirPlanilla = document.querySelector("[data-accion='abrir-planilla']");
const botonAbrirOperativos = document.querySelector("[data-accion='abrir-operativos']");
const botonAbrirInactividad = document.querySelector("[data-accion='abrir-modulo-inactividad']");
const botonGuardarPlanilla = document.querySelector("[data-accion='guardar-planilla']");
const botonGuardarInactividad = document.querySelector("[data-accion='guardar-inactividad']");
const botonGenerarPdfOperativos = document.querySelector("[data-accion='generar-pdf-operativos']");
const botonAbrirCitacion = document.querySelector("[data-accion='abrir-reporte-citacion']");
const botonAbrirAvances = document.querySelector("[data-accion='abrir-reporte-avances']");
const botonAbrirReactivacion = document.querySelector("[data-accion='abrir-modulo-reactivacion']");
const botonAbrirPreliminar = document.querySelector("[data-accion='abrir-preliminar']");
const botonAbrirMovimientos = document.querySelector("[data-accion='abrir-movimientos']");
const botonGuardarMovimientos = document.querySelector("[data-accion='guardar-movimientos']");
const botonAbrirCalculoDias = document.querySelector("[data-accion='abrir-calculo-dias']");
const formularioCalculoDias = document.querySelector("[data-calculo-dias-formulario]");
const botonGuardarCalculoDias = document.querySelector("[data-accion='guardar-calculo-dias']");
const botonVistaCalculoDias = document.querySelector("[data-accion='vista-imprimible-calculo']");
const formularioFeriado = document.querySelector("[data-formulario-feriado]");
const botonAbrirMaestro = document.querySelector("[data-accion='abrir-maestro']");
const botonAbrirInformeInscripcion = document.querySelector("[data-accion='abrir-informe-inscripcion']");
const scriptInformesInscripcion = document.querySelector("#informes-inscripcion-datos");
const scriptCalculosInscripcion = document.querySelector("#calculos-inscripcion-datos");
const botonGenerarReporteReactivacion = document.querySelector("[data-accion='generar-reporte-reactivacion']");
const botonGenerarCitacion = document.querySelector("[data-accion='generar-reporte-citacion']");
const botonesCerrarReporte = document.querySelectorAll("[data-accion='cerrar-reporte']");
const botonesImprimirReporte = document.querySelectorAll("[data-accion='imprimir-reporte']");
const tabsReactivacion = document.querySelectorAll("[data-reactivacion-tab]");
const panelesReactivacion = document.querySelectorAll("[data-reactivacion-panel]");
const radiosNuevaDireccion = document.querySelectorAll("input[name='nueva-direccion-reactivacion']");
const campoDireccionActual = document.querySelector("[data-reactivacion-direccion-actual]");
const botonGuardarReactivacion = document.querySelector("[data-accion='guardar-reactivacion']");
const textoGuardarReactivacion = document.querySelector("[data-reactivacion-guardar-texto]");
const estadoGuardarReactivacion = document.querySelector("[data-reactivacion-estado]");
const scriptDatosReactivaciones = document.querySelector("#reactivaciones-datos");
const scriptDatosInactividades = document.querySelector("#inactividades-datos");
const scriptDatosPlanillas = document.querySelector("#planillas-datos");
const busquedaOperativos = document.querySelector("[data-operativos-busqueda]");
const totalOperativos = document.querySelector("[data-operativos-total]");
const sinResultadosOperativos = document.querySelector("[data-operativos-sin-resultados]");
const filtroMesOperativos = document.querySelector("[data-operativos-mes]");
const filtroAnioOperativos = document.querySelector("[data-operativos-anio]");
const formularioOperativo = document.querySelector("[data-formulario-operativo]");
const cuerpoOperativos = document.querySelector("[data-operativos-cuerpo]");
const estadoOperativos = document.querySelector("[data-operativos-estado]");
const botonNuevoOperativo = document.querySelector("[data-accion='nuevo-operativo']");
const botonCancelarOperativo = document.querySelector("[data-accion='cancelar-operativo']");
const botonGuardarOperativo = document.querySelector("[data-accion='guardar-operativo']");
const busquedaMovimientos = document.querySelector("[data-movimientos-busqueda]");
const totalMovimientos = document.querySelector("[data-movimientos-total]");
const sinResultadosMovimientos = document.querySelector("[data-movimientos-sin-resultados]");
const estadoMovimientos = document.querySelector("[data-movimientos-estado]");
const gruposRadioReactivacion = [
    "condicion-reactivacion",
    "localizado-reactivacion",
    "nueva-direccion-reactivacion",
    "patrono-activo-reactivacion",
    "tipo-inactividad-reactivacion",
    "sancionar-reactivacion",
];
let datosReactivaciones = {};
let datosInactividades = {};
let datosPlanillas = {};
let planillaSeleccionadaId = null;
let inactividadSeleccionadaId = null;
let reactivacionSeleccionadaId = null;
let modalActivo = null;
let resultadoCalculoDias = null;
let informeInscripcionSeleccionado = null;
let datosInformesInscripcion = {};
let datosCalculosInscripcion = {};

try { datosInformesInscripcion = JSON.parse(scriptInformesInscripcion?.textContent || "{}"); } catch (error) { datosInformesInscripcion = {}; }
try { datosCalculosInscripcion = JSON.parse(scriptCalculosInscripcion?.textContent || "{}"); } catch (error) { datosCalculosInscripcion = {}; }

if (scriptDatosReactivaciones?.textContent) {
    try {
        datosReactivaciones = JSON.parse(scriptDatosReactivaciones.textContent);
    } catch (error) {
        datosReactivaciones = {};
    }
}

if (scriptDatosInactividades?.textContent) {
    try {
        datosInactividades = JSON.parse(scriptDatosInactividades.textContent);
    } catch (error) {
        datosInactividades = {};
    }
}

if (scriptDatosPlanillas?.textContent) {
    try {
        datosPlanillas = JSON.parse(scriptDatosPlanillas.textContent);
    } catch (error) {
        datosPlanillas = {};
    }
}

const obtenerValorCampo = (id) => document.querySelector(`#${id}`)?.value?.trim() || "";
const obtenerCampoBoleta = (nombre) => document.querySelector(`[data-boleta-campo='${nombre}']`);
const obtenerValorBoleta = (nombre) => obtenerCampoBoleta(nombre)?.value?.trim() || "";

const asignarValorBoleta = (nombre, valor) => {
    const campo = obtenerCampoBoleta(nombre);

    if (campo) {
        campo.value = valor || "";
    }
};

const escribirReporte = (selector, valor, reserva = "____________________") => {
    const elemento = document.querySelector(selector);
    if (elemento) {
        elemento.textContent = valor || reserva;
    }
};

const escribirReportes = (selector, valor, reserva = "____________________") => {
    document.querySelectorAll(selector).forEach((elemento) => {
        elemento.textContent = valor || reserva;
    });
};

const formatearFechaPlanilla = (valor) => {
    if (!valor) {
        return "";
    }
    const [anio, mes, dia] = valor.split("-");
    return anio && mes && dia ? `${dia}/${mes}/${anio}` : valor;
};

const escribirCampoPlanilla = (nombre, valor) => {
    const campo = modalPlanilla?.querySelector(`[data-planilla-campo='${nombre}']`);
    if (campo) {
        campo.value = valor || "";
    }
};

const escribirFilaPlanilla = (nombre, valor) => {
    const campo = modalPlanilla?.querySelector(`[data-planilla-fila='${nombre}']`);
    if (campo) {
        campo.value = valor || "";
    }
};

const registrosPlanillaHotelValle = [
    ["4-242-118", "ANA CRISTINA BARRIA", "17/11/2025", "17/11/2025", "3.75", "30.00", "22", "660.00", "//", "660.00", "memo"],
    ["4-321-554", "JOSE DANIEL MIRANDA", "20/11/2025", "20/11/2025", "4.00", "32.00", "22", "704.00", "//", "704.00", "memo"],
    ["4-155-902", "MARTA ELENA CASTILLO", "01/12/2025", "01/12/2025", "3.50", "28.00", "24", "672.00", "//", "672.00", "memo"],
    ["8-888-114", "CARLOS ALBERTO RUIZ", "03/12/2025", "03/12/2025", "4.25", "34.00", "24", "816.00", "//", "816.00", "memo"],
    ["4-602-771", "LUIS ENRIQUE SANTAMARIA", "08/12/2025", "08/12/2025", "3.25", "26.00", "26", "676.00", "//", "676.00", "memo"],
    ["4-498-220", "MELISSA MARIE GONZALEZ", "15/12/2025", "15/12/2025", "3.90", "31.20", "24", "748.80", "//", "748.80", "memo"],
    ["8-421-908", "ROBERTO ANTONIO VEGA", "05/01/2026", "05/01/2026", "4.10", "32.80", "22", "721.60", "//", "721.60", "memo"],
    ["4-711-336", "ELISA MARIA MORENO", "12/01/2026", "12/01/2026", "3.80", "30.40", "22", "668.80", "//", "668.80", "memo"],
    ["4-280-645", "RAFAEL EDUARDO PINZON", "19/01/2026", "19/01/2026", "4.50", "36.00", "20", "720.00", "//", "720.00", "memo"],
    ["8-707-215", "PATRICIA ISABEL LOPEZ", "02/02/2026", "02/02/2026", "3.60", "28.80", "20", "576.00", "//", "576.00", "memo"],
];

const normalizarPlanilla = (valor) => String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");

const esHotelValleDelRio = (datos) => {
    const texto = normalizarPlanilla(`${datos.establecimiento} ${datos.razon}`);
    return texto.includes("hotel valle del rio");
};

const filasTablaPlanilla = () => [...(modalPlanilla?.querySelectorAll("[data-planilla-cuerpo] tr") || [])];

const limpiarFilasPlanilla = () => {
    filasTablaPlanilla().forEach((fila) => {
        fila.querySelectorAll("input").forEach((campo) => {
            campo.value = "";
        });
    });
};

const escribirResumenPlanilla = (nombre, valor) => {
    const campo = modalPlanilla?.querySelector(`[data-planilla-resumen='${nombre}']`);
    if (campo) {
        campo.value = valor ?? "";
    }
};

const dineroPlanilla = (valor) => Number(valor || 0).toFixed(2);

const llenarRegistrosPlanilla = (registros) => {
    limpiarFilasPlanilla();
    filasTablaPlanilla().forEach((fila, indice) => {
        const registro = registros[indice];
        if (!registro) {
            return;
        }
        fila.querySelectorAll("input").forEach((campo, posicion) => {
            campo.value = registro[posicion] || "";
        });
    });

    const totalSalarios = registros.reduce((total, registro) => total + Number(registro[7] || 0), 0);
    escribirResumenPlanilla("salariosOmitidos", dineroPlanilla(totalSalarios));
    escribirResumenPlanilla("seguroSocial", dineroPlanilla(totalSalarios * 0.23));
    escribirResumenPlanilla("entrevistados", String(registros.length));
    escribirResumenPlanilla("omitidos", String(registros.length));
};

const llenarRegistroBasePlanilla = (datos) => {
    limpiarFilasPlanilla();
    escribirFilaPlanilla("cedula", datos.cedula);
    escribirFilaPlanilla("nombre", datos.razon || datos.establecimiento);
    escribirFilaPlanilla("inicio", datos.fecha);
    escribirFilaPlanilla("salario", datos.salario);
    escribirFilaPlanilla("fechaSipe", "//");
    escribirFilaPlanilla("notas", "memo");
    escribirResumenPlanilla("salariosOmitidos", datos.salario || "0.00");
    escribirResumenPlanilla("seguroSocial", dineroPlanilla(Number(datos.salario || 0) * 0.23));
    escribirResumenPlanilla("entrevistados", datos.entrevistados || "0");
    escribirResumenPlanilla("omitidos", "");
};

const datosPlanillaDesdeFormulario = () => ({
    id: "",
    fecha: formatearFechaPlanilla(obtenerValorCampo("id_fecha_operacion")),
    fechaIso: obtenerValorCampo("id_fecha_operacion"),
    sipe: obtenerValorCampo("id_numero_sipe"),
    mainframe: obtenerValorCampo("id_numero_mainframe"),
    establecimiento: obtenerValorCampo("id_nombre_establecimiento"),
    razon: obtenerValorCampo("id_empleador_razon_social"),
    cedula: obtenerValorCampo("id_cedula_ruc"),
    entrevistados: obtenerValorCampo("id_numero_entrevistados"),
    salario: obtenerValorCampo("id_monto_salarios"),
});

const datosPlanillaDesdeItem = (item) => ({
    id: item.dataset.id || "",
    fecha: item.dataset.fechaTexto || formatearFechaPlanilla(item.dataset.fecha || ""),
    fechaIso: item.dataset.fecha || "",
    sipe: item.dataset.sipe || "",
    mainframe: item.dataset.mainframe || "",
    establecimiento: item.dataset.establecimiento || "",
    razon: item.dataset.razon || "",
    cedula: item.dataset.cedula || "",
    entrevistados: item.dataset.entrevistados || "",
    salario: item.dataset.salario || "",
});

const cargarPlanilla = (datos) => {
    escribirCampoPlanilla("fecha", datos.fecha);
    escribirCampoPlanilla("establecimiento", datos.establecimiento);
    escribirCampoPlanilla("razon", datos.razon);
    escribirCampoPlanilla("sipe", datos.sipe);
    escribirCampoPlanilla("mainframe", datos.mainframe);

    if (datos.id && datosPlanillas[datos.id]) {
        cargarPlanillaGuardada(datosPlanillas[datos.id]);
    } else if (esHotelValleDelRio(datos)) {
        llenarRegistrosPlanilla(registrosPlanillaHotelValle);
    } else {
        llenarRegistroBasePlanilla(datos);
    }
};

const seleccionarPlanilla = (item) => {
    modalPlanilla?.querySelectorAll("[data-planilla-item]").forEach((boton) => {
        boton.classList.toggle("activo", boton === item);
    });
    planillaSeleccionadaId = item.dataset.id || null;
    cargarPlanilla(datosPlanillaDesdeItem(item));
    mostrarEstadoPlanilla("");
};

const completarModuloPlanilla = () => {
    const datosFormulario = datosPlanillaDesdeFormulario();
    const itemsPlanilla = [...(modalPlanilla?.querySelectorAll("[data-planilla-item]") || [])];
    const itemHotelValle = itemsPlanilla.find((item) => esHotelValleDelRio(datosPlanillaDesdeItem(item)));
    const primerItem = itemsPlanilla[0];

    if (datosFormulario.establecimiento || datosFormulario.razon || datosFormulario.cedula) {
        modalPlanilla?.querySelectorAll("[data-planilla-item]").forEach((boton) => boton.classList.remove("activo"));
        planillaSeleccionadaId = null;
        cargarPlanilla(datosFormulario);
        mostrarEstadoPlanilla("Seleccione un establecimiento del listado para guardar.", "error");
        return;
    }

    if (itemHotelValle) {
        seleccionarPlanilla(itemHotelValle);
        return;
    }

    if (primerItem) {
        seleccionarPlanilla(primerItem);
    }
};

const valoresResumenPlanilla = () => ({
    salariosOmitidos: modalPlanilla?.querySelector("[data-planilla-resumen='salariosOmitidos']")?.value || "",
    seguroSocial: modalPlanilla?.querySelector("[data-planilla-resumen='seguroSocial']")?.value || "",
    entrevistados: modalPlanilla?.querySelector("[data-planilla-resumen='entrevistados']")?.value || "",
    omitidos: modalPlanilla?.querySelector("[data-planilla-resumen='omitidos']")?.value || "",
});

const filasGuardablesPlanilla = () => filasTablaPlanilla()
    .map((fila) => [...fila.querySelectorAll("input")].map((campo) => campo.value.trim()))
    .filter((fila) => fila.some(Boolean));

const datosActualesPlanilla = () => ({
    campos: {
        fecha: modalPlanilla?.querySelector("[data-planilla-campo='fecha']")?.value || "",
        establecimiento: modalPlanilla?.querySelector("[data-planilla-campo='establecimiento']")?.value || "",
        razon: modalPlanilla?.querySelector("[data-planilla-campo='razon']")?.value || "",
        sipe: modalPlanilla?.querySelector("[data-planilla-campo='sipe']")?.value || "",
        mainframe: modalPlanilla?.querySelector("[data-planilla-campo='mainframe']")?.value || "",
    },
    filas: filasGuardablesPlanilla(),
    notas: modalPlanilla?.querySelector(".planilla-notas textarea")?.value || "",
    resumen: valoresResumenPlanilla(),
});

const cargarPlanillaGuardada = (datos) => {
    const campos = datos.campos || {};
    escribirCampoPlanilla("fecha", campos.fecha);
    escribirCampoPlanilla("establecimiento", campos.establecimiento);
    escribirCampoPlanilla("razon", campos.razon);
    escribirCampoPlanilla("sipe", campos.sipe);
    escribirCampoPlanilla("mainframe", campos.mainframe);
    llenarRegistrosPlanilla(datos.filas || []);
    if (datos.notas !== undefined) {
        const notas = modalPlanilla?.querySelector(".planilla-notas textarea");
        if (notas) {
            notas.value = datos.notas;
        }
    }
    const resumen = datos.resumen || {};
    Object.entries(resumen).forEach(([nombre, valor]) => escribirResumenPlanilla(nombre, valor));
};

const mostrarEstadoPlanilla = (mensaje, tipo = "") => {
    const estado = modalPlanilla?.querySelector("[data-planilla-estado]");
    if (!estado) {
        return;
    }
    estado.textContent = mensaje;
    estado.className = `planilla-estado${tipo ? ` planilla-estado--${tipo}` : ""}`;
};

const guardarPlanilla = async () => {
    const url = modalPlanilla?.dataset.guardarUrl;
    const tokenCsrf = document.querySelector("[name='csrfmiddlewaretoken']")?.value;
    if (!url || !tokenCsrf) {
        return;
    }
    if (!planillaSeleccionadaId) {
        mostrarEstadoPlanilla("Seleccione un establecimiento del listado antes de guardar.", "error");
        return;
    }

    botonGuardarPlanilla.disabled = true;
    mostrarEstadoPlanilla("Guardando planilla...");
    try {
        const datos = datosActualesPlanilla();
        const respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": tokenCsrf,
                "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify({
                inscripcion_id: planillaSeleccionadaId,
                datos,
            }),
        });
        const resultado = await respuesta.json();
        if (!respuesta.ok || !resultado.ok) {
            throw new Error(resultado.mensaje || "No fue posible guardar la planilla.");
        }
        datosPlanillas[planillaSeleccionadaId] = resultado.datos;
        mostrarEstadoPlanilla(resultado.mensaje, "exito");
    } catch (error) {
        mostrarEstadoPlanilla(error.message || "No fue posible guardar la planilla.", "error");
    } finally {
        botonGuardarPlanilla.disabled = false;
    }
};

const obtenerFechaCitacion = () => {
    const valorFecha = obtenerValorBoleta("fecha") || obtenerValorCampo("id_fecha_operacion");
    const fecha = valorFecha ? new Date(`${valorFecha}T00:00:00`) : new Date();
    const meses = [
        "ENERO",
        "FEBRERO",
        "MARZO",
        "ABRIL",
        "MAYO",
        "JUNIO",
        "JULIO",
        "AGOSTO",
        "SEPTIEMBRE",
        "OCTUBRE",
        "NOVIEMBRE",
        "DICIEMBRE",
    ];

    return {
        dia: String(fecha.getDate()).padStart(2, "0"),
        mes: meses[fecha.getMonth()],
        anio: String(fecha.getFullYear()),
    };
};

const obtenerFechaInputActual = () => {
    const fecha = new Date();
    return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}-${String(
        fecha.getDate(),
    ).padStart(2, "0")}`;
};

const completarReporteDetalleEmpleados = () => {
    escribirReporte("[data-reporte-fecha]", obtenerValorCampo("id_fecha_operacion"));
    escribirReporte("[data-reporte-sipe]", obtenerValorCampo("id_numero_sipe"));
    escribirReporte("[data-reporte-razon]", obtenerValorCampo("id_empleador_razon_social"));
    escribirReporte("[data-reporte-establecimiento]", obtenerValorCampo("id_nombre_establecimiento"));
    escribirReporte("[data-reporte-representante]", obtenerValorCampo("id_representante_legal"));
    escribirReporte("[data-reporte-cedula-representante]", obtenerValorCampo("id_cedula_representante"));
    escribirReporte("[data-reporte-direccion]", obtenerValorCampo("id_direccion_establecimiento"));
};

const completarReporteActa = () => {
    const valores = {
        fecha: formatearFechaReporte(obtenerValorCampo("id_fecha_operacion")),
        empleador: obtenerValorCampo("id_numero_sipe"),
        razon: obtenerValorCampo("id_empleador_razon_social"),
        comercial: obtenerValorCampo("id_nombre_establecimiento"),
        ruc: obtenerValorCampo("id_cedula_ruc"),
        direccion: obtenerValorCampo("id_direccion_establecimiento"),
        telefono: obtenerValorCampo("id_telefono"),
        representante: obtenerValorCampo("id_representante_legal"),
        cedula: obtenerValorCampo("id_cedula_representante"),
        celular: obtenerValorCampo("id_celular"),
        motivo: document.querySelector("#id_tipo_gestion option:checked")?.textContent?.trim() || "",
    };

    Object.entries(valores).forEach(([nombre, valor]) => {
        const campo = modalActa?.querySelector(`[data-acta='${nombre}']`);
        if (campo) {
            campo.textContent = valor;
        }
    });
};

const completarReporteAvances = () => {
    escribirReporte("[data-avances-sipe]", obtenerValorCampo("id_numero_sipe"));
    escribirReporte("[data-avances-fecha]", obtenerValorCampo("id_fecha_operacion"));
    escribirReporte("[data-avances-razon]", obtenerValorCampo("id_empleador_razon_social"));
    escribirReporte("[data-avances-establecimiento]", obtenerValorCampo("id_nombre_establecimiento"));
};

const completarReporteCitacion = () => {
    const fecha = obtenerFechaCitacion();
    const representante = obtenerValorBoleta("representante");
    const razonSocial = obtenerValorBoleta("razon");
    const establecimiento = obtenerValorBoleta("establecimiento");
    const agente = obtenerValorBoleta("agente");

    escribirReportes("[data-citacion-dia]", fecha.dia);
    escribirReportes("[data-citacion-mes]", fecha.mes);
    escribirReportes("[data-citacion-anio]", fecha.anio);
    escribirReportes("[data-citacion-numero]", obtenerValorBoleta("numero"));
    escribirReportes("[data-citacion-representante]", representante);
    escribirReportes("[data-citacion-razon]", razonSocial || establecimiento);
    escribirReportes("[data-citacion-sipe]", obtenerValorBoleta("sipe"));
    escribirReportes("[data-citacion-direccion]", obtenerValorBoleta("direccion"));
    escribirReportes("[data-citacion-cedula]", obtenerValorBoleta("cedula"));
    escribirReportes("[data-citacion-agente]", agente);
};

const completarModuloCitacion = () => {
    const fechaFormulario = obtenerValorCampo("id_fecha_operacion") || obtenerFechaInputActual();
    const establecimiento = obtenerValorCampo("id_nombre_establecimiento");

    asignarValorBoleta("fecha_creacion", fechaFormulario);
    asignarValorBoleta("fecha", fechaFormulario);
    asignarValorBoleta("numero", "");
    asignarValorBoleta("sipe", obtenerValorCampo("id_numero_sipe"));
    asignarValorBoleta("establecimiento", establecimiento);
    asignarValorBoleta("razon", obtenerValorCampo("id_empleador_razon_social"));
    asignarValorBoleta("ruc", obtenerValorCampo("id_cedula_ruc"));
    asignarValorBoleta("sector_tipo", "");
    asignarValorBoleta("sector", "BAJO BOQUETE");
    asignarValorBoleta("direccion", obtenerValorCampo("id_direccion_establecimiento"));
    asignarValorBoleta("representante", obtenerValorCampo("id_representante_legal"));
    asignarValorBoleta("cedula", obtenerValorCampo("id_cedula_representante"));
    asignarValorBoleta("domicilio", "");
    asignarValorBoleta("hora", "10:00 A.M.");
    asignarValorBoleta("agente", "");

    const listaEstablecimiento = document.querySelector("[data-boleta-lista-establecimiento]");
    if (listaEstablecimiento) {
        listaEstablecimiento.textContent = establecimiento || "Sin establecimiento seleccionado";
    }
};

const completarModuloReactivacion = () => {
    activarTabReactivacion("parte-1");

    const primerRegistro = document.querySelector("[data-reactivacion-item]");
    if (primerRegistro) {
        seleccionarReactivacion(primerRegistro);
    }
};

const obtenerDatosInactividad = () => {
    const campos = {};
    modalInactividad?.querySelectorAll("[data-inactividad-campo]").forEach((campo) => {
        campos[campo.dataset.inactividadCampo] = campo instanceof HTMLInputElement && campo.type === "checkbox"
            ? campo.checked
            : campo.value;
    });
    const radios = {};
    ["inactividad-localizado", "inactividad-nueva-direccion", "inactividad-patrono-activo"].forEach((nombre) => {
        radios[nombre] = modalInactividad?.querySelector(`input[name='${nombre}']:checked`)?.value || "";
    });
    return { campos, radios };
};

const aplicarDatosInactividad = (datos) => {
    Object.entries(datos?.campos || {}).forEach(([nombre, valor]) => {
        const campo = modalInactividad?.querySelector(`[data-inactividad-campo='${nombre}']`);
        if (!campo) return;
        if (campo instanceof HTMLInputElement && campo.type === "checkbox") campo.checked = Boolean(valor);
        else campo.value = valor ?? "";
    });
    Object.entries(datos?.radios || {}).forEach(([nombre, valor]) => {
        modalInactividad?.querySelectorAll(`input[name='${nombre}']`).forEach((radio) => {
            radio.checked = radio.value === valor;
        });
    });
};

const seleccionarInactividad = (item) => {
    inactividadSeleccionadaId = item.dataset.id;
    modalInactividad?.querySelectorAll("[data-inactividad-campo]").forEach((campo) => {
        if (campo instanceof HTMLInputElement && campo.type === "checkbox") campo.checked = false;
        else campo.value = "";
    });
    modalInactividad?.querySelectorAll("input[type='radio']").forEach((radio) => { radio.checked = false; });
    modalInactividad?.querySelectorAll("[data-inactividad-item]").forEach((boton) => boton.classList.toggle("activo", boton === item));
    const base = {
        identificacion: item.dataset.identificacion,
        empleador: item.dataset.empleador,
        comercial: item.dataset.comercial,
        direccion: item.dataset.direccion,
        direccionResultado: item.dataset.direccion,
        telefono: item.dataset.telefono,
        representante: item.dataset.representante,
        cedula: item.dataset.cedula,
        cipNatural: item.dataset.cedula,
        rucJuridica: item.dataset.identificacion,
        fecha: item.dataset.fecha,
    };
    Object.entries(base).forEach(([nombre, valor]) => {
        const campo = modalInactividad?.querySelector(`[data-inactividad-campo='${nombre}']`);
        if (campo) campo.value = valor || "";
    });
    if (datosInactividades[inactividadSeleccionadaId]) aplicarDatosInactividad(datosInactividades[inactividadSeleccionadaId]);
    const estado = modalInactividad?.querySelector("[data-inactividad-estado]");
    if (estado) estado.textContent = "";
};

const completarModuloInactividad = () => {
    activarTabInactividad("parte-1");
    const primero = modalInactividad?.querySelector("[data-inactividad-item]");
    if (primero) seleccionarInactividad(primero);
};

const activarTabInactividad = (parte) => {
    modalInactividad?.querySelectorAll("[data-inactividad-tab]").forEach((tab) => {
        const activo = tab.dataset.inactividadTab === parte;
        tab.classList.toggle("activo", activo);
        tab.setAttribute("aria-selected", String(activo));
    });
    modalInactividad?.querySelectorAll("[data-inactividad-panel]").forEach((panel) => {
        panel.hidden = panel.dataset.inactividadPanel !== parte;
    });
};

const guardarInactividad = async () => {
    const estado = modalInactividad?.querySelector("[data-inactividad-estado]");
    if (!inactividadSeleccionadaId) {
        if (estado) estado.textContent = "Seleccione una gestión tipo 6.";
        return;
    }
    botonGuardarInactividad.disabled = true;
    if (estado) estado.textContent = "Guardando información...";
    try {
        const respuesta = await fetch(modalInactividad.dataset.guardarUrl, {
            method: "POST",
            headers: {"Content-Type": "application/json", "X-CSRFToken": document.querySelector("[name='csrfmiddlewaretoken']")?.value, "X-Requested-With": "XMLHttpRequest"},
            body: JSON.stringify({inscripcion_id: inactividadSeleccionadaId, datos: obtenerDatosInactividad()}),
        });
        const resultado = await respuesta.json();
        if (!respuesta.ok || !resultado.ok) throw new Error(resultado.mensaje || "No fue posible guardar.");
        datosInactividades[inactividadSeleccionadaId] = resultado.datos;
        if (estado) estado.textContent = resultado.mensaje;
    } catch (error) {
        if (estado) estado.textContent = error.message;
    } finally {
        botonGuardarInactividad.disabled = false;
    }
};

const activarTabReactivacion = (parte) => {
    tabsReactivacion.forEach((tab) => {
        const activo = tab.dataset.reactivacionTab === parte;
        tab.classList.toggle("reactivacion-tab--activo", activo);
        tab.setAttribute("aria-selected", String(activo));
    });

    panelesReactivacion.forEach((panel) => {
        const activo = panel.dataset.reactivacionPanel === parte;
        panel.classList.toggle("reactivacion-panel--activo", activo);
        panel.hidden = !activo;
    });
};

const escribirCampoReactivacion = (nombre, valor) => {
    const campo = document.querySelector(`[data-reactivacion-campo='${nombre}']`);
    if (campo) {
        campo.value = valor || "";
    }
};

const mostrarEstadoReactivacion = (mensaje, tipo = "") => {
    if (!estadoGuardarReactivacion) {
        return;
    }

    estadoGuardarReactivacion.textContent = mensaje;
    estadoGuardarReactivacion.classList.toggle("reactivacion-guardado-estado--exito", tipo === "exito");
    estadoGuardarReactivacion.classList.toggle("reactivacion-guardado-estado--error", tipo === "error");
};

const limpiarFormularioReactivacion = () => {
    modalModuloReactivacion?.querySelectorAll("[data-reactivacion-campo]").forEach((campo) => {
        if (campo instanceof HTMLInputElement && campo.type === "checkbox") {
            campo.checked = false;
        } else {
            campo.value = "";
        }
    });

    gruposRadioReactivacion.forEach((nombre) => {
        modalModuloReactivacion?.querySelectorAll(`input[name='${nombre}']`).forEach((radio) => {
            radio.checked = false;
        });
    });

    actualizarVisibilidadDireccionActual();
    mostrarEstadoReactivacion("");
};

const aplicarDatosReactivacion = (datos) => {
    Object.entries(datos?.campos || {}).forEach(([nombre, valor]) => {
        const campo = modalModuloReactivacion?.querySelector(`[data-reactivacion-campo='${nombre}']`);
        if (!campo) {
            return;
        }

        if (campo instanceof HTMLInputElement && campo.type === "checkbox") {
            campo.checked = Boolean(valor);
        } else {
            campo.value = valor ?? "";
        }
    });

    gruposRadioReactivacion.forEach((nombre) => {
        const valor = datos?.radios?.[nombre];
        modalModuloReactivacion?.querySelectorAll(`input[name='${nombre}']`).forEach((radio) => {
            radio.checked = radio.value === valor;
        });
    });

    actualizarVisibilidadDireccionActual();
};

const obtenerDatosReactivacion = () => {
    const campos = {};
    modalModuloReactivacion?.querySelectorAll("[data-reactivacion-campo]").forEach((campo) => {
        const nombre = campo.dataset.reactivacionCampo;
        campos[nombre] = campo instanceof HTMLInputElement && campo.type === "checkbox"
            ? campo.checked
            : campo.value;
    });

    const radios = {};
    gruposRadioReactivacion.forEach((nombre) => {
        radios[nombre] = modalModuloReactivacion?.querySelector(`input[name='${nombre}']:checked`)?.value || "";
    });

    return { campos, radios };
};

const actualizarVisibilidadDireccionActual = () => {
    const nuevaDireccion = document.querySelector("input[name='nueva-direccion-reactivacion']:checked");
    const mostrarDireccion = nuevaDireccion?.value === "si";

    if (campoDireccionActual) {
        campoDireccionActual.hidden = !mostrarDireccion;
    }

    if (!mostrarDireccion) {
        escribirCampoReactivacion("direccionActual", "");
    }
};

const seleccionarReactivacion = (elemento) => {
    limpiarFormularioReactivacion();
    reactivacionSeleccionadaId = elemento.dataset.id;

    document.querySelectorAll("[data-reactivacion-item]").forEach((item) => {
        item.classList.toggle("reactivacion-item--activo", item === elemento);
    });

    escribirCampoReactivacion("empleador", elemento.dataset.empleador);
    escribirCampoReactivacion("establecimiento", elemento.dataset.establecimiento);
    escribirCampoReactivacion("ruc", elemento.dataset.ruc);
    escribirCampoReactivacion("identificacion", elemento.dataset.ruc);
    escribirCampoReactivacion("cip", elemento.dataset.cedulaRepresentante || elemento.dataset.ruc);
    escribirCampoReactivacion("estado", elemento.dataset.estado);
    escribirCampoReactivacion("actividad", elemento.dataset.actividad);
    escribirCampoReactivacion("calendario", elemento.dataset.calendario);
    escribirCampoReactivacion("fecha", elemento.dataset.fecha);
    escribirCampoReactivacion("fechaInscripcion", elemento.dataset.fecha);
    escribirCampoReactivacion("sipe", elemento.dataset.sipe);
    escribirCampoReactivacion("mainframe", elemento.dataset.mainframe);
    escribirCampoReactivacion("representante", elemento.dataset.representante);
    escribirCampoReactivacion("cedulaRepresentante", elemento.dataset.cedulaRepresentante);
    escribirCampoReactivacion("direccion", elemento.dataset.direccion);
    escribirCampoReactivacion("direccionResultado", elemento.dataset.direccion);
    escribirCampoReactivacion("telefono", elemento.dataset.telefono);
    escribirCampoReactivacion("fechaInforme", obtenerFechaInputActual());

    const datosGuardados = datosReactivaciones[reactivacionSeleccionadaId];
    if (datosGuardados) {
        aplicarDatosReactivacion(datosGuardados);
    } else {
        actualizarVisibilidadDireccionActual();
    }
};

const guardarReactivacion = async () => {
    if (!reactivacionSeleccionadaId) {
        mostrarEstadoReactivacion("Seleccione una gestión de reactivación.", "error");
        return;
    }

    const tokenCsrf = document.querySelector("[name='csrfmiddlewaretoken']")?.value;
    const url = modalModuloReactivacion?.dataset.guardarUrl;
    if (!tokenCsrf || !url) {
        mostrarEstadoReactivacion("No fue posible iniciar el guardado.", "error");
        return;
    }

    botonGuardarReactivacion.disabled = true;
    if (textoGuardarReactivacion) {
        textoGuardarReactivacion.textContent = "Guardando...";
    }
    mostrarEstadoReactivacion("Guardando información...");

    try {
        const respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": tokenCsrf,
                "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify({
                inscripcion_id: reactivacionSeleccionadaId,
                datos: obtenerDatosReactivacion(),
            }),
        });
        const resultado = await respuesta.json();

        if (!respuesta.ok || !resultado.ok) {
            throw new Error(resultado.mensaje || "No fue posible guardar la reactivación.");
        }

        datosReactivaciones[reactivacionSeleccionadaId] = resultado.datos;
        mostrarEstadoReactivacion(resultado.mensaje, "exito");
    } catch (error) {
        mostrarEstadoReactivacion(error.message || "No fue posible guardar la reactivación.", "error");
    } finally {
        botonGuardarReactivacion.disabled = false;
        if (textoGuardarReactivacion) {
            textoGuardarReactivacion.textContent = "Guardar";
        }
    }
};

const escribirReporteReactivacion = (nombre, valor) => {
    modalReporteReactivacion?.querySelectorAll(`[data-reporte-reactivacion='${nombre}']`).forEach((elemento) => {
        elemento.textContent = valor ?? "";
    });
};

const formatearFechaReporte = (valor) => {
    if (!valor) {
        return "";
    }

    const partes = valor.split("-");
    return partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : valor;
};

const formatearMontoReporte = (valor) => {
    if (valor === "" || valor === null || valor === undefined) {
        return "0.00";
    }

    const numero = Number(valor);
    return Number.isFinite(numero)
        ? numero.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : valor;
};

const completarReporteReactivacion = () => {
    const datos = obtenerDatosReactivacion();
    const campos = datos.campos;
    const radios = datos.radios;
    const camposFecha = [
        "fechaInforme",
        "fecha",
        "fechaInscripcion",
        "fechaCierre",
        "fechaCese",
        "presentacion",
    ];
    const camposMonto = [
        "css",
        "seIr",
        "total",
        "montoPlanilla",
        "montoEliminarDeuda",
        "montoProcederCobro",
        "montoOtrosPeriodos",
    ];

    Object.entries(campos).forEach(([nombre, valor]) => {
        if (camposFecha.includes(nombre)) {
            escribirReporteReactivacion(nombre, formatearFechaReporte(valor));
        } else if (camposMonto.includes(nombre)) {
            escribirReporteReactivacion(nombre, formatearMontoReporte(valor));
        } else if (typeof valor !== "boolean") {
            escribirReporteReactivacion(nombre, valor);
        }
    });

    escribirReporteReactivacion("fechaFirma", formatearFechaReporte(campos.fechaInforme));
    escribirReporteReactivacion("condicionSi", radios["condicion-reactivacion"] === "si" ? "X" : "");
    escribirReporteReactivacion("condicionNo", radios["condicion-reactivacion"] === "no" ? "X" : "");
    escribirReporteReactivacion("localizadoSi", radios["localizado-reactivacion"] === "si" ? "X" : "");
    escribirReporteReactivacion("localizadoNo", radios["localizado-reactivacion"] === "no" ? "X" : "");
    escribirReporteReactivacion("nuevaDireccionSi", radios["nueva-direccion-reactivacion"] === "si" ? "X" : "");
    escribirReporteReactivacion("nuevaDireccionNo", radios["nueva-direccion-reactivacion"] === "no" ? "X" : "");
    escribirReporteReactivacion("patronoActivoSi", radios["patrono-activo-reactivacion"] === "si" ? "X" : "");
    escribirReporteReactivacion("patronoActivoNo", radios["patrono-activo-reactivacion"] === "no" ? "X" : "");
    escribirReporteReactivacion("sancionarSi", radios["sancionar-reactivacion"] === "si" ? "X" : "");
    escribirReporteReactivacion("sancionarNo", radios["sancionar-reactivacion"] === "no" ? "X" : "");
    escribirReporteReactivacion(
        "tipoInactividad",
        radios["tipo-inactividad-reactivacion"] === "temporal"
            ? "Temporal"
            : radios["tipo-inactividad-reactivacion"] === "definitiva"
                ? "Definitiva"
                : "",
    );

    [
        "trasladoArchivo",
        "trasladoInscripcion",
        "trasladoPlanillaComplementaria",
        "trasladoDenunciasSanciones",
        "documentoDatosGenerales",
        "documentoCalculoPrestaciones",
        "documentoConsultaFacturacion",
        "documentoPlanillaRecibo",
        "documentoCertificacionDeuda",
        "documentoOtros",
    ].forEach((nombre) => {
        escribirReporteReactivacion(nombre, campos[nombre] ? "X" : "");
    });
};

const abrirModalReporte = (modal, completar) => {
    completar?.();
    modalActivo = modal;
    modalActivo?.classList.add("abierto");
    modalActivo?.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-abierto");
};

const completarPreliminar = () => {
    const campoFecha = modalPreliminar?.querySelector("[data-preliminar-fecha]");
    if (campoFecha && !campoFecha.value) {
        const hoy = new Date();
        const local = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000);
        campoFecha.value = local.toISOString().slice(0, 10);
    }
    filtrarPreliminar();
};

const seleccionarTipoPreliminar = (tipo) => {
    const esFinal = tipo === "final";
    modalPreliminar?.classList.toggle("preliminar--final", esFinal);
    modalPreliminar?.querySelectorAll("[data-preliminar-tipo]").forEach((opcion) => {
        const activo = opcion.dataset.preliminarTipo === tipo;
        opcion.classList.toggle("preliminar-tipo__boton--activo", activo);
        opcion.setAttribute("aria-pressed", String(activo));
    });

    const etiqueta = modalPreliminar?.querySelector("[data-preliminar-reporte-tipo]");
    const descripcion = modalPreliminar?.querySelector("[data-preliminar-reporte-descripcion]");
    if (etiqueta) {
        etiqueta.textContent = esFinal ? "Preliminar final" : "Preliminar inicial";
    }
    if (descripcion) {
        descripcion.textContent = esFinal
            ? "Resultado actualizado después del trabajo realizado, con conclusión y causa pendiente."
            : "Investigaciones asignadas al comenzar la jornada u operativo.";
    }
};

const formatearFechaPreliminar = (valor) => {
    if (!valor) {
        return "//";
    }
    const [anio, mes, dia] = valor.split("-");
    return anio && mes && dia ? `${dia}/${mes}/${anio}` : valor;
};

const generarReportePreliminar = (tipo) => {
    if (!modalPreliminar || !modalReportePreliminar) {
        return;
    }

    const esFinal = tipo === "final";
    const filas = [...modalPreliminar.querySelectorAll("[data-preliminar-fila]")]
        .filter((fila) => !fila.hidden);
    const cabecera = modalReportePreliminar.querySelector("[data-documento-preliminar-cabecera]");
    const cuerpo = modalReportePreliminar.querySelector("[data-documento-preliminar-cuerpo]");
    const fechaValor = modalPreliminar.querySelector("[data-preliminar-fecha]")?.value || "";
    const columnas = [
        "N.º",
        "Número de empleador",
        "Empleador o razón social",
        "Tipo de investigación",
        "Ubicación (sector)",
    ];
    if (esFinal) {
        columnas.push("Concluido", "De no haber concluido, indicar la causa");
    }

    const filaCabecera = document.createElement("tr");
    columnas.forEach((texto) => {
        const th = document.createElement("th");
        th.textContent = texto;
        filaCabecera.append(th);
    });
    cabecera.replaceChildren(filaCabecera);
    cuerpo.replaceChildren();

    filas.forEach((fila, indice) => {
        const celdas = fila.cells;
        const establecimiento = celdas[5]?.textContent.trim() || "";
        const razon = celdas[6]?.textContent.trim() || "";
        const patrono = razon && normalizarTextoPreliminar(razon) !== normalizarTextoPreliminar(establecimiento)
            ? `${establecimiento} / ${razon}`
            : establecimiento || razon;
        const valores = [
            indice + 1,
            celdas[3]?.textContent.trim() || "",
            patrono,
            celdas[2]?.textContent.trim() || "",
            celdas[7]?.textContent.trim() || "",
        ];
        if (esFinal) {
            valores.push(
                celdas[8]?.querySelector("input[type='checkbox']")?.checked ? "SÍ" : "NO",
                celdas[9]?.textContent.trim() || "",
            );
        }
        const filaReporte = document.createElement("tr");
        valores.forEach((valor) => {
            const td = document.createElement("td");
            td.textContent = String(valor);
            filaReporte.append(td);
        });
        cuerpo.append(filaReporte);
    });

    if (!filas.length) {
        const filaVacia = document.createElement("tr");
        const celda = document.createElement("td");
        celda.colSpan = columnas.length;
        celda.textContent = "No hay investigaciones que coincidan con los filtros seleccionados.";
        filaVacia.append(celda);
        cuerpo.append(filaVacia);
    }

    const titulo = esFinal ? "Preliminar final de investigaciones" : "Preliminar inicial de investigaciones";
    modalReportePreliminar.querySelector("[data-documento-preliminar-titulo]").textContent = titulo;
    modalReportePreliminar.querySelector("[data-documento-preliminar-subtitulo]").textContent = esFinal
        ? "CUADRO DE INVESTIGACIONES Y RESULTADO PRELIMINAR FINAL"
        : "CUADRO DE INVESTIGACIONES ASIGNADAS – PRELIMINAR INICIAL";
    modalReportePreliminar.querySelector("[data-documento-preliminar-fecha]").textContent = formatearFechaPreliminar(fechaValor);
    modalReportePreliminar.querySelector("[data-documento-preliminar-fecha-firma]").textContent = formatearFechaPreliminar(fechaValor);

    ["primera", "segunda"].forEach((nombre) => {
        const valor = modalPreliminar.querySelector(`[data-preliminar-firma='${nombre}']`)?.value.trim() || "";
        modalReportePreliminar.querySelector(`[data-documento-preliminar-firma='${nombre}']`).textContent = valor;
    });

    const tiposPresentes = new Set(filas.map((fila) => fila.dataset.tipo));
    modalReportePreliminar.querySelectorAll("[data-documento-tipo]").forEach((elemento) => {
        const nombre = elemento.textContent.split(" (")[0];
        elemento.textContent = `${nombre} (${tiposPresentes.has(elemento.dataset.documentoTipo) ? "X" : " "})`;
    });

    cerrarReporte();
    abrirModalReporte(modalReportePreliminar);
    window.print();
};

const normalizarTextoPreliminar = (valor) => String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .trim();

const filtrarPreliminar = () => {
    if (!modalPreliminar) {
        return;
    }

    const obtenerFiltro = (nombre) => modalPreliminar.querySelector(`[data-preliminar-filtro='${nombre}']`);
    const fechaDesde = obtenerFiltro("fecha-desde")?.value || "";
    const fechaHasta = obtenerFiltro("fecha-hasta")?.value || "";
    const tipo = obtenerFiltro("tipo")?.value || "";
    const estado = obtenerFiltro("estado")?.value || "";
    const numero = normalizarTextoPreliminar(obtenerFiltro("numero")?.value);
    const patrono = normalizarTextoPreliminar(obtenerFiltro("patrono")?.value);
    const mensaje = modalPreliminar.querySelector("[data-preliminar-filtros-estado]");
    const sinResultados = modalPreliminar.querySelector("[data-preliminar-sin-resultados]");
    const total = modalPreliminar.querySelector("[data-preliminar-total]");
    const fechasInvalidas = [obtenerFiltro("fecha-desde"), obtenerFiltro("fecha-hasta")]
        .some((campo) => campo?.validity?.badInput);
    const rangoInvalido = fechaDesde && fechaHasta && fechaDesde > fechaHasta;

    if (fechasInvalidas || rangoInvalido) {
        mensaje.textContent = fechasInvalidas
            ? "Introduzca una fecha válida."
            : "La fecha inicial no puede ser posterior a la fecha final.";
        mensaje.classList.add("preliminar-filtros__estado--error");
        return;
    }

    mensaje.textContent = "";
    mensaje.classList.remove("preliminar-filtros__estado--error");
    let visibles = 0;

    modalPreliminar.querySelectorAll("[data-preliminar-fila]").forEach((fila) => {
        const fecha = fila.dataset.fecha || "";
        const coincide = (!fechaDesde || (fecha && fecha >= fechaDesde))
            && (!fechaHasta || (fecha && fecha <= fechaHasta))
            && (!tipo || fila.dataset.tipo === tipo)
            && (!estado || fila.dataset.estado === estado)
            && (!numero || normalizarTextoPreliminar(fila.dataset.numero).includes(numero))
            && (!patrono || normalizarTextoPreliminar(fila.dataset.patrono).includes(patrono));
        fila.hidden = !coincide;
        if (coincide) {
            visibles += 1;
        }
    });

    if (total) {
        total.textContent = String(visibles);
    }
    if (sinResultados) {
        sinResultados.hidden = visibles !== 0;
    }
};

const filtrarMovimientos = () => {
    const termino = String(busquedaMovimientos?.value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("es")
        .trim();
    let visibles = 0;

    modalMovimientos?.querySelectorAll("[data-movimiento-fila]").forEach((fila) => {
        const texto = fila.textContent
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase("es");
        const coincide = !termino || texto.includes(termino);
        fila.hidden = !coincide;
        if (coincide) {
            visibles += 1;
        }
    });

    if (totalMovimientos) {
        totalMovimientos.textContent = String(visibles);
    }
    if (sinResultadosMovimientos) {
        sinResultadosMovimientos.hidden = visibles !== 0;
    }
};

const mostrarEstadoMovimientos = (mensaje, tipo = "") => {
    if (!estadoMovimientos) {
        return;
    }
    estadoMovimientos.textContent = mensaje;
    estadoMovimientos.className = `movimientos-estado${tipo ? ` movimientos-estado--${tipo}` : ""}`;
};

const guardarMovimientos = async () => {
    const url = modalMovimientos?.dataset.guardarUrl;
    const tokenCsrf = document.querySelector("[name='csrfmiddlewaretoken']")?.value;
    if (!url || !tokenCsrf || !botonGuardarMovimientos) {
        return;
    }

    const registros = [...modalMovimientos.querySelectorAll("[data-movimiento-fila]")].map((fila) => ({
        inscripcion_id: Number(fila.dataset.inscripcionId),
        avance: fila.querySelector("[data-movimiento-avance]")?.value || "",
    }));

    botonGuardarMovimientos.disabled = true;
    mostrarEstadoMovimientos("Guardando comentarios...");
    try {
        const respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": tokenCsrf,
            },
            body: JSON.stringify({ registros }),
        });
        const resultado = await respuesta.json();
        if (!respuesta.ok || !resultado.ok) {
            throw new Error(resultado.mensaje || "No fue posible guardar los avances.");
        }
        modalMovimientos.querySelectorAll("[data-movimiento-avance]").forEach((campo) => {
            campo.classList.remove("movimiento-avance--modificado");
        });
        mostrarEstadoMovimientos(resultado.mensaje, "exito");
    } catch (error) {
        mostrarEstadoMovimientos(error.message || "No fue posible guardar los avances.", "error");
    } finally {
        botonGuardarMovimientos.disabled = false;
    }
};

const generarReporteMovimiento = (fila) => {
    if (!fila || !modalReporteMovimiento) {
        return;
    }

    const celdas = fila.cells;
    const escribir = (selector, valor) => {
        const elemento = modalReporteMovimiento.querySelector(selector);
        if (elemento) {
            elemento.textContent = valor || "—";
        }
    };

    escribir("[data-reporte-movimiento-fecha]", celdas[0]?.textContent.trim());
    escribir("[data-reporte-movimiento-numero]", celdas[1]?.textContent.trim());
    escribir("[data-reporte-movimiento-establecimiento]", celdas[2]?.textContent.trim());
    escribir("[data-reporte-movimiento-razon]", celdas[3]?.textContent.trim());
    escribir(
        "[data-reporte-movimiento-avance]",
        fila.querySelector("[data-movimiento-avance]")?.value.trim()
            || "Sin comentarios de avance registrados.",
    );
    escribir("[data-reporte-movimiento-cedula]", celdas[5]?.textContent.trim());

    cerrarReporte();
    abrirModalReporte(modalReporteMovimiento);
    window.print();
};

const estadoCalculoDias = (mensaje, tipo = "") => {
    const elemento = modalCalculoDias?.querySelector("[data-calculo-dias-estado]");
    if (!elemento) return;
    elemento.textContent = mensaje;
    elemento.className = `calculo-dias-estado${tipo ? ` calculo-dias-estado--${tipo}` : ""}`;
};

const datosFormularioCalculo = () => ({
    inscripcion_id: Number(modalCalculoDias?.querySelector("[data-calculo-dias-expediente]")?.value || 0),
    fecha_inicial: modalCalculoDias?.querySelector("[data-calculo-dias-inicial]")?.value || "",
    fecha_final: modalCalculoDias?.querySelector("[data-calculo-dias-final]")?.value || "",
});

const validarCalculoDias = (requiereExpediente = false) => {
    const datos = datosFormularioCalculo();
    if (requiereExpediente && !datos.inscripcion_id) return "Seleccione el expediente donde se guardará el cálculo.";
    if (!datos.fecha_inicial || !datos.fecha_final) return "Seleccione una fecha inicial y una fecha final.";
    if (datos.fecha_inicial > datos.fecha_final) return "La fecha inicial no puede ser posterior a la fecha final.";
    return "";
};

const renderizarCalculoDias = (resultado) => {
    resultadoCalculoDias = resultado;
    const cuerpo = modalCalculoDias.querySelector("[data-calculo-dias-cuerpo]");
    const resumen = modalCalculoDias.querySelector("[data-calculo-dias-resumen]");
    const valores = {
        "[data-calculo-total]": resultado.total_dias,
        "[data-calculo-habiles]": resultado.dias_habiles,
        "[data-calculo-fines-semana]": resultado.fines_semana,
        "[data-calculo-feriados]": resultado.feriados,
    };
    Object.entries(valores).forEach(([selector, valor]) => {
        modalCalculoDias.querySelector(selector).textContent = String(valor);
    });
    cuerpo.replaceChildren();
    resultado.detalle.forEach((item) => {
        const fila = document.createElement("tr");
        fila.dataset.condicion = item.condicion;
        [item.fecha_texto, item.dia, item.condicion, item.motivo || "—"].forEach((valor) => {
            const celda = document.createElement("td");
            celda.textContent = valor;
            fila.append(celda);
        });
        cuerpo.append(fila);
    });
    resumen.hidden = false;
    botonGuardarCalculoDias.disabled = false;
    botonVistaCalculoDias.disabled = false;
};

const solicitarCalculoDias = async (evento) => {
    evento?.preventDefault();
    const error = validarCalculoDias();
    if (error) {
        estadoCalculoDias(error, "error");
        return;
    }
    const boton = formularioCalculoDias.querySelector("[data-accion='calcular-dias']");
    boton.disabled = true;
    estadoCalculoDias("Consultando el calendario de feriados...");
    try {
        const respuesta = await fetch(modalCalculoDias.dataset.calcularUrl, {
            method: "POST",
            headers: {"Content-Type": "application/json", "X-CSRFToken": document.querySelector("[name='csrfmiddlewaretoken']")?.value || ""},
            body: JSON.stringify(datosFormularioCalculo()),
        });
        const resultado = await respuesta.json();
        if (!respuesta.ok || !resultado.ok) throw new Error(resultado.mensaje || "No fue posible calcular el rango.");
        renderizarCalculoDias(resultado);
        estadoCalculoDias("Cálculo completado correctamente.", "exito");
    } catch (errorSolicitud) {
        estadoCalculoDias(errorSolicitud.message, "error");
    } finally {
        boton.disabled = false;
    }
};

const guardarCalculoDias = async () => {
    const error = validarCalculoDias(true);
    if (error || !resultadoCalculoDias) {
        estadoCalculoDias(error || "Calcule el rango antes de guardarlo.", "error");
        return;
    }
    botonGuardarCalculoDias.disabled = true;
    estadoCalculoDias("Guardando el resultado en el expediente...");
    try {
        const respuesta = await fetch(modalCalculoDias.dataset.guardarUrl, {
            method: "POST",
            headers: {"Content-Type": "application/json", "X-CSRFToken": document.querySelector("[name='csrfmiddlewaretoken']")?.value || ""},
            body: JSON.stringify(datosFormularioCalculo()),
        });
        const resultado = await respuesta.json();
        if (!respuesta.ok || !resultado.ok) throw new Error(resultado.mensaje || "No fue posible guardar el cálculo.");
        estadoCalculoDias(`${resultado.mensaje} Registro #${resultado.calculo_id}.`, "exito");
    } catch (errorSolicitud) {
        estadoCalculoDias(errorSolicitud.message, "error");
    } finally {
        botonGuardarCalculoDias.disabled = false;
    }
};

const abrirReporteCalculoDias = () => {
    if (!resultadoCalculoDias) return;
    const datos = datosFormularioCalculo();
    const opcion = modalCalculoDias.querySelector("[data-calculo-dias-expediente]")?.selectedOptions[0];
    const escribir = (selector, valor) => { modalReporteCalculoDias.querySelector(selector).textContent = valor; };
    escribir("[data-reporte-calculo-expediente]", opcion?.dataset.establecimiento || opcion?.dataset.razon || "Sin seleccionar");
    escribir("[data-reporte-calculo-numero]", opcion?.dataset.numero || "S/N");
    escribir("[data-reporte-calculo-periodo]", `${formatearFechaPreliminar(datos.fecha_inicial)} al ${formatearFechaPreliminar(datos.fecha_final)}`);
    escribir("[data-reporte-calculo-total]", resultadoCalculoDias.total_dias);
    escribir("[data-reporte-calculo-habiles]", resultadoCalculoDias.dias_habiles);
    escribir("[data-reporte-calculo-fines]", resultadoCalculoDias.fines_semana);
    escribir("[data-reporte-calculo-feriados]", resultadoCalculoDias.feriados);
    const cuerpo = modalReporteCalculoDias.querySelector("[data-reporte-calculo-cuerpo]");
    cuerpo.replaceChildren();
    resultadoCalculoDias.detalle.forEach((item) => {
        const fila = document.createElement("tr");
        [item.fecha_texto, item.dia, item.condicion, item.motivo || "—"].forEach((valor) => {
            const celda = document.createElement("td"); celda.textContent = valor; fila.append(celda);
        });
        cuerpo.append(fila);
    });
    cerrarReporte();
    abrirModalReporte(modalReporteCalculoDias);
};

const mostrarEstadoFeriados = (mensaje, tipo = "") => {
    const elemento = modalCatalogoFeriados?.querySelector("[data-catalogo-feriados-estado]");
    if (!elemento) return;
    elemento.textContent = mensaje;
    elemento.className = `catalogo-feriados-estado${tipo ? ` catalogo-feriados-estado--${tipo}` : ""}`;
};

const actualizarTotalFeriados = () => {
    const total = modalCatalogoFeriados?.querySelectorAll("[data-feriado-fila][data-activo='true']").length || 0;
    document.querySelectorAll("[data-total-feriados-activos]").forEach((elemento) => {
        elemento.textContent = String(total);
    });
};

const crearFilaFeriado = (feriado) => {
    const fila = document.createElement("tr");
    fila.dataset.feriadoFila = "";
    fila.dataset.id = String(feriado.id);
    fila.dataset.fecha = feriado.fecha;
    fila.dataset.nombre = feriado.nombre;
    fila.dataset.activo = String(feriado.activo);
    const fecha = document.createElement("td"); fecha.dataset.feriadoCelda = "fecha"; fecha.textContent = feriado.fecha_texto;
    const nombre = document.createElement("td"); nombre.dataset.feriadoCelda = "nombre"; nombre.textContent = feriado.nombre;
    const estado = document.createElement("td"); estado.dataset.feriadoCelda = "estado";
    const insignia = document.createElement("span");
    insignia.className = `estado-feriado${feriado.activo ? " estado-feriado--activo" : ""}`;
    insignia.textContent = feriado.activo ? "Activo" : "Inactivo";
    estado.append(insignia);
    const acciones = document.createElement("td"); acciones.className = "tabla-catalogo-feriados__acciones";
    ["editar", "eliminar"].forEach((accion) => {
        const boton = document.createElement("button"); boton.type = "button"; boton.dataset.accion = `${accion}-feriado`; boton.textContent = accion === "editar" ? "Editar" : "Eliminar"; acciones.append(boton);
    });
    fila.append(fecha, nombre, estado, acciones);
    return fila;
};

const editarFeriado = (fila) => {
    formularioFeriado.querySelector("[data-feriado-id]").value = fila.dataset.id;
    formularioFeriado.querySelector("[data-feriado-fecha]").value = fila.dataset.fecha;
    formularioFeriado.querySelector("[data-feriado-nombre]").value = fila.dataset.nombre;
    formularioFeriado.querySelector("[data-feriado-activo]").checked = fila.dataset.activo === "true";
    formularioFeriado.querySelector("[data-feriado-nombre]").focus();
    mostrarEstadoFeriados(`Editando: ${fila.dataset.nombre}`);
};

const guardarFeriado = async (evento) => {
    evento.preventDefault();
    const fecha = formularioFeriado.querySelector("[data-feriado-fecha]").value;
    const nombre = formularioFeriado.querySelector("[data-feriado-nombre]").value.trim();
    if (!fecha || !nombre) {
        mostrarEstadoFeriados("Complete la fecha y el nombre del feriado.", "error");
        return;
    }
    const boton = formularioFeriado.querySelector("[data-accion='guardar-feriado']");
    boton.disabled = true;
    try {
        const respuesta = await fetch(modalCatalogoFeriados.dataset.guardarUrl, {
            method: "POST",
            headers: {"Content-Type": "application/json", "X-CSRFToken": document.querySelector("[name='csrfmiddlewaretoken']")?.value || ""},
            body: JSON.stringify({
                feriado_id: Number(formularioFeriado.querySelector("[data-feriado-id]").value) || null,
                fecha,
                nombre,
                activo: formularioFeriado.querySelector("[data-feriado-activo]").checked,
            }),
        });
        const resultado = await respuesta.json();
        if (!respuesta.ok || !resultado.ok) throw new Error(resultado.mensaje || "No fue posible guardar el feriado.");
        const existente = modalCatalogoFeriados.querySelector(`[data-feriado-fila][data-id='${resultado.feriado.id}']`);
        const nuevaFila = crearFilaFeriado(resultado.feriado);
        existente ? existente.replaceWith(nuevaFila) : modalCatalogoFeriados.querySelector("[data-feriados-cuerpo]").append(nuevaFila);
        modalCatalogoFeriados.querySelector("[data-feriados-vacio]")?.remove();
        formularioFeriado.reset();
        formularioFeriado.querySelector("[data-feriado-id]").value = "";
        actualizarTotalFeriados();
        mostrarEstadoFeriados(resultado.mensaje, "exito");
    } catch (error) {
        mostrarEstadoFeriados(error.message, "error");
    } finally {
        boton.disabled = false;
    }
};

const eliminarFeriado = async (fila) => {
    if (!window.confirm(`¿Eliminar el feriado “${fila.dataset.nombre}”?`)) return;
    try {
        const respuesta = await fetch(modalCatalogoFeriados.dataset.eliminarUrl, {
            method: "POST",
            headers: {"Content-Type": "application/json", "X-CSRFToken": document.querySelector("[name='csrfmiddlewaretoken']")?.value || ""},
            body: JSON.stringify({feriado_id: Number(fila.dataset.id)}),
        });
        const resultado = await respuesta.json();
        if (!respuesta.ok || !resultado.ok) throw new Error(resultado.mensaje || "No fue posible eliminar el feriado.");
        fila.remove();
        actualizarTotalFeriados();
        mostrarEstadoFeriados(resultado.mensaje, "exito");
    } catch (error) {
        mostrarEstadoFeriados(error.message, "error");
    }
};

const nombresTiposMaestro = {
    cierre_inactividad: {codigo: "6", nombre: "INACTIVIDAD"},
    reactivacion: {codigo: "9", nombre: "REACTIVACIONES"},
    operativos: {codigo: "8", nombre: "OPERATIVOS"},
    certificaciones: {codigo: "C", nombre: "CERTIFICACIONES"},
};

const obtenerPeriodoMaestro = () => {
    const modo = modalMaestro.querySelector("[data-maestro-modo]").value;
    const anio = modalMaestro.querySelector("[data-maestro-anio]").value;
    const mes = modalMaestro.querySelector("[data-maestro-mes]").value;
    const desde = modalMaestro.querySelector("[data-maestro-desde]").value;
    const hasta = modalMaestro.querySelector("[data-maestro-hasta]").value;
    if (modo !== "rango" && (!anio || Number(anio) < 2000 || Number(anio) > 2100)) {
        return {error: "Introduzca un año válido entre 2000 y 2100."};
    }
    if (modo === "rango") {
        if (!desde || !hasta) return {error: "Seleccione la fecha inicial y final del rango."};
        if (desde > hasta) return {error: "La fecha inicial no puede ser posterior a la fecha final."};
        return {modo, desde, hasta, texto: `${formatearFechaPreliminar(desde)} al ${formatearFechaPreliminar(hasta)}`};
    }
    if (modo === "mes") return {modo, anio, mes, texto: `${modalMaestro.querySelector("[data-maestro-mes]").selectedOptions[0].textContent} ${anio}`};
    return {modo, anio, texto: `Año completo ${anio}`};
};

const coincidePeriodoMaestro = (fecha, periodo) => {
    if (!fecha) return false;
    if (periodo.modo === "rango") return fecha >= periodo.desde && fecha <= periodo.hasta;
    const [anio, mes] = fecha.split("-");
    return anio === periodo.anio && (periodo.modo !== "mes" || mes === periodo.mes);
};

const actualizarCamposMaestro = () => {
    const modo = modalMaestro.querySelector("[data-maestro-modo]").value;
    modalMaestro.querySelector("[data-maestro-campo='mes']").hidden = modo !== "mes";
    modalMaestro.querySelector("[data-maestro-campo='anio']").hidden = modo === "rango";
    modalMaestro.querySelector("[data-maestro-campo='desde']").hidden = modo !== "rango";
    modalMaestro.querySelector("[data-maestro-campo='hasta']").hidden = modo !== "rango";
};

const filtrarMaestro = () => {
    actualizarCamposMaestro();
    const periodo = obtenerPeriodoMaestro();
    const estado = modalMaestro.querySelector("[data-maestro-estado]");
    if (periodo.error) {
        estado.textContent = periodo.error;
        estado.className = "maestro-estado maestro-estado--error";
        return;
    }
    let visibles = 0;
    modalMaestro.querySelectorAll("[data-maestro-fila]").forEach((fila) => {
        const coincide = coincidePeriodoMaestro(fila.dataset.fecha, periodo);
        fila.hidden = !coincide;
        if (coincide) visibles += 1;
    });
    modalMaestro.querySelector("[data-maestro-periodo-texto]").textContent = `${periodo.texto} · ${visibles} registros`;
    estado.textContent = visibles ? "Seleccione el tipo de reporte que desea generar." : "No hay registros en el período seleccionado.";
    estado.className = "maestro-estado";
};

const inicializarMaestro = () => {
    const ahora = new Date();
    const anio = modalMaestro.querySelector("[data-maestro-anio]");
    const mes = modalMaestro.querySelector("[data-maestro-mes]");
    if (!anio.value) anio.value = String(ahora.getFullYear());
    mes.value = String(ahora.getMonth() + 1).padStart(2, "0");
    filtrarMaestro();
};

const generarReporteMaestro = (tipo) => {
    const periodo = obtenerPeriodoMaestro();
    const estado = modalMaestro.querySelector("[data-maestro-estado]");
    if (periodo.error) {
        estado.textContent = periodo.error;
        estado.className = "maestro-estado maestro-estado--error";
        return;
    }
    const filas = [...modalMaestro.querySelectorAll(`[data-maestro-fila][data-tipo='${tipo}']`)]
        .filter((fila) => coincidePeriodoMaestro(fila.dataset.fecha, periodo));
    if (!filas.length) {
        estado.textContent = `No hay registros de ${nombresTiposMaestro[tipo].nombre.toLowerCase()} en ${periodo.texto}.`;
        estado.className = "maestro-estado maestro-estado--error";
        return;
    }

    const configuracion = nombresTiposMaestro[tipo];
    const cuerpo = modalReporteMaestro.querySelector("[data-reporte-maestro-cuerpo]");
    cuerpo.replaceChildren();
    filas.forEach((fila) => {
        const celdas = fila.cells;
        const establecimiento = celdas[3]?.textContent.trim() || "";
        const razon = celdas[4]?.textContent.trim() || "";
        const empleador = razon && normalizarTextoPreliminar(razon) !== normalizarTextoPreliminar(establecimiento) ? `${establecimiento} / ${razon}` : establecimiento || razon;
        const valores = ["", configuracion.nombre, celdas[1]?.textContent.trim(), celdas[2]?.textContent.trim(), empleador, celdas[5]?.textContent.trim(), celdas[6]?.textContent.trim()];
        const filaReporte = document.createElement("tr");
        valores.forEach((valor) => { const celda = document.createElement("td"); celda.textContent = valor || ""; filaReporte.append(celda); });
        cuerpo.append(filaReporte);
    });
    const hoy = new Date();
    const fechaHoy = [String(hoy.getDate()).padStart(2, "0"), String(hoy.getMonth() + 1).padStart(2, "0"), hoy.getFullYear()].join("/");
    modalReporteMaestro.querySelector("[data-reporte-maestro-titulo]").textContent = `Listado de ${configuracion.nombre.toLowerCase()}`;
    modalReporteMaestro.querySelector("[data-reporte-maestro-subtitulo]").textContent = `LISTADO DE ${configuracion.nombre} – ${periodo.texto.toUpperCase()}`;
    modalReporteMaestro.querySelector("[data-reporte-maestro-fecha]").textContent = fechaHoy;
    modalReporteMaestro.querySelector("[data-reporte-maestro-tipo]").textContent = configuracion.nombre;
    modalReporteMaestro.querySelector("[data-reporte-maestro-periodo]").textContent = periodo.texto;
    modalReporteMaestro.querySelector("[data-reporte-maestro-total]").textContent = String(filas.length);
    cerrarReporte();
    abrirModalReporte(modalReporteMaestro);
    window.print();
};

const mostrarEstadoInforme = (mensaje, tipo = "") => {
    const elemento = modalInformeInscripcion?.querySelector("[data-informe-estado]");
    if (!elemento) return;
    elemento.textContent = mensaje;
    elemento.className = `informe-inscripcion-estado${tipo ? ` informe-inscripcion-estado--${tipo}` : ""}`;
};

const seleccionarInformeInscripcion = (item) => {
    informeInscripcionSeleccionado = item;
    modalInformeInscripcion.querySelectorAll("[data-informe-item]").forEach((boton) => boton.classList.toggle("activo", boton === item));
    const base = {
        ruc: item.dataset.ruc, sipe: item.dataset.sipe, razon: item.dataset.razon,
        establecimiento: item.dataset.establecimiento, direccion: item.dataset.direccion,
        representante: item.dataset.representante, cedulaRepresentante: item.dataset.cedulaRepresentante,
    };
    Object.entries(base).forEach(([nombre, valor]) => {
        const campo = modalInformeInscripcion.querySelector(`[data-informe-base='${nombre}']`);
        if (campo) campo.value = valor || "";
    });
    const guardados = datosInformesInscripcion[item.dataset.id] || {};
    modalInformeInscripcion.querySelectorAll("[data-informe-campo]").forEach((campo) => {
        const valor = guardados[campo.dataset.informeCampo];
        if (campo.type === "checkbox") campo.checked = Boolean(valor);
        else campo.value = valor ?? "";
    });
    if (!guardados.fechaInscripcion) modalInformeInscripcion.querySelector("[data-informe-campo='fechaInscripcion']").value = item.dataset.fecha || "";
    const calculo = datosCalculosInscripcion[item.dataset.id] || {};
    modalInformeInscripcion.querySelector("[data-informe-total-dias]").textContent = calculo.total_dias || 0;
    modalInformeInscripcion.querySelector("[data-informe-dias-habiles]").textContent = calculo.dias_habiles || 0;
    modalInformeInscripcion.querySelector("[data-informe-dias-libres]").textContent = calculo.dias_libres || 0;
    mostrarEstadoInforme(guardados.fechaInforme ? "Informe guardado cargado." : "Complete los datos del informe.");
};

const datosActualesInformeInscripcion = () => {
    const datos = {};
    modalInformeInscripcion.querySelectorAll("[data-informe-campo]").forEach((campo) => {
        datos[campo.dataset.informeCampo] = campo.type === "checkbox" ? campo.checked : campo.value.trim();
    });
    return datos;
};

const guardarInformeInscripcion = async () => {
    if (!informeInscripcionSeleccionado) {
        mostrarEstadoInforme("Seleccione un registro de inscripción.", "error"); return;
    }
    const boton = modalInformeInscripcion.querySelector("[data-accion='guardar-informe-inscripcion']");
    boton.disabled = true; mostrarEstadoInforme("Guardando informe...");
    try {
        const datos = datosActualesInformeInscripcion();
        const respuesta = await fetch(modalInformeInscripcion.dataset.guardarUrl, {
            method: "POST", headers: {"Content-Type": "application/json", "X-CSRFToken": document.querySelector("[name='csrfmiddlewaretoken']")?.value || ""},
            body: JSON.stringify({inscripcion_id: Number(informeInscripcionSeleccionado.dataset.id), datos}),
        });
        const resultado = await respuesta.json();
        if (!respuesta.ok || !resultado.ok) throw new Error(resultado.mensaje || "No fue posible guardar el informe.");
        datosInformesInscripcion[informeInscripcionSeleccionado.dataset.id] = resultado.datos;
        mostrarEstadoInforme(resultado.mensaje, "exito");
    } catch (error) { mostrarEstadoInforme(error.message, "error"); }
    finally { boton.disabled = false; }
};

const abrirCalculoDesdeInforme = () => {
    if (!informeInscripcionSeleccionado) { mostrarEstadoInforme("Seleccione un registro de inscripción.", "error"); return; }
    const selector = modalCalculoDias.querySelector("[data-calculo-dias-expediente]");
    selector.value = informeInscripcionSeleccionado.dataset.id;
    modalCalculoDias.querySelector("[data-calculo-dias-inicial]").value = informeInscripcionSeleccionado.dataset.fecha || "";
    modalCalculoDias.querySelector("[data-calculo-dias-final]").value = informeInscripcionSeleccionado.dataset.calendario || "";
    resultadoCalculoDias = null; botonGuardarCalculoDias.disabled = true; botonVistaCalculoDias.disabled = true;
    cerrarReporte(); abrirModalReporte(modalCalculoDias);
};

const filtrarInformesInscripcion = () => {
    const termino = normalizarTextoPreliminar(modalInformeInscripcion.querySelector("[data-informe-busqueda]").value);
    modalInformeInscripcion.querySelectorAll("[data-informe-item]").forEach((item) => {
        item.hidden = Boolean(termino) && !normalizarTextoPreliminar(item.textContent).includes(termino);
    });
};

const abrirInformeInscripcion = () => {
    abrirModalReporte(modalInformeInscripcion);
    if (!informeInscripcionSeleccionado) {
        const primero = modalInformeInscripcion.querySelector("[data-informe-item]");
        if (primero) seleccionarInformeInscripcion(primero);
    }
};

const cerrarReporte = () => {
    document.querySelectorAll(".modal-reporte.abierto").forEach((modal) => {
        modal.classList.remove("abierto");
        modal.setAttribute("aria-hidden", "true");
    });
    modalActivo = null;
    document.body.classList.remove("modal-abierto");
};

const filtrarOperativos = () => {
    const termino = busquedaOperativos?.value.trim().toLocaleLowerCase("es") || "";
    const mes = filtroMesOperativos?.value || "";
    const anio = filtroAnioOperativos?.value || "";
    let visibles = 0;

    document.querySelectorAll("[data-operativos-fila]").forEach((fila) => {
        const fecha = fila.dataset.operativoFecha || "";
        const [anioFila = "", mesFila = ""] = fecha.split("-");
        const coincideTexto = !termino || fila.textContent.toLocaleLowerCase("es").includes(termino);
        const coincideMes = !mes || mesFila === mes;
        const coincideAnio = !anio || anioFila === anio;
        const coincide = coincideTexto && coincideMes && coincideAnio;
        fila.hidden = !coincide;
        if (coincide) {
            visibles += 1;
        }
    });

    if (totalOperativos) {
        totalOperativos.textContent = String(visibles);
    }
    if (sinResultadosOperativos) {
        sinResultadosOperativos.hidden = visibles !== 0;
    }
};

const inicializarAniosOperativos = () => {
    if (!filtroAnioOperativos || filtroAnioOperativos.options.length > 1) {
        return;
    }
    const anios = new Set();
    document.querySelectorAll("[data-operativo-fecha]").forEach((fila) => {
        const anio = fila.dataset.operativoFecha?.split("-")[0];
        if (anio) {
            anios.add(anio);
        }
    });
    [...anios].sort((a, b) => b.localeCompare(a)).forEach((anio) => {
        const opcion = document.createElement("option");
        opcion.value = anio;
        opcion.textContent = anio;
        filtroAnioOperativos.append(opcion);
    });
};

const numeroOperativo = (valor) => {
    const texto = String(valor || "").trim();
    const normalizado = texto.includes(",")
        ? texto.replace(/\./g, "").replace(",", ".")
        : texto;
    const numero = Number(normalizado);
    return Number.isFinite(numero) ? numero : 0;
};

const dineroOperativo = (valor) => Number(valor || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const completarReporteOperativos = () => {
    const filas = [...document.querySelectorAll("[data-operativos-fila]")].filter((fila) => !fila.hidden);
    const cuerpo = document.querySelector("[data-reporte-operativos-cuerpo]");
    const pie = document.querySelector("[data-reporte-operativos-totales]");
    const ahora = new Date();
    const mesSeleccionado = filtroMesOperativos?.selectedOptions[0]?.textContent || "Todos";
    const anioSeleccionado = filtroAnioOperativos?.value || "Todos";
    const totales = Array(9).fill(0);

    document.querySelector("[data-reporte-operativos-fecha]").textContent = [
        String(ahora.getDate()).padStart(2, "0"),
        String(ahora.getMonth() + 1).padStart(2, "0"),
        ahora.getFullYear(),
    ].join("/");
    document.querySelector("[data-reporte-operativos-mes]").textContent = mesSeleccionado.toUpperCase();
    document.querySelector("[data-reporte-operativos-anio]").textContent = anioSeleccionado;
    cuerpo.replaceChildren();
    pie.replaceChildren();

    filas.forEach((fila, indice) => {
        const celdas = fila.cells;
        const salario = numeroOperativo(celdas[8]?.textContent);
        const valoresNumericos = [9, 10, 11, 12, 13, 14, 15].map((posicion) => numeroOperativo(celdas[posicion]?.textContent));
        valoresNumericos.forEach((valor, posicion) => { totales[posicion] += valor; });
        totales[7] += salario;
        totales[8] += salario * 0.23;

        const razon1 = celdas[3]?.textContent.trim() || "";
        const razon2 = celdas[4]?.textContent.trim() || "";
        const datos = [
            indice + 1,
            celdas[0]?.textContent.trim(),
            celdas[2]?.textContent.trim(),
            razon2 && razon2 !== razon1 ? `${razon1} / ${razon2}` : razon1,
            ...valoresNumericos,
            celdas[16]?.textContent.trim(),
            celdas[17]?.textContent.trim(),
            dineroOperativo(salario),
            dineroOperativo(salario * 0.23),
        ];
        const filaReporte = document.createElement("tr");
        datos.forEach((dato) => {
            const celda = document.createElement("td");
            celda.textContent = dato ?? "";
            filaReporte.append(celda);
        });
        cuerpo.append(filaReporte);
    });

    if (!filas.length) {
        const filaVacia = document.createElement("tr");
        const celda = document.createElement("td");
        celda.colSpan = 15;
        celda.textContent = "No hay registros para el período seleccionado.";
        filaVacia.append(celda);
        cuerpo.append(filaVacia);
    }

    const filaTotales = document.createElement("tr");
    const datosTotales = [filas.length, "TOTALES", ...totales.slice(0, 7), "", "", dineroOperativo(totales[7]), dineroOperativo(totales[8])];
    datosTotales.forEach((dato, indice) => {
        const celda = document.createElement("td");
        celda.textContent = dato;
        if (indice === 1) {
            celda.colSpan = 3;
        }
        filaTotales.append(celda);
    });
    pie.append(filaTotales);
};

const alternarFormularioOperativo = (mostrar) => {
    if (!formularioOperativo) {
        return;
    }
    formularioOperativo.hidden = !mostrar;
    if (mostrar) {
        formularioOperativo.querySelector("[name='fecha']")?.focus();
    } else {
        estadoOperativos.textContent = "";
    }
};

const crearFilaOperativo = (operativo) => {
    if (!cuerpoOperativos) {
        return;
    }

    cuerpoOperativos.querySelector(".tabla-operativos__vacia")?.remove();
    const fila = document.createElement("tr");
    fila.dataset.operativosFila = "";
    fila.dataset.operativoId = String(operativo.id);
    const [dia, mes, anio] = operativo.fecha.split("/");
    fila.dataset.operativoFecha = `${anio}-${mes}-${dia}`;
    if (filtroAnioOperativos && !filtroAnioOperativos.querySelector(`option[value='${anio}']`)) {
        const opcionAnio = document.createElement("option");
        opcionAnio.value = anio;
        opcionAnio.textContent = anio;
        filtroAnioOperativos.append(opcionAnio);
    }
    const valores = [
        operativo.fecha,
        operativo.consecutivo,
        operativo.numero_patronal,
        operativo.patrono_1,
        operativo.patrono_2,
        operativo.movimiento,
        operativo.fecha_informe,
        operativo.numero_informe,
        operativo.salario,
        operativo.empleados_nacionales,
        operativo.empleados_extranjeros,
        operativo.entrevistados,
        operativo.omitidos_nacionales,
        operativo.omitidos_extranjeros,
        operativo.sin_ficha,
        operativo.recien_ingresados,
        operativo.citados,
        operativo.no_inscritos,
    ];

    valores.forEach((valor, indice) => {
        const celda = document.createElement("td");
        celda.textContent = valor ?? "";
        if (indice >= 8) {
            celda.classList.add("tabla-operativos__numero");
        }
        fila.append(celda);
    });
    cuerpoOperativos.prepend(fila);
};

const guardarOperativo = async (evento) => {
    evento.preventDefault();
    const url = modalOperativos?.dataset.guardarUrl;
    const tokenCsrf = document.querySelector("[name='csrfmiddlewaretoken']")?.value;
    if (!formularioOperativo || !url || !tokenCsrf) {
        return;
    }

    botonGuardarOperativo.disabled = true;
    estadoOperativos.textContent = "Guardando registro...";
    estadoOperativos.className = "";

    try {
        const datos = Object.fromEntries(new FormData(formularioOperativo).entries());
        const respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": tokenCsrf,
                "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify(datos),
        });
        const resultado = await respuesta.json();
        if (!respuesta.ok || !resultado.ok) {
            throw new Error(resultado.mensaje || "No fue posible guardar el registro.");
        }

        crearFilaOperativo(resultado.operativo);
        formularioOperativo.reset();
        formularioOperativo.querySelector("[name='salario']").value = "0.00";
        estadoOperativos.textContent = resultado.mensaje;
        estadoOperativos.className = "operativos-estado--exito";
        filtrarOperativos();
    } catch (error) {
        estadoOperativos.textContent = error.message || "No fue posible guardar el registro.";
        estadoOperativos.className = "operativos-estado--error";
    } finally {
        botonGuardarOperativo.disabled = false;
    }
};

botonAbrirReporte?.addEventListener("click", () => {
    abrirModalReporte(modalReporte, completarReporteDetalleEmpleados);
});
botonAbrirActa?.addEventListener("click", () => {
    abrirModalReporte(modalActa, completarReporteActa);
});
botonAbrirPlanilla?.addEventListener("click", () => {
    abrirModalReporte(modalPlanilla, completarModuloPlanilla);
});
botonAbrirPreliminar?.addEventListener("click", () => {
    abrirModalReporte(modalPreliminar, completarPreliminar);
});
botonAbrirMovimientos?.addEventListener("click", () => {
    abrirModalReporte(modalMovimientos, filtrarMovimientos);
    busquedaMovimientos?.focus();
});
botonAbrirCalculoDias?.addEventListener("click", () => abrirModalReporte(modalCalculoDias));
botonAbrirMaestro?.addEventListener("click", () => abrirModalReporte(modalMaestro, inicializarMaestro));
botonAbrirInformeInscripcion?.addEventListener("click", abrirInformeInscripcion);
document.querySelector("[data-accion='abrir-catalogo-feriados']")?.addEventListener("click", () => {
    cerrarReporte();
    abrirModalReporte(modalCatalogoFeriados);
});
document.querySelector("[data-accion='volver-calculo-desde-feriados']")?.addEventListener("click", () => {
    cerrarReporte();
    resultadoCalculoDias = null;
    botonGuardarCalculoDias.disabled = true;
    botonVistaCalculoDias.disabled = true;
    modalCalculoDias.querySelector("[data-calculo-dias-resumen]").hidden = true;
    estadoCalculoDias("El calendario cambió; vuelva a calcular el rango.");
    abrirModalReporte(modalCalculoDias);
});
botonAbrirOperativos?.addEventListener("click", () => {
    inicializarAniosOperativos();
    abrirModalReporte(modalOperativos, filtrarOperativos);
    busquedaOperativos?.focus();
});
botonAbrirInactividad?.addEventListener("click", () => abrirModalReporte(modalInactividad, completarModuloInactividad));
botonGenerarPdfOperativos?.addEventListener("click", () => {
    cerrarReporte();
    abrirModalReporte(modalReporteOperativos, completarReporteOperativos);
});
document.querySelectorAll("[data-accion='abrir-reporte-avances']").forEach((boton) => boton.addEventListener("click", () => {
    cerrarReporte();
    abrirModalReporte(modalAvances, completarReporteAvances);
}));
botonAbrirCitacion?.addEventListener("click", () => {
    abrirModalReporte(modalModuloCitacion, completarModuloCitacion);
});
botonAbrirReactivacion?.addEventListener("click", () => {
    abrirModalReporte(modalModuloReactivacion, completarModuloReactivacion);
});
botonGenerarReporteReactivacion?.addEventListener("click", () => {
    if (!reactivacionSeleccionadaId) {
        mostrarEstadoReactivacion("Seleccione una gestión de reactivación.", "error");
        return;
    }

    cerrarReporte();
    abrirModalReporte(modalReporteReactivacion, completarReporteReactivacion);
});
botonGenerarCitacion?.addEventListener("click", () => {
    cerrarReporte();
    abrirModalReporte(modalCitacion, completarReporteCitacion);
});
botonesCerrarReporte.forEach((boton) => boton.addEventListener("click", cerrarReporte));
botonesImprimirReporte.forEach((boton) => {
    boton.addEventListener("click", () => window.print());
});
document.querySelectorAll("[data-reactivacion-item]").forEach((item) => {
    item.addEventListener("click", () => seleccionarReactivacion(item));
});
tabsReactivacion.forEach((tab) => {
    tab.addEventListener("click", () => activarTabReactivacion(tab.dataset.reactivacionTab));
});
radiosNuevaDireccion.forEach((radio) => {
    radio.addEventListener("change", actualizarVisibilidadDireccionActual);
});
botonGuardarReactivacion?.addEventListener("click", guardarReactivacion);
botonGuardarPlanilla?.addEventListener("click", guardarPlanilla);
botonGuardarInactividad?.addEventListener("click", guardarInactividad);
document.querySelectorAll("[data-inactividad-item]").forEach((item) => item.addEventListener("click", () => seleccionarInactividad(item)));
document.querySelectorAll("[data-inactividad-tab]").forEach((tab) => tab.addEventListener("click", () => activarTabInactividad(tab.dataset.inactividadTab)));
document.querySelectorAll("[data-planilla-item]").forEach((item) => item.addEventListener("click", () => seleccionarPlanilla(item)));
busquedaOperativos?.addEventListener("input", filtrarOperativos);
filtroMesOperativos?.addEventListener("change", filtrarOperativos);
filtroAnioOperativos?.addEventListener("change", filtrarOperativos);
botonNuevoOperativo?.addEventListener("click", () => alternarFormularioOperativo(true));
botonCancelarOperativo?.addEventListener("click", () => alternarFormularioOperativo(false));
formularioOperativo?.addEventListener("submit", guardarOperativo);
busquedaMovimientos?.addEventListener("input", filtrarMovimientos);
botonGuardarMovimientos?.addEventListener("click", guardarMovimientos);
formularioCalculoDias?.addEventListener("submit", solicitarCalculoDias);
botonGuardarCalculoDias?.addEventListener("click", guardarCalculoDias);
botonVistaCalculoDias?.addEventListener("click", abrirReporteCalculoDias);
formularioFeriado?.addEventListener("submit", guardarFeriado);
formularioFeriado?.addEventListener("reset", () => {
    window.setTimeout(() => {
        formularioFeriado.querySelector("[data-feriado-id]").value = "";
        mostrarEstadoFeriados("");
    }, 0);
});
modalCatalogoFeriados?.querySelector("[data-feriados-cuerpo]")?.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button[data-accion]");
    const fila = boton?.closest("[data-feriado-fila]");
    if (!boton || !fila) return;
    if (boton.dataset.accion === "editar-feriado") editarFeriado(fila);
    if (boton.dataset.accion === "eliminar-feriado") eliminarFeriado(fila);
});
modalMaestro?.querySelector("[data-maestro-filtros]")?.addEventListener("change", filtrarMaestro);
modalMaestro?.querySelector("[data-maestro-filtros]")?.addEventListener("input", filtrarMaestro);
modalMaestro?.querySelectorAll("[data-generar-maestro]").forEach((boton) => {
    boton.addEventListener("click", () => generarReporteMaestro(boton.dataset.generarMaestro));
});
modalInformeInscripcion?.querySelectorAll("[data-informe-item]").forEach((item) => item.addEventListener("click", () => seleccionarInformeInscripcion(item)));
modalInformeInscripcion?.querySelector("[data-informe-busqueda]")?.addEventListener("input", filtrarInformesInscripcion);
modalInformeInscripcion?.querySelector("[data-accion='guardar-informe-inscripcion']")?.addEventListener("click", guardarInformeInscripcion);
modalInformeInscripcion?.querySelector("[data-accion='calculo-desde-informe']")?.addEventListener("click", abrirCalculoDesdeInforme);
formularioCalculoDias?.querySelectorAll("input, select").forEach((campo) => {
    campo.addEventListener("change", () => {
        resultadoCalculoDias = null;
        botonGuardarCalculoDias.disabled = true;
        botonVistaCalculoDias.disabled = true;
        modalCalculoDias.querySelector("[data-calculo-dias-resumen]").hidden = true;
        estadoCalculoDias("Las fechas o el expediente cambiaron; vuelva a calcular.");
    });
});
modalMovimientos?.querySelectorAll("[data-movimiento-avance]").forEach((campo) => {
    campo.addEventListener("input", () => {
        campo.classList.add("movimiento-avance--modificado");
        mostrarEstadoMovimientos("Hay comentarios pendientes de guardar.");
    });
});
modalMovimientos?.querySelectorAll("[data-accion='imprimir-movimiento']").forEach((boton) => {
    boton.addEventListener("click", () => generarReporteMovimiento(boton.closest("[data-movimiento-fila]")));
});
document.querySelectorAll("[data-preliminar-tipo]").forEach((boton) => {
    boton.addEventListener("click", () => {
        const tipo = boton.dataset.preliminarTipo || "inicial";
        seleccionarTipoPreliminar(tipo);
        generarReportePreliminar(tipo);
    });
});
modalPreliminar?.querySelector("[data-preliminar-filtros]")?.addEventListener("input", filtrarPreliminar);
modalPreliminar?.querySelector("[data-preliminar-filtros]")?.addEventListener("change", filtrarPreliminar);
modalPreliminar?.querySelector("[data-preliminar-filtros]")?.addEventListener("submit", (evento) => evento.preventDefault());
modalPreliminar?.querySelector("[data-preliminar-filtros]")?.addEventListener("reset", () => {
    window.setTimeout(filtrarPreliminar, 0);
});

modalReporte?.addEventListener("click", (evento) => {
    if (evento.target === modalReporte) {
        cerrarReporte();
    }
});
modalActa?.addEventListener("click", (evento) => {
    if (evento.target === modalActa) {
        cerrarReporte();
    }
});
modalPlanilla?.addEventListener("click", (evento) => {
    if (evento.target === modalPlanilla) {
        cerrarReporte();
    }
});
modalOperativos?.addEventListener("click", (evento) => {
    if (evento.target === modalOperativos) {
        cerrarReporte();
    }
});
modalPreliminar?.addEventListener("click", (evento) => {
    if (evento.target === modalPreliminar) {
        cerrarReporte();
    }
});
modalReportePreliminar?.addEventListener("click", (evento) => {
    if (evento.target === modalReportePreliminar) {
        cerrarReporte();
    }
});
modalMovimientos?.addEventListener("click", (evento) => {
    if (evento.target === modalMovimientos) {
        cerrarReporte();
    }
});
modalReporteMovimiento?.addEventListener("click", (evento) => {
    if (evento.target === modalReporteMovimiento) {
        cerrarReporte();
    }
});
modalCalculoDias?.addEventListener("click", (evento) => {
    if (evento.target === modalCalculoDias) cerrarReporte();
});
modalReporteCalculoDias?.addEventListener("click", (evento) => {
    if (evento.target === modalReporteCalculoDias) cerrarReporte();
});
modalCatalogoFeriados?.addEventListener("click", (evento) => {
    if (evento.target === modalCatalogoFeriados) cerrarReporte();
});
modalMaestro?.addEventListener("click", (evento) => {
    if (evento.target === modalMaestro) cerrarReporte();
});
modalReporteMaestro?.addEventListener("click", (evento) => {
    if (evento.target === modalReporteMaestro) cerrarReporte();
});
modalInformeInscripcion?.addEventListener("click", (evento) => {
    if (evento.target === modalInformeInscripcion) cerrarReporte();
});
modalInactividad?.addEventListener("click", (evento) => {
    if (evento.target === modalInactividad) cerrarReporte();
});
modalReporteOperativos?.addEventListener("click", (evento) => {
    if (evento.target === modalReporteOperativos) {
        cerrarReporte();
    }
});
modalAvances?.addEventListener("click", (evento) => {
    if (evento.target === modalAvances) {
        cerrarReporte();
    }
});
modalModuloCitacion?.addEventListener("click", (evento) => {
    if (evento.target === modalModuloCitacion) {
        cerrarReporte();
    }
});
modalModuloReactivacion?.addEventListener("click", (evento) => {
    if (evento.target === modalModuloReactivacion) {
        cerrarReporte();
    }
});
modalReporteReactivacion?.addEventListener("click", (evento) => {
    if (evento.target === modalReporteReactivacion) {
        cerrarReporte();
    }
});
modalCitacion?.addEventListener("click", (evento) => {
    if (evento.target === modalCitacion) {
        cerrarReporte();
    }
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && modalActivo?.classList.contains("abierto")) {
        cerrarReporte();
    }
});
