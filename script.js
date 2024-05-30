// script.js

const products = [
    { id: 1, name: "Product 1", price: 10.00, img: "https://via.placeholder.com/150" },
    { id: 2, name: "Product 2", price: 20.00, img: "https://via.placeholder.com/150" },
    { id: 3, name: "Product 3", price: 30.00, img: "https://via.placeholder.com/150" }
];

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    displayCart();
});

function displayProducts() {
    const productContainer = document.querySelector(".product-list");
    productContainer.innerHTML = "";
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productElement);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    displayCart();
}

function displayCart() {
    const cartContainer = document.querySelector(".cart-list");
    const cartTotal = document.getElementById("cart-total");
    cartContainer.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");
        cartItemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Quantity: ${item.quantity}</p>
            <p>$${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(cartItemElement);
    });
    cartTotal.innerText = total.toFixed(2);
}

function removeFromCart(productId) {
    const cartItemIndex = cart.findIndex(item => item.id === productId);
    if (cartItemIndex > -1) {
        cart.splice(cartItemIndex, 1);
    }
    displayCart();
}
