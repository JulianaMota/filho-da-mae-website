/* burger menu */

const menu = document.querySelector(".burger-menu #menu");
const ul = document.querySelector(".burger-menu ul");
const label = document.querySelector(".burger-menu label");

const container = document.querySelector(".burger-menu #menu");
container.addEventListener("click", toggleMenu);

const menuLinks = document.querySelectorAll(".burger-menu a");
menuLinks.forEach(applyClick);

function applyClick(item){
    item.addEventListener("click", toggleMenu);
}

function toggleMenu() {
    label.classList.toggle("change");
    menu.classList.toggle("expand");
    ul.classList.toggle("appear");
}