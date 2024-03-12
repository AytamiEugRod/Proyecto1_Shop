// import products from "./products.js" with { type: "json" };
window.onload = function(){
    const iconCarroCompra = parent.document.getElementById("carro-compra");
    iconCarroCompra.addEventListener("click", () => {
        document.querySelector("div#shop div#moval-cart").classList.toggle('desactivo');
    })

    // document.querySelector('#moval-cart').addEventListener('click',(e) => {
    //     e.currentTarget.classList.add('desactivo')
    // });
};

const numbItemsCarroCompra = parent.document.querySelector("div#carro-compra span");


const products = [
    { name: "Nike Shoes", price: 2500, id: 1, quantity: 1, description: "Descripción", image: "/assets/main/banner4.png" },
    { name: "Sting Energy Drink", price: 120, id: 2, quantity: 1, description: "Descripción", image: "/assets/main/banner4.png" },
    { name: "Umbrella", price: 500, id: 3, quantity: 1, description: "Descripción", image: "/assets/main/banner4.png" },
    { name: "Cat Food", price: 900, id: 4, quantity: 1, description: "Descripción", image: "/assets/main/banner4.png" },
    { name: "T Shirt", price: 300, id: 5, quantity: 1, description: "Descripción", image: "/assets/main/banner4.png" },
    { name: "hackle", price: 100, id: 6, quantity: 1, description: "Descripción", image: "/assets/main/banner4.png" },
];

let cart = []

const productsHTML = products.map(
    (product) => `<div class="product-card">
        <div class="img-product-card">
            <img src="${product.image}" alt="">
        </div>
        <div class="info-product-card">
            <h3 class="product-name">${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>${product.price}€</strong></p>
        </div>
        <div class="footer-product-card">
            <button class="product-btn" data-id-product=${product.id}>Añadir</button>
        </div>
    </div>`
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
    totalAmountHTML.innerHTML = `${cartTotal}€`;
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
}
