// Lista de productos
const productos = [
    { nombre: "Café Espresso", precio: 45, imagen: "imagenes/expresso.png" },
    { nombre: "Café Americano", precio: 50, imagen: "imagenes/americano.png" },
    { nombre: "Café Latte", precio: 60, imagen: "imagenes/latte.png" },
    { nombre: "Capuccino", precio: 60, imagen: "imagenes/capuccino.png" },
    { nombre: "Café Mocha", precio: 70, imagen: "imagenes/mocha.png" },
    { nombre: "Chocolate Caliente", precio: 65, imagen: "imagenes/chocolate.png" },
    { nombre: "Frapuccino", precio: 80, imagen: "imagenes/frappuccino.png" },
    { nombre: "Croissant", precio: 95, imagen: "imagenes/croassint.png" },
    { nombre: "Arepa", precio: 105, imagen: "imagenes/Arepa.png" },
    { nombre: "Sandwich Jamon y Queso", precio: 120, imagen: "imagenes/jamonyqueso.png" },
    { nombre: "Galletas de avena", precio: 55, imagen: "imagenes/avena.png" },
    { nombre: "Muffin", precio: 40, imagen: "imagenes/muffin.png" },
    { nombre: "Brownie", precio: 35, imagen: "imagenes/brownie.png" },
    { nombre: "Cheescake", precio: 75, imagen: "imagenes/cheescake.png" },
    { nombre: "Rol de canela", precio: 65, imagen: "imagenes/rol.png" },
];

let carrito = [];
let total = 0;

function renderizarProductos() {
    const container = document.getElementById("productos-container");
    container.innerHTML = "";

    productos.forEach(producto => {
        const productoHTML = `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="overlay">
                    <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Añadir al carro</button>
                </div>
                <h3>${producto.nombre}</h3>
                <p>L.${producto.precio}.00</p>
            </div>
        `;
        container.innerHTML += productoHTML;
    });

    animarProductos();
}

function agregarAlCarrito(nombre, precio) {
    const productoEnCarrito = carrito.find(item => item.nombre === nombre);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    total += precio;

    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoItems = document.getElementById("carrito-items");
    const carritoCount = document.getElementById("carrito-count");
    const carritoTotal = document.getElementById("carrito-total");

    carritoItems.innerHTML = "";

    carrito.forEach(item => {
        const itemHTML = `
            <div>
                <span>${item.nombre} (${item.cantidad})</span>
                <span>L.${item.precio * item.cantidad}.00</span>
            </div>
        `;
        carritoItems.innerHTML += itemHTML;
    });

    carritoCount.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);

    carritoTotal.textContent = total.toFixed(2);
}

function limpiarCarrito() {
    carrito = []; 
    total = 0; 
    actualizarCarrito(); 
}

document.getElementById("limpiar-carrito").addEventListener("click", limpiarCarrito);

const carritoIcono = document.getElementById("carrito-icono");
const modal = document.getElementById("carrito-modal");
const closeBtn = document.querySelector(".close");

carritoIcono.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

renderizarProductos();

function esVisible(elemento) {
    const rect = elemento.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animarProductos() {
    const productos = document.querySelectorAll('.producto');
    productos.forEach(producto => {
        if (esVisible(producto)) {
            producto.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', animarProductos);
window.addEventListener('load', animarProductos); // Para animarlos al cargar
