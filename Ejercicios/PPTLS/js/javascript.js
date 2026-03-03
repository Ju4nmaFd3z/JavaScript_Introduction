"use strict";

// ------------------------------------------
// Variables globales del juego
// ------------------------------------------

let victorias = 0;
let derrotas = 0;
let empates = 0;

// Opciones disponibles del juego
const opciones = ["piedra", "papel", "tijera", "lagarto", "spock"];

// Iconos de cada jugada
const iconos = {
    piedra: "🪨",
    papel: "📄",
    tijera: "✂️",
    lagarto: "🦎",
    spock: "🖖"
};

// A quién vence cada jugada (para los tooltips y para calcular el resultado)
const victoriasSobre = {
    piedra: ["tijera", "lagarto"],
    papel: ["piedra", "spock"],
    tijera: ["papel", "lagarto"],
    lagarto: ["spock", "papel"],
    spock: ["tijera", "piedra"]
};

// ------------------------------------------
// Elementos del DOM
// ------------------------------------------

const displayJugador = document.getElementById("display-jugador");
const displayCPU = document.getElementById("display-cpu");
const mensajeResultado = document.getElementById("mensaje-resultado");
const contadorVictorias = document.getElementById("contador-victorias");
const contadorDerrotas = document.getElementById("contador-derrotas");
const contadorEmpates = document.getElementById("contador-empates");
const botonesJugada = document.querySelectorAll(".boton-eleccion-jugada");
const botonReiniciar = document.getElementById("boton-reiniciar");
const botonReglas = document.getElementById("boton-reglas");

// ------------------------------------------
// Inicialización cuando el DOM está listo
// ------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    inicializarJuego();
});

// ------------------------------------------
// Funciones del juego
// ------------------------------------------

/**
 * @brief Inicializa el juego configurando los elementos, estados y eventos necesarios.
 *
 * Esta función prepara todo lo necesario para que el juego pueda comenzar,
 * incluyendo la configuración de la interfaz, los valores iniciales de los
 * jugadores y la vinculación de eventos a los controles.
 *
 * @return {void} No devuelve ningún valor.
 */
function inicializarJuego() {
    // Asignamos evento click a cada botón de jugada
    botonesJugada.forEach(boton => {
        boton.addEventListener("click", () => {
            const jugada = boton.dataset.jugada;
            jugar(jugada);
        });
    });

    // Botones opcionales
    botonReiniciar.addEventListener("click", resetearJuego);
    botonReglas.addEventListener("click", mostrarReglas);

    // Inicializar los tooltips
    inicializarTooltips();

    // Efecto de carga inicial
    setTimeout(() => {
        const contenedor = document.querySelector("main");
        if (contenedor) contenedor.style.opacity = "1";
    }, 100);
}

/**
 * @brief Ejecuta una ronda del juego con la elección del usuario.
 *
 * Esta función realiza los siguientes pasos:
 * 1. Reinicia los displays del juego.
 * 2. Genera la elección de la CPU de forma aleatoria.
 * 3. Muestra la elección del usuario y de la CPU con animaciones.
 * 4. Calcula el resultado de la ronda.
 * 5. Muestra el resultado y actualiza los contadores correspondientes.
 *
 * @param {string} eleccionUsuario - La elección realizada por el usuario (por ejemplo: "piedra", "papel", "tijera"...).
 * @return {void} No devuelve ningún valor.
 */
function jugar(eleccionUsuario) {
    try {
        reiniciarDisplays();
        const eleccionCPU = obtenerEleccionCPU();
        // Mostrar jugada del usuario primero, luego la de la CPU con un pequeño retraso
        mostrarEleccion(displayJugador, eleccionUsuario, "JUGADOR");
        setTimeout(() => {
            mostrarEleccion(displayCPU, eleccionCPU, "CPU");
            // Calcular y mostrar el resultado
            const resultado = calcularResultadoJugada(eleccionUsuario, eleccionCPU);
            mostrarResultadoJugada(resultado, eleccionUsuario, eleccionCPU);
        }, 500);
    } catch (error) {
        console.error("Error al ejecutar la jugada: ", error);
    }
}

/**
 * @brief Genera aleatoriamente la elección de la CPU.
 *
 * Esta función selecciona una opción al azar entre las disponibles y la devuelve.
 *
 * @return {string} La elección de la CPU (por ejemplo: "piedra", "papel" o "tijera"...).
 */
function obtenerEleccionCPU() {
    const indice = Math.floor(Math.random() * opciones.length);
    return opciones[indice];
}

/**
 * @brief Muestra la elección de un jugador (jugador humano o CPU) en un display con icono y texto.
 *
 * Esta función limpia el contenido del display, aplica la clase
 * para animación/estilo y agrega los elementos que representan
 * la jugada seleccionada (emoji y texto) del jugador indicado.
 *
 * @param {HTMLElement} display - El contenedor donde se mostrará la elección.
 * @param {string} eleccion - La clave de la elección (por ejemplo: "piedra", "papel", "tijera"...).
 * @param {string} jugador - Nombre del jugador que realizó la elección (por ejemplo: "JUGADOR" o "CPU").
 * @return {void} No devuelve ningún valor.
 */
function mostrarEleccion(display, eleccion, jugador) {

}

/**
 * @brief Reinicia los displays del juego a su estado inicial.
 *
 * Esta función restablece el contenido de los displays del usuario y de la CPU,
 * elimina cualquier clase de animación activa y restablece el mensaje de resultado
 * al texto predeterminado "¡Batalla!".
 *
 * @return {void} No devuelve ningún valor.
 */
function reiniciarDisplays() {

}

/**
 * @brief Calcula el resultado de una ronda entre el usuario y la CPU.
 *
 * Esta función compara la elección del usuario con la elección de la CPU
 * y determina si la ronda termina en victoria, derrota o empate según
 * las reglas del juego.
 *
 * @param {string} usuario - La elección del usuario (por ejemplo: "piedra", "papel", "tijera"...).
 * @param {string} cpu - La elección de la CPU (por ejemplo: "piedra", "papel", "tijera"...).
 * @return {string} El resultado de la ronda: "victoria", "derrota" o "empate".
 */
function calcularResultadoJugada(usuario, cpu) {
    if (usuario === cpu) {
        return "empate";
    }
    // Comprobamos si la jugada del usuario está en la lista de victorias sobre la CPU
    if (victoriasSobre[usuario].includes(cpu)) {
        return "victoria";
    }
    return "derrota";
}

/**
 * @brief Muestra el resultado de una ronda en la interfaz del juego.
 *
 * Esta función actualiza el mensaje de resultado según si el usuario ganó,
 * perdió o empató, aplica la clase correspondiente para estilos y
 * actualiza los contadores de victorias, derrotas o empates.
 *
 * @param {string} resultado - Resultado de la ronda: "victoria", "derrota" o "empate".
 * @param {string} usuario - Elección del usuario (por ejemplo: "piedra", "papel", "tijera"...).
 * @param {string} cpu - Elección de la CPU (por ejemplo: "piedra", "papel", "tijera"...).
 * @return {void} No devuelve ningún valor.
 */
function mostrarResultadoJugada(resultado, usuario, cpu) {
    const nombreUsuario = usuario.charAt(0).toUpperCase() + usuario.slice(1);
    const nombreCPU = cpu.charAt(0).toUpperCase() + cpu.slice(1);

    if (resultado === "victoria") {
        victorias++;
        mensajeResultado.textContent = `¡Ganaste! ${nombreUsuario} vence a ${nombreCPU}`;
        mensajeResultado.className = "mensaje-resultado ganador";
    } else if (resultado === "derrota") {
        derrotas++;
        mensajeResultado.textContent = `¡Perdiste! ${nombreCPU} vence a ${nombreUsuario}`;
        mensajeResultado.className = "mensaje-resultado perdedor";
    } else {
        empates++;
        mensajeResultado.textContent = `¡Empate! Los dos habéis elegido ${nombreUsuario}`;
        mensajeResultado.className = "mensaje-resultado empate";
    }

    actualizarContadores();
}

/**
 * @brief Actualiza los contadores de victorias, derrotas y empates en la interfaz.
 *
 * Esta función refleja los valores actuales de las variables globales
 * `victorias`, `derrotas` y `empates` en los elementos del DOM correspondientes.
 *
 * @return {void} No devuelve ningún valor.
 */
function actualizarContadores() {
    contadorVictorias.textContent = victorias;
    contadorDerrotas.textContent = derrotas;
    contadorEmpates.textContent = empates;
}

/**
 * @brief Inicializa los tooltips de los botones de elección.
 *
 * Esta función recorre todos los botones de elección, obtiene la jugada
 * asociada a cada uno y configura el atributo `title` para mostrar
 * un tooltip indicando qué opciones vence esa jugada.
 *
 * @return {void} No devuelve ningún valor.
 */
function inicializarTooltips() {

}

// ------------------------------------------
// Parte optativa: reiniciar y reglas
// ------------------------------------------

/**
 * @brief Muestra las reglas completas del juego en la consola.
 *
 * Esta función imprime un resumen de todas las reglas del juego,
 * indicando qué jugada vence a cuáles otras.
 *
 * @return {void} No devuelve ningún valor.
 */
function mostrarReglas() {
    // Preguntar si se puede hacer a lo cateto con console.log
}

/**
 * @brief Reinicia el juego a su estado inicial.
 *
 * Esta función realiza las siguientes acciones:
 * - Restablece los contadores de victorias, derrotas y empates a cero.
 * - Reinicia los displays del juego.
 * - Actualiza los contadores en la interfaz.
 * - Muestra un mensaje temporal indicando que el juego ha sido reiniciado.
 *
 * @return {void} No devuelve ningún valor.
 */
function resetearJuego() {
    victorias = 0;
    derrotas = 0;
    empates = 0;

    reiniciarDisplays();
    actualizarContadores();

    // Falta mostrar el mensaje

    // Uso el mismo Timeout de antes
    setTimeout(() => {
        mensajeResultado.textContent = "¡Batalla!";
        mensajeResultado.className = "mensaje-resultado";
    }, 1500);
}

/**
 * @brief Maneja las pulsaciones de teclas para jugar o reiniciar el juego.
 *
 * Este listener escucha los eventos de teclado (`keydown`) y realiza las siguientes acciones:
 * - Asocia las teclas numéricas '1' a '5' a las elecciones del juego: "piedra", "papel", "tijera", "lagarto" o "spock".
 * - La tecla 'r' reinicia el juego.
 * - La tecla 's' muestra las reglas del juego.
 *
 * @param {KeyboardEvent} event - El evento de pulsación de tecla.
 */
document.addEventListener("keydown", (event) => {

});