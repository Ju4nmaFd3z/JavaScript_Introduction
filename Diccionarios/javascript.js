// OBJETOS (Clave-Valor)
const carta = {
    cafe: {
        precio: 1.2,
        emoji: "☕",
        texto: "Café",
        alergenos: []
    },
    te: {
        precio: 1.1,
        emoji: "🍵",
        texto: "Té",
        alergenos: []
    },
    pitufo: {
        precio: 1.8,
        emoji: "🥪",
        texto: "Pitufo",
        alergenos: ["gluten"]
    },
    donut: {
        precio: 2,
        emoji: "🍩",
        texto: "Donut",
        alergenos: ["gluten", "huevo"]
    }
};

// ELEMENTOS HTML DEL DOM
const selectorProducto = document.getElementById("selectProducto");
const tablaMenu = document.getElementById("tablaMenu");
const botonCalcular = document.getElementById("infoProducto");

// Cómo acceder al valor de una clave. Notación preferida -> Con corchetes
const producto = "pitufo";
console.log(`Notación con punto -> El precio del ${producto} es ${carta.pitufo.precio}€`)
console.log(`Notación con corchetes -> El precio del ${producto} es ${carta[producto].precio}€`)

// Método para obtener las claves
const claves = Object.keys(carta);

// Rellenar el select
for (const clave of claves) {
    const opcion = document.createElement("option");
    opcion.value = clave;
    opcion.textContent = `${carta[clave].texto} ${carta[clave].emoji}`;
    selectorProducto.appendChild(opcion);
}