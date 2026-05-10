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
