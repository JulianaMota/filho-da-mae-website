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

/* desktop menu */

const navbar = document.querySelector(".navBar-menu");
const navbarLinks = navbar.querySelectorAll("li");

navbarLinks.forEach(applyNavbarClick);

function applyNavbarClick(item) {
    item.addEventListener("click", toggleNavbarSelected);
}

function toggleNavbarSelected(event) {
    // Remove selected class from all links
    navbarLinks.forEach((item) => {
        item.classList.remove("selected");
    });

    // Add selected class to the item that was just clicked
    event.currentTarget.classList.add("selected");
}