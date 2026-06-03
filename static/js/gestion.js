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
const modalModuloCitacion = document.querySelector("[data-modulo-citacion]");
const modalCitacion = document.querySelector("[data-reporte-citacion]");
const modalAvances = document.querySelector("[data-reporte-avances]");
const botonAbrirReporte = document.querySelector("[data-accion='abrir-reporte-detalle-empleados']");
const botonAbrirCitacion = document.querySelector("[data-accion='abrir-reporte-citacion']");
const botonAbrirAvances = document.querySelector("[data-accion='abrir-reporte-avances']");
const botonGenerarCitacion = document.querySelector("[data-accion='generar-reporte-citacion']");
const botonesCerrarReporte = document.querySelectorAll("[data-accion='cerrar-reporte']");
const botonesImprimirReporte = document.querySelectorAll("[data-accion='imprimir-reporte']");
let modalActivo = null;

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

botonAbrirReporte?.addEventListener("click", () => {
    abrirModalReporte(modalReporte, completarReporteDetalleEmpleados);
});
botonAbrirAvances?.addEventListener("click", () => {
    abrirModalReporte(modalAvances, completarReporteAvances);
});
botonAbrirCitacion?.addEventListener("click", () => {
    abrirModalReporte(modalModuloCitacion, completarModuloCitacion);
});
botonGenerarCitacion?.addEventListener("click", () => {
    cerrarReporte();
    abrirModalReporte(modalCitacion, completarReporteCitacion);
});
botonesCerrarReporte.forEach((boton) => boton.addEventListener("click", cerrarReporte));
botonesImprimirReporte.forEach((boton) => {
    boton.addEventListener("click", () => window.print());
});

modalReporte?.addEventListener("click", (evento) => {
    if (evento.target === modalReporte) {
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
