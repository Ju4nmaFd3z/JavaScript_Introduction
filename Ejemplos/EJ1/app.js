"use strict";

//Variables: let y const
let edad = 18;
console.log("Edad:", edad);
edad = 19;
console.log("Nueva edad:", edad);

const centro = "CPIFP Alan Turing";
console.log("Centro:", centro);

//Operadores
const a = 10;
const b = 3;
console.log("Suma: ", a + b);
console.log("Resta: ", a - b);
console.log("Multiplicación: ", a * b);
console.log("División: ", a / b);
console.log("Resto: ", a % b);

const nombre = "Compi";
console.log("Hola " + nombre + "!")
console.log(`Hola ${nombre}!`)

const firstWord = "frase";
const secondWord = "concatenada";

console.log("Una " + firstWord + " bien " + secondWord); // Ejemplo 1 concatenación
console.log(`Una ${firstWord} mejor ${secondWord}`); // Ejemplo 2 concatenación

const magicalWord = `<strong>Magical Word</strong>`;

//Ejercicio producto

const producto = {
    nombre: "Producto 1",
    precio: 100,
    stock: 5,
    toString: function() {
        return `Producto: ${this.nombre}\nPrecio: ${this.precio}$\nStock: ${this.stock}`;
    }
};

//console.log(`Producto: ${producto.nombre}\nPrecio: ${producto.precio}$\nStock: ${producto.stock}`)
console.log(producto.toString());

//Funciones
const total = function (precio, unidades) {
    return precio*unidades;
}

console.log("Total 9.99 * 3 = ", total(9.99, 3));

//Funciones flecha (Arrow Functions)
//const name = (params) => {cuerpo};
const flecha = (precio, unidades) => precio * unidades;
console.log("Total 12.50 * 7 = ", flecha(12.50, 7));