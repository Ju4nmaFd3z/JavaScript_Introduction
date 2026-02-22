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
const infoProducto = document.getElementById("infoProducto");

// Cómo acceder al valor de una clave. Notación preferida -> Con corchetes
const productoEjemplo = "pitufo";
console.log(`Notación con punto -> El precio del ${productoEjemplo} es ${carta.pitufo.precio}€`)
console.log(`Notación con corchetes -> El precio del ${productoEjemplo} es ${carta[productoEjemplo].precio}€`)

// Método para obtener las claves
const claves = Object.keys(carta);

// Rellenar el select con for clásico
// for (i=0; i<claves.length; i++) {
//   // 1) Creo el elemento <option>
//   const opcion = document.createElement("option");
//   // 2) Asignamos atributo value a la opcion
//   opcion.value = claves[i];
//   // 3) Añado contenido al <option> -> texto + emoji
//   opcion.textContent = `${carta[claves[i]].texto} ${carta[claves[i]].emoji}`;
//   // 4) Insertamos el elemento dentro del select
//   selectProducto.appendChild(opcion);
// }

// Opción por defecto que no muestra información
const opcionDefault = document.createElement("option");
opcionDefault.value = "";
opcionDefault.textContent = "-- Selecciona un producto --";
selectorProducto.appendChild(opcionDefault);

// Rellenar el select con for-of
for (const item of claves) {
    const opcion = document.createElement("option");
    opcion.value = item;
    opcion.textContent = `${carta[item].texto} ${carta[item].emoji}`;
    selectorProducto.appendChild(opcion);
}

// Rellenar la tabla (for clásico a petición de Alba)
for (let i = 0; i < claves.length; i++) {
    const tr = document.createElement("tr");
    tr.dataset.clave = claves[i];
    tr.innerHTML = `
    <td>${claves[i]}</td>
    <td>${carta[claves[i]].emoji}</td>
    <td>${carta[claves[i]].texto}</td>
    <td>${carta[claves[i]].precio.toFixed(2)}</td>
    <td>${carta[claves[i]].alergenos.length === 0 ? "N/A" : carta[claves[i]].alergenos.join(", ")}</td>
    `;
    tablaMenu.appendChild(tr);
}

function mostrarProducto(clave) {
    const item = carta[clave];

    infoProducto.innerHTML =
        `<b>Acceso:</b> carta["${clave}"] → ${item.emoji} ${item.texto}, ${item.precio.toFixed(2)}€`;

    for (const tr of tablaMenu.querySelectorAll("tr")) {
        tr.classList.toggle("fila-seleccionada", tr.dataset.clave === clave);
    }
}

selectorProducto.addEventListener("change", (e) => {
    if (e.target.value === "") {
        infoProducto.innerHTML = "";
        for (const tr of tablaMenu.querySelectorAll("tr")) {
            tr.classList.remove("fila-seleccionada");
        }
    } else {
        mostrarProducto(e.target.value);
    }
});