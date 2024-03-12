
// Show Cart
let cart = document.querySelector(".cart-button");
const cartShop = document.querySelector(".cart-open")

// open Cart
cart.addEventListener("click", () => {
    cart.classList.toggle("show-cart");
    cartShop.classList.toggle("show-cart");
})

// close Cart
document.querySelector(".cart_close").addEventListener("click", () => {
    cart.classList.remove("show-cart");
    cartShop.classList.remove("show-cart");
})

