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
const modalOperativos = document.querySelector("[data-modulo-operativos]");
const modalInactividad = document.querySelector("[data-modulo-inactividad]");
const modalReporteOperativos = document.querySelector("[data-reporte-operativos]");
const modalModuloCitacion = document.querySelector("[data-modulo-citacion]");
const modalModuloReactivacion = document.querySelector("[data-modulo-reactivacion]");
const modalReporteReactivacion = document.querySelector("[data-reporte-reactivacion]");
const modalCitacion = document.querySelector("[data-reporte-citacion]");
const modalAvances = document.querySelector("[data-reporte-avances]");
const botonAbrirReporte = document.querySelector("[data-accion='abrir-reporte-detalle-empleados']");
const botonAbrirActa = document.querySelector("[data-accion='abrir-reporte-acta']");
const botonAbrirOperativos = document.querySelector("[data-accion='abrir-operativos']");
const botonAbrirInactividad = document.querySelector("[data-accion='abrir-modulo-inactividad']");
const botonGuardarInactividad = document.querySelector("[data-accion='guardar-inactividad']");
const botonGenerarPdfOperativos = document.querySelector("[data-accion='generar-pdf-operativos']");
const botonAbrirCitacion = document.querySelector("[data-accion='abrir-reporte-citacion']");
const botonAbrirAvances = document.querySelector("[data-accion='abrir-reporte-avances']");
const botonAbrirReactivacion = document.querySelector("[data-accion='abrir-modulo-reactivacion']");
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
let inactividadSeleccionadaId = null;
let reactivacionSeleccionadaId = null;
let modalActivo = null;

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
    completar();
    modalActivo = modal;
    modalActivo?.classList.add("abierto");
    modalActivo?.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-abierto");
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
botonAbrirAvances?.addEventListener("click", () => {
    abrirModalReporte(modalAvances, completarReporteAvances);
});
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
botonGuardarInactividad?.addEventListener("click", guardarInactividad);
document.querySelectorAll("[data-inactividad-item]").forEach((item) => item.addEventListener("click", () => seleccionarInactividad(item)));
document.querySelectorAll("[data-inactividad-tab]").forEach((tab) => tab.addEventListener("click", () => activarTabInactividad(tab.dataset.inactividadTab)));
busquedaOperativos?.addEventListener("input", filtrarOperativos);
filtroMesOperativos?.addEventListener("change", filtrarOperativos);
filtroAnioOperativos?.addEventListener("change", filtrarOperativos);
botonNuevoOperativo?.addEventListener("click", () => alternarFormularioOperativo(true));
botonCancelarOperativo?.addEventListener("click", () => alternarFormularioOperativo(false));
formularioOperativo?.addEventListener("submit", guardarOperativo);

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
modalOperativos?.addEventListener("click", (evento) => {
    if (evento.target === modalOperativos) {
        cerrarReporte();
    }
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
