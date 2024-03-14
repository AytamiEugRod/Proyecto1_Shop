// import products from "./products.js" with { type: "json" };
window.onload = function(){
    const iconCarroCompra = parent.document.getElementById("carro-compra");
    iconCarroCompra.addEventListener("click", () => {
        document.querySelector("div#shop div#moval-cart").classList.toggle('desactivo');
    })

    document.querySelector('#moval-cart #background-cart').addEventListener('click',(e) => {
        e.currentTarget.parentElement.classList.add('desactivo')
    });
};

const numbItemsCarroCompra = parent.document.querySelector("div#carro-compra span");


const products = [
    { name: "Gofio Pérez Gil ", price: 1.55, id: 1, quantity: 1, description: "Millo (maíz) molido de tostado suave", image: "/assets/shop/gofio.webp" },
    { name: "Garden Alitas de Pollo", price: 3.45, id: 2, quantity: 1, description: "Alitas de pollo basadas en vegetales", image: "/assets/shop/alitas.webp" },
    { name: "Beyond Beef Carne picada", price: 4.85, id: 3, quantity: 1, description: "Preparado estilo carne picada y sabor medio/intenso", image: "/assets/shop/carne.webp" },
    { name: "WholeSome lágrimas de carne", price: 6.05, id: 4, quantity: 1, description: "JustLikeBeef Preparado de judías imitando lágrimas de carne", image: "/assets/shop/carne2.webp" },
    { name: "Quorn Filete de carne", price: 5.49, id: 5, quantity: 1, description: "2 unidades de filetes proteína de soja y espesantes", image: "/assets/shop/carne3.webp" },
    { name: "GardeIn Tiras de pollo", price: 3.99, id: 6, quantity: 1, description: "Proteína de soja y vegetales imitando tiras de pollo, con salsa", image: "/assets/shop/chicken.webp" },
    { name: "Morrisons Tacos de pollo", price: 4.99, id: 7, quantity: 1, description: "Tacos de soja marinados con hierbas y especies ", image: "/assets/shop/chicken3.webp" },
    { name: "Frys Nuggets de pollo", price: 1.99, id: 8, quantity: 1, description: "Proteína vegetal y soja rebozadas imitando nuggets", image: "/assets/shop/nuggets.webp" },
    { name: "Quorn Nuggets de pollo", price: 2.39, id: 9, quantity: 1, description: "Proteína vegetal y soja rebozadas imitando nuggets", image: "/assets/shop/nuggets3.webp" },
    { name: "SweetEarth Salchichas pollo", price: 0.99, id: 10, quantity: 1, description: "Proteína soja con manzana imitando salchichas", image: "/assets/shop/sausages.webp" },
    { name: "GardeIn delicias de pollo", price: 1.99, id: 11, quantity: 1, description: "Proteína vegetal y soja rebozadas imitando delicias de pollo", image: "/assets/shop/alitas.webp" }
]
let cart = []

const productsHTML = products.map(
    (product) => {
        let desc = product.description;
        if(desc.length > 50)
            desc = `${product.description.slice(0, 47)}...`;

        return (`<div class="product-card">
            <div class="img-product-card">
                <img src="${product.image}" alt="" >
            </div>
            <div class="info-product-card">
                <h3 class="product-name">${product.name}</h3>
                <p>${desc}</p>
                <p><strong>${product.price}€</strong></p>
            </div>
            <div class="footer-product-card">
                <button class="product-btn" data-id-product=${product.id}>Añadir</button>
            </div>
        </div>`);
    }
);
const result = document.querySelector(".list-products");
result.innerHTML = productsHTML.join("");


function updateCart() {
    const cartHTML = cart.map(
        (item) => `<div class="cart-item">
            <div class="details">
                <div>
                    <p><strong>${item.name}</strong></p>
                    <p><strong>${item.price}€</strong></p>
                </div>
                

                <div class="cart-detail">
                    <div class="mid">
                        <button onclick={decrItem(${item.id})}>-</button>
                        <p>${item.quantity}</p>
                        <button onclick={incrItem(${item.id})}>+</button>
                    </div>
                </div>
            </div>
            
            
            <button onclick={deleteItem(${item.id})} class="cart-product delete-product" id=${item.id}><i class="fa fa-times" aria-hidden="true"></i></button>
        </div>`
    );

    const cartItems = document.querySelector(".cart-items");
    cartItems.innerHTML = cartHTML.join("");
}

let num = document.querySelectorAll(".product-btn").length;
for (let i = 0; i < num; i++) {
    document
        .querySelectorAll(".product-btn")
    [i].addEventListener("click", function (e) {
        addToCart(products, parseInt(e.target.dataset.idProduct));
        // addToCart(products, parseInt(e.target.id));
    });
}

function addToCart(products, id) {
    const product = products.find((product) => product.id === id);
    const cartProduct = cart.find((product) => product.id === id);
    if (cartProduct != undefined && product.id == cartProduct.id) {
        incrItem(id);
        
    } else {
        cart.unshift(product);
    }
    updateCart();
    getTotal(cart);

    // Añadido para ocultar mensaje de carro vacío
    document.querySelector('div#shop div#moval-cart .cart p#no-items-carro').style.display = "none";
    // Añadido para mostrar boton
    document.querySelector('div#shop div#moval-cart .cart button.buy-btn').classList.remove("disabled");
    document.querySelector('div#shop div#moval-cart .cart button.buy-btn').type = "submit";
    // Añadido para añadir animación de vibración al icono del carro
    parent.document.querySelector('header div#carro-compra i').classList.add('tiembla');
    setTimeout(function(){
        parent.document.querySelector('header div#carro-compra i').classList.remove('tiembla');
    }, 200);
};

function getTotal(cart) {
    let { totalItem, cartTotal } = cart.reduce(
        (total, cartItem) => {
            total.cartTotal += cartItem.price * cartItem.quantity;
            total.totalItem += cartItem.quantity;
            return total;
        },
        { totalItem: 0, cartTotal: 0 }
    );
    // const totalItemsHTML = document.querySelector(".noOfItems");
    // totalItemsHTML.innerHTML = `${totalItem} items`;
    numbItemsCarroCompra.innerHTML = `${totalItem}`;

    const totalAmountHTML = document.querySelector(".total");
    totalAmountHTML.innerHTML = `${cartTotal.toFixed(2)}€`;
}

function incrItem(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i] && cart[i].id == id) {
            cart[i].quantity += 1;
        }
    }
    updateCart();
    getTotal(cart);
}

function decrItem(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id){
            if(cart[i].quantity > 1) {
                cart[i].quantity -= 1;
            } else{
                deleteItem(id)
            }
        }
    }

    updateCart();
    getTotal(cart);
}

function deleteItem(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity = 1;
            cart.splice(i, 1);
        }
    }
    updateCart();
    getTotal(cart);

    // Añadido para mostrar mensaje de carro vacío
    console.log("eliminado ",cart.length )
    if(cart.length == 0){
        document.querySelector('div#shop div#moval-cart .cart p#no-items-carro').style.display = "block";
        document.querySelector('div#shop div#moval-cart .cart button.buy-btn').type = "button";
        document.querySelector('div#shop div#moval-cart .cart button.buy-btn').classList.add("disabled");
    }
}