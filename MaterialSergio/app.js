"use strict";
const juegos=["Zelda","Minecraft","Counter-Strike"];
console.log("Primero:", juegos[0]);

console.log("Juegos:", juegos);
console.log("Cantidad:", juegos.length + " juegos");

juegos.push("FIFA");
console.log("Juegos tras push:", juegos);

juegos.pop();
console.log("Tras pop:", juegos);

//Array mixtos
const mixto = ["hola", 42, true, {juego: "Minecraft", pegi: 12}, [1, 2, 3]];
console.log("Mixto:", mixto);
console.log(`Elemento 0 (${mixto[0].constructor.name}): ${mixto[0]}`);
console.log(`Elemento 1 (${mixto[1].constructor.name}): ${mixto[1]}`);
console.log(`Elemento 2 (${mixto[2].constructor.name}): ${mixto[2]}`);
console.log(`Elemento 3 (${mixto[3].constructor.name}): ${mixto[3]}`);
console.log(`Elemento 4 (${mixto[4].constructor.name}): ${mixto[4]}`);

console.log(typeof mixto[0], typeof mixto[1], typeof mixto[2], typeof mixto[3], typeof mixto[4]);

// Objetos
const alumno = {
    nombre: "Ana",
    curso: "1º DAW",
    edad: 18,
    repetidor: false,
  };
  
console.log("Alumno:", alumno);   
console.log("Nombre:", alumno.nombre);

alumno.nombre = "Ana María";
console.log("Nombre cambiado:", alumno.nombre);
console.log(alumno.toString()); // [object Object]
console.log(`Alumno:\nNombre - ${alumno.nombre}\nCurso - ${alumno.curso}`);

//Cómo dejar constante las propiedades de un objeto??

const producto = {
  nombre: "Ratón RGB",
  precio: 19.99,
  stock: true,
  toString: function() {
    return `Producto: ${this.nombre} - Precio: ${this.precio}$ - Stock: ${this.stock}`;
  }
};

// console.log(`Producto: ${producto.nombre} - Precio: ${producto.precio}$ - Stock: ${producto.stock}`);
console.log(producto.toString());

// Funciones
const total = function (precio, unidades) {
  return precio * unidades;
}

console.log("Total 9.99 * 3 = ", total(9.99, 3));
console.log(total(9.99, 3).constructor.name);

// Funciones flecha (arrow functions)
// const name = (params) => { cuerpo };
const flecha = (precio, unidades) => precio * unidades;
console.log("Total 12.50 * 7 = ", flecha(12.50, 7));

// Crear un array de 3 objetos productos (nombre/precio) 
// y una función que devuelva el precio total sumado 
// (aquí puedes hacerlo simple: sumar 3 elementos a mano, sin bucles).

const cesta = [
  {nombre: "Teclado", precio: 12},
  {nombre: "Ratón", precio: 9},
  {nombre: "Auriculares", precio: 50}
];

// Paso por parámetro el precio del objeto
const suma = function (precio1, precio2, precio3) {
  return precio1 + precio2 + precio3;
};

// otra forma: le paso por parámetro el propio objeto
const suma2 = function (obj1, obj2, obj3) {
  return obj1.precio + obj2.precio + obj3.precio;
}

// función flecha
const sumaFlecha = (obj1, obj2, obj3) => obj1.precio + obj2.precio + obj3.precio;

console.log(`Total compra con suma = ${suma(cesta[0].precio, cesta[1].precio, cesta[2].precio)}€`);
console.log(`Total compra con suma2 = ${suma2(cesta[0], cesta[1], cesta[2])}€`);
console.log(`Total compra con suma2 y función flecha = ${sumaFlecha(cesta[0], cesta[1], cesta[2])}€`);