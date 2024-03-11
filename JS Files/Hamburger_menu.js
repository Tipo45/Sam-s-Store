
// Show Hamburger Menu
const hamBurger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav_menu");

// open Hamburger
hamBurger.addEventListener("click", () => {
    hamBurger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

// close Hamburger
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamBurger.classList.remove("active");
    navMenu.classList.remove("active");
}))



// Show Login
const login = document.querySelector(".login-button");
const LoginButton = document.querySelector(".login")

// open Login
login.addEventListener("click", () => {
    login.classList.toggle("show-login");
    LoginButton.classList.toggle("show-login");
})

// close Login
document.querySelector(".login_close").addEventListener("click", () => {
    login.classList.remove("show-login");
    LoginButton.classList.remove("show-login");
})