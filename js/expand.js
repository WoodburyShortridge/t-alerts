const expand = document.querySelector('.helptext__link');
const close = document.querySelector('.helptext__message--close');
const help = document.querySelector('.helptext__message');

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
        help.setAttribute("tabindex", "-1");
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