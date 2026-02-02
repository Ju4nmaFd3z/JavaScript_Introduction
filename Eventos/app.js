"use strict";
console.log("JS Cargado ✅");
const nombre = "Juanma";

//Gestión de eventos

//1ª Forma: Atributo HTML (Mala práctica ❌)

// function saludar(){
//     const texto = document.querySelector(".salida");
//     texto.textContent = `Salida: Hola ${nombre}`;
// }

//2ª Forma: API JS setAttribute - Añadimos el atributo HTML

// const boton = document.getElementById("btn")
// boton.setAttribute("onclick", "saludar()");

// 3ª Forma: addEventListener

// const boton = document.getElementById("btn");
// const texto = document.querySelector(".salida");

// boton.addEventListener("click", () => {
//     texto.textContent = `Salida: Hola ${nombre}`
// });

//Formas de pasar la función a addEventListener

//A) Función definida aparte y pasar referencia (La clásica)

// const boton = document.getElementById("btn");
// const texto = document.querySelector(".salida");

// boton.addEventListener("click", () => {
//     texto.textContent = `Salida: Hola ${nombre}`
// });

// boton.addEventListener("click", saludar);

//B) El error típico: Poner () [Se ejecuta al cargar, no al click]

// boton.addEventListener("click", saludar()); //MAL❌
// boton.addEventListener("click", saludar) //BIEN ✅

//C) Función anónima (Muy común)

// boton.addEventListener("click", function () {
//     texto.textContent = `Salida: Hola ${nombre}`;
// });

//D) Función Flecha (De las más usadas actualmente)

// boton.addEventListener("click", () => {
//     texto.textContent = `Salida: Hola ${nombre}`
// });

//¿Y si hace falta pasarle parámetros?

// function suma(num1, num2) {
//     texto.textContent = num1+num2;
// }

// boton.addEventListener("click", () => suma(4,6));

//Variante con función anónima

// boton.addEventListener("click", function () {
//     suma(7,8);
// });

// Mini-reto: Contador de clicks + botón reset.
// Reglas: No se puede usar el onclick ni setAttribute.
// Usamos addEventListnener.

// En cada click, mostrar: Has hecho X click(s)
// En reset: Poner contador a 0 y mostrar Contador a 0.

// let clicks = 0;
// const salida = document.querySelector(".salida");
// const botonClicks = document.getElementById("btn");
// const botonReset = document.getElementById("reset");

// function resetClicks(){
//     clicks = 0;
// }

// botonClicks.addEventListener("click", () => {
//     clicks++;
//     salida.textContent = `Has hecho ${clicks} click(s).`;
// });

// botonReset.addEventListener("click", ()=> {
//     resetClicks();
//     salida.textContent = `El contador está a 0`;
// });

// Mini-Reto (Avanzado): Combinar el evento click + array para mostrar mensajes distintos según el click.
// Cada click muestra el mensaje de un array. Cuando llegue al final, vuelve al principio (cíclico).

const salida = document.getElementById("salida");
const botonClicks = document.getElementById("btn");
const botonReset = document.getElementById("reset");

let i = 0;

const mensajes = [
    "Si llegas aquí, podrías ser de 1DAW",
    "No vas mal, estás alcanzando cierto nivel. Pareces Arbeloa.",
    "Uff! Esto ya es otra cosa. Flick estaría orgulloso.",
    "Te has subido al gran FUNESBUQUE."
]

botonClicks.addEventListener("click", () => {
    salida.textContent = mensajes[i];
    i++;
    if (i === mensajes.length) i=0;
})

botonReset.addEventListener("click", ()=> {
    i=0;
    salida.textContent = `Salida: (Aún Nada)`;
});