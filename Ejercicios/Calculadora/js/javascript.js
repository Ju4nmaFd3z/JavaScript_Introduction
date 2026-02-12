// ------------------------------------------
// Calculadora
// ------------------------------------------

let valorActual = "0";           // Lo que se ve en pantalla
let valorAnterior = null;        // Número guardado antes de la operación
let operadorActual = null;       // +, -, *, /
let resultadoMostrado = false;   // Para saber si hay que empezar un nuevo número

// Obtengo los elementos de la web necesarios a partir del DOM
const botonesNumeros = [...document.querySelectorAll(".boton-numero")];     // Devuelve un Array a partir de un NodeList
const pantalla = document.getElementById("pantalla");
const botonesOperadores = [...document.querySelectorAll(".boton-operacion")];
const botonIgual = document.getElementById("id-igual");

// OPCIÓN 1: Método FOR
// for (let i = 0; i < botonesNumeros.length; i++){
//     botonesNumeros[i].addEventListener("click", () => {
//         mostrarNumeroPantalla(botonesNumeros[i].textContent);
//     })
// }

// OPCIÓN 1: Método forEach() [Arrays]
botonesNumeros.forEach(boton => {
    boton.addEventListener("click", () => {
        mostrarNumeroPantalla(boton.textContent);
    });
});

botonesOperadores.forEach(boton => {
    boton.addEventListener("click", () => {
        manejarOperador(boton.textContent);
    });
});

botonIgual.addEventListener("click", calcularOperacion)

// ------------------------------------------
// Funcionalidad de la calculadora
// ------------------------------------------

/**
 * @brief Ejecuta la inicialización de la calculadora una vez que el DOM está completamente cargado.
 *
 * Esta función prepara todo lo necesario para que la calculadora funciones, incluyendo la configuración de la interfaz, los valores iniciales de las variables necesarias y la vinculación de eventos a los controles.
 *
 */
document.addEventListener('DOMContentLoaded', () => {
});

/**
 * @brief Deshabilita el botón del punto decimal en la calculadora.
 *
 * Cambia el estado del botón para evitar que el usuario introduzca múltiples puntos decimales en un mismo número. 
 * Además, actualiza su clase CSS para reflejar visualmente que está deshabilitado.
 *
 */
function deshabilitarPunto(){

}

/**
 * @brief Habilita nuevamente el botón del punto decimal en la calculadora.
 *
 * Esta función restaura la capacidad de usar el punto decimal, normalmente después de haber introducido una operación o un número válido.
 * Además, actualiza su clase CSS para reflejar visualmente que está activo.
 *
 */
function habilitarPunto(){

}


/**
 * @brief Actualiza el contenido mostrado en la pantalla de la calculadora.
*
* Esta función se encarga de mostrar en la pantalla el número con el que se opera, aplicando controles para evitar desbordamientos visuales o resultados demasiado largos.
*
* - Si el número supera los 12 caracteres o no es finito, se redondea a 12 dígitos.
* - Si el resultado redondeado es un número entero, elimina la parte decimal.
* - Si tiene decimales, elimina ceros innecesarios al final.
* - Si el número es corto y válido, se muestra tal cual.
*
*/
function actualizarPantalla() {
    pantalla.textContent = valorActual;
}


/**
 * @brief Muestra un número en la pantalla gestionando correctamente la entrada.
 *
 * Esta función controla la lógica al introducir un dígito en la calculadora:
 *
 * - Si previamente se ha mostrado un resultado de una operación, se inicia una nueva entrada reemplazando el valor actual por el número pulsado.
 * - Si el valor actual es 0, se sustituye por el nuevo número pulsado para evitar acumulación de ceros a la izquierda.
 * - En cualquier otro caso permite formar números de varias cifras.
 *
 * @param {string} numero - El dígito que el usuario ha pulsado (0–9).
 *
 */
function mostrarNumeroPantalla(numero) {
    if(resultadoMostrado) {
        pantalla.textContent = valorActual;
        resultadoMostrado = false;
    } else if (valorActual === "0") {
        valorActual = numero;
    } else {
        valorActual += numero;
    }
    actualizarPantalla();
}

/**
 * @brief Agrega un punto decimal a la pantalla de la calculadora.
 *
 * Comprueba si ya se ha mostrado un resultado o si el número actual no contiene un punto.
 * Si corresponde, agrega un punto y actualiza la pantalla.
 * Deshabilita el botón de punto para evitar múltiples decimales.
 */
function mostrarPuntoPantalla() {

}

/**
 * @brief Gestiona de forma correcta la operación matemática que hemos seleccionado (suma, resta, multiplicación, división).
 * 
 * Esta función gestiona la operación matemática seleccionada asegurando que:
 *
 * - Se guarda la operación matemática seleccionada para luego aplicarla.
 * - Se guarda el número que había escrito en la pantalla.
 * - Se resetea la pantalla volviendo a poner el número a 0.
 *
 */
function manejarOperador(operador) {
    operadorActual = operador;
    valorAnterior = valorActual;
    valorActual = "0";
    resultadoMostrado = false;
}

/**
 * @brief Realiza la operación matemática indicada por el operador almacenado.
 *
 * Esta función toma los valores de los números seleccionados por el usuario, aplica el operador seleccionado y muestra el resultado en pantalla.
 * Gestiona también el caso especial de división entre cero, mostrando "Error".
 *
 */
function calcularOperacion() {
    if (operadorActual === null || valorAnterior === null) return;
    let num1 = parseFloat(valorAnterior);
    let num2 = parseFloat(valorActual);
    let resultado;
    switch (operadorActual) {
        case "+":
            resultado = num1+num2;
            break;
        case "-":
            resultado = num1-num2;
            break;
        case "x":
            resultado = num1*num2;
            break;
        case "/":
            if (num2 === 0){
                valorActual = "Error";
                // let classnames = pantalla.getAttribute("class").split(" ");
                // classnames[1] = "texto-error";
                // pantalla.className = classnames.join(" ");
                pantalla.classList.replace("texto-defecto", "texto-error")
                actualizarPantalla();
                return;
            }
            resultado = num1/num2;
            break;
    }
    valorActual = resultado.toString();
    // Aplicar el color del resultado de la operación
    aplicarColorResultado(operadorActual);
    actualizarPantalla();
    resultadoMostrado = true;
}

/**
 * @brief Restaura el color por defecto de la pantalla de la calculadora.
 *
 * Establece la clase CSS correspondiente al estado visual normal de la pantalla.
 *
 */
function pantallaColorNormal() {
    pantalla.className = "pantalla-calc texto-defecto"
}
/**
 * @brief Borra el número introducido actualmente en la pantalla.
 *
 * Restablece la entrada actual a 0.
 *
 */
function borrarEntrada() {

}
/**
 * @brief Restablece completamente la calculadora a su estado inicial.
 *
 * Reinicia todos los valores almacenados, incluidos el número actual, el número anterior, el operador activo y el indicador de resultado mostrado.
 * También actualiza la pantalla, restaura el color normal y habilita el punto decimal.
 *
 */
function borrarTodo() {

}
/**
 * @brief Elimina el último carácter del número mostrado en pantalla.
 *
 * Gestiona el borrado dígito a dígito. Si se había mostrado un resultado previo reinicia la pantalla a 0. Si se elimina un punto decimal, vuelve a habilitarse que se pueda seleccionar.
 * Cuando solo queda un carácter, la pantalla vuelve a mostrar 0.
 *
 */
function retroceder() {

}

/**
 * @brief Realiza operaciones inmediatas sobre el número mostrado.
 *
 * Soporta las siguientes operaciones:
 * - Inverso (1/x)
 * - Cuadrado (x²)
 * - Raíz cuadrada (√x)
 *
 * Gestiona errores como división entre cero o raíz cuadrada de un número negativo, mostrando "Error" en pantalla y cambiando el color de la misma.
 *
 * @param {string} operacion - La operación a realizar: 'inverso', 'cuadrado' o 'raiz'.
 *
 */
function operacionInmediata(operacion) {

}

/**
 * @brief Aplica un color específico a la pantalla según la operación realizada.
 *
 * Cambia la clase CSS de la pantalla para reflejar visualmente el tipo de operación que se acaba de ejecutar, tanto para operaciones binarias (+, -, ×, /) como operaciones inmediatas (inverso, cuadrado, raíz).
 *
 * @param {string} operador - Operación realizada: '+', '-', '×', '/', 'inverso', 'cuadrado', 'raiz'.
 *
 */
function aplicarColorResultado(operador) {
    // let classnames = pantalla.getAttribute("class").split(" "); //["pantalla", "texto-defecto"]
    // switch (operador) {
    //     case "+":
    //         classnames[1] = "color-suma";
    //         break;
    //     case "-":
    //         classnames[1] = "color-resta";
    //         break;
    //     case "x":
    //         classnames[1] = "color-multiplicacion";
    //         break;
    //     case "/":
    //         classnames[1] = "color-division";
    //         break;
    // }
    // pantalla.className = classnames.join(" "); //["pantalla, texto-defecto"]
    pantallaColorNormal();
    switch (operador) {
        case "+":
            pantalla.classList.replace("texto-defecto", "color-suma")
            break;
        case "-":
            pantalla.classList.replace("texto-defecto", "color-resta")
            break;
        case "x":
            pantalla.classList.replace("texto-defecto", "color-multiplicacion")
            break;
        case "/":
            pantalla.classList.replace("texto-defecto", "color-division")
            break;
    }
}

/**
 * @brief Gestiona la entrada de teclado para la calculadora.
 *
 * Permite controlar la calculadora mediante teclas:
 * - Números 0-9: Números del 0 al 9.
 * - Punto decimal: Tecla punto.
 * - Operadores: Teclas +, -, *, /.
 * - Calcular resultado: Enter o =.
 * - Backspace: Retrocede un carácter.
 * - Tecla 'C' o 'c': Ejecuta la funcionalidad de borrar todo.
 * - Tecla 'i': Calcula el inverso.
 * - Tecla 's': Calcula el cuadrado.
 * - Tecla 'r': Calcula la raíz cuadrada
 *
 * @param {KeyboardEvent} teclaevento - Evento de teclado capturado.
 *
 */

window.addEventListener('keydown', (teclaevento) => {
});