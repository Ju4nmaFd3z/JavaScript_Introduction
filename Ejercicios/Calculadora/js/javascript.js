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
const botonBorrarEntrada = document.getElementById("borrar-entrada");
const botonBorrarTodo = document.getElementById("borrar-todo");
const botonRetroceso = document.getElementById("retroceso");
const botonPunto = document.getElementById("id-punto");
const botonInverso = document.getElementById("op-inverso");
const botonCuadrado = document.getElementById("op-cuadrado");
const botonRaiz = document.getElementById("op-raiz");

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

botonIgual.addEventListener("click", calcularOperacion);
botonPunto.addEventListener("click", mostrarPuntoPantalla);
botonBorrarEntrada.addEventListener("click", borrarEntrada);
botonBorrarTodo.addEventListener("click", borrarTodo);
botonRetroceso.addEventListener("click", retroceder);
botonInverso.addEventListener("click", () => operacionInmediata("inverso"));
botonCuadrado.addEventListener("click", () => operacionInmediata("cuadrado"));
botonRaiz.addEventListener("click", () => operacionInmediata("raiz"));

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
function deshabilitarPunto() {
    botonPunto.classList.add("esta-deshabilitado");
}

/**
 * @brief Habilita nuevamente el botón del punto decimal en la calculadora.
 *
 * Esta función restaura la capacidad de usar el punto decimal, normalmente después de haber introducido una operación o un número válido.
 * Además, actualiza su clase CSS para reflejar visualmente que está activo.
 *
 */
function habilitarPunto() {
    botonPunto.classList.remove("esta-deshabilitado");
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
    let texto = valorActual;
    if (texto !== "Error" && texto.length > 12) {
        let num = parseFloat(texto);
        if (!isFinite(num)) {
            texto = "Error";
        } else {
            let redondeado = parseFloat(num.toPrecision(12));
            texto = redondeado.toString();
        }
        valorActual = texto;
    }
    pantalla.textContent = texto;
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
    if (resultadoMostrado) {
        valorActual = numero;
        resultadoMostrado = false;
        pantallaColorNormal();
        habilitarPunto();
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
    if (resultadoMostrado) {
        valorActual = "0.";
        resultadoMostrado = false;
        pantallaColorNormal();
    } else if (!valorActual.includes(".")) {
        valorActual += ".";
    }
    deshabilitarPunto();
    actualizarPantalla();
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
    // Si ya hay una operación pendiente, calcular antes de continuar
    if (operadorActual !== null && !resultadoMostrado) {
        calcularOperacion();
    }
    operadorActual = operador;
    valorAnterior = valorActual;
    valorActual = "0";
    resultadoMostrado = false;
    habilitarPunto();
    pantallaColorNormal();
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
            if (num2 === 0) {
                mostrarError();
                return;
            }
            resultado = num1 / num2;
            break;
        default: return;
    }
    aplicarColorResultado(operadorActual);
    valorActual = resultado.toString();
    actualizarPantalla();
    resultadoMostrado = true;
    habilitarPunto();
    if (valorActual.includes(".")) deshabilitarPunto();
}

/**
 * @brief Restaura el color por defecto de la pantalla de la calculadora.
 *
 * Establece la clase CSS correspondiente al estado visual normal de la pantalla.
 *
 */
function pantallaColorNormal() {
    pantalla.className = "pantalla-calc texto-defecto";
}

/**
 * @brief Borra el número introducido actualmente en la pantalla.
 *
 * Restablece la entrada actual a 0.
 *
 */
function borrarEntrada() {
    valorActual = "0";
    resultadoMostrado = false;
    habilitarPunto();
    pantallaColorNormal();
    actualizarPantalla();
}

/**
 * @brief Restablece completamente la calculadora a su estado inicial.
 *
 * Reinicia todos los valores almacenados, incluidos el número actual, el número anterior, el operador activo y el indicador de resultado mostrado.
 * También actualiza la pantalla, restaura el color normal y habilita el punto decimal.
 *
 */
function borrarTodo() {
    valorActual = "0";
    valorAnterior = null;
    operadorActual = null;
    resultadoMostrado = false;
    habilitarPunto();
    pantallaColorNormal();
    actualizarPantalla();
}

/**
 * @brief Elimina el último carácter del número mostrado en pantalla.
 *
 * Gestiona el borrado dígito a dígito. Si se había mostrado un resultado previo reinicia la pantalla a 0. Si se elimina un punto decimal, vuelve a habilitarse que se pueda seleccionar.
 * Cuando solo queda un carácter, la pantalla vuelve a mostrar 0.
 *
 */
function retroceder() {
    if (resultadoMostrado) {
        borrarEntrada();
        return;
    }
    if (valorActual.length <= 1) {
        valorActual = "0";
    } else {
        valorActual = valorActual.slice(0, -1);
    }
    // Reactivar punto si ya no queda punto en el número
    if (!valorActual.includes(".")) habilitarPunto();
    actualizarPantalla();
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
    let num = parseFloat(valorActual);
    let resultado;

    switch (operacion) {
        case "inverso":
            if (num === 0) { mostrarError(); return; }
            resultado = 1 / num;
            break;
        case "cuadrado":
            resultado = num * num;
            break;
        case "raiz":
            if (num < 0) { mostrarError(); return; }
            resultado = Math.sqrt(num);
            break;
        default: return;
    }

    aplicarColorResultado(operacion);
    valorActual = resultado.toString();
    actualizarPantalla();
    resultadoMostrado = true;
    habilitarPunto();
    if (valorActual.includes(".")) deshabilitarPunto();
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
    const mapa = {
        "+": "color-suma",
        "-": "color-resta",
        "x": "color-multiplicacion",
        "/": "color-division",
        "inverso": "color-division",
        "cuadrado": "color-multiplicacion",
        "raiz": "color-suma"
    };
    const clase = mapa[operador];
    if (clase) pantalla.classList.replace("texto-defecto", clase);
}

/**
 * @brief Muestra "Error" en pantalla con color rojo.
 *
 * Función auxiliar reutilizable para mostrar el estado de error en la calculadora.
 *
 */
function mostrarError() {
    valorActual = "Error";
    pantalla.classList.replace("texto-defecto", "texto-error");
    actualizarPantalla();
    resultadoMostrado = true;
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
    if (teclaevento.key >= "0" && teclaevento.key <= "9") {
        mostrarNumeroPantalla(teclaevento.key);
    } else if (teclaevento.key === ".") {
        mostrarPuntoPantalla();
    } else if (teclaevento.key === "+" || teclaevento.key === "-") {
        manejarOperador(teclaevento.key);
    } else if (teclaevento.key === "*") {
        manejarOperador("x");
    } else if (teclaevento.key === "/") {
        teclaevento.preventDefault(); // Evita la búsqueda rápida en navs cómo Firefox
        manejarOperador("/");
    } else if (teclaevento.key === "Enter" || teclaevento.key === "=") {
        calcularOperacion();
    } else if (teclaevento.key === "Backspace") {
        retroceder();
    } else if (teclaevento.key === "c" || teclaevento.key === "C") {
        borrarTodo();
    } else if (teclaevento.key === "i" || teclaevento.key === "I") {
        operacionInmediata("inverso");
    } else if (teclaevento.key === "s" || teclaevento.key === "S") {
        operacionInmediata("cuadrado");
    } else if (teclaevento.key === "r" || teclaevento.key === "R") {
        operacionInmediata("raiz");
    }
});