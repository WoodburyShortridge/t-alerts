const expands = document.querySelectorAll('.helptext__link');
const expand = expands[0];
const closes = document.querySelectorAll('.helptext__message--close');
const close = closes[0];
const helps = document.querySelectorAll('.helptext__message');
const help = helps[0];

function toggleAria(el) {
    let x = el.getAttribute("aria-expanded");
    if (x === "true") {
        x = "false"
    } else {
        x = "true"
    }
    el.setAttribute("aria-expanded", x);
}

expand.onclick = function (event) {
    event.preventDefault();

    let isActive = expand.getAttribute("aria-expanded") === "true";
    if (isActive === false) {
        toggleAria(expand);
        help.focus()
    }
};

close.onclick = function (event) {
    event.preventDefault();

    let isActive = expand.getAttribute("aria-expanded") === "true";
    if (isActive === true) {
        toggleAria(expand);
        expand.focus()
    }
};