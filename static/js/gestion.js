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
const botonAbrirReporte = document.querySelector("[data-accion='abrir-reporte-detalle-empleados']");
const botonesCerrarReporte = document.querySelectorAll("[data-accion='cerrar-reporte']");
const botonImprimirReporte = document.querySelector("[data-accion='imprimir-reporte']");

const obtenerValorCampo = (id) => document.querySelector(`#${id}`)?.value?.trim() || "";

const escribirReporte = (selector, valor, reserva = "____________________") => {
    const elemento = document.querySelector(selector);
    if (elemento) {
        elemento.textContent = valor || reserva;
    }
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

const abrirReporte = () => {
    completarReporteDetalleEmpleados();
    modalReporte?.classList.add("abierto");
    modalReporte?.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-abierto");
};

const cerrarReporte = () => {
    modalReporte?.classList.remove("abierto");
    modalReporte?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-abierto");
};

botonAbrirReporte?.addEventListener("click", abrirReporte);
botonesCerrarReporte.forEach((boton) => boton.addEventListener("click", cerrarReporte));
botonImprimirReporte?.addEventListener("click", () => window.print());

modalReporte?.addEventListener("click", (evento) => {
    if (evento.target === modalReporte) {
        cerrarReporte();
    }
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && modalReporte?.classList.contains("abierto")) {
        cerrarReporte();
    }
});
