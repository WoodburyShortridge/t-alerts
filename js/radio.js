var KEYCODE = {
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
    UP: 38
}

window.addEventListener('load', function() {

    var radiobuttons = document.querySelectorAll('[role=radio]');

    for(var i = 0; i < radiobuttons.length; i++ ) {
        var rb = radiobuttons[i];

        console.log(rb.tagName + " " + rb.id)

        rb.addEventListener('click', clickRadioGroup);
        rb.addEventListener('keydown', keyDownRadioGroup);
        rb.addEventListener('focus', focusRadioButton);
        rb.addEventListener('blur', blurRadioButton);
    }

});

function firstRadioButton(node) {

    var first = node.parentNode.firstChild;

    while(first) {
        if (first.nodeType === Node.ELEMENT_NODE) {
            if (first.getAttribute("role") === 'radio') return first;
        }
        first = first.nextSibling;
    }

    return null;
}

function lastRadioButton(node) {

    var last = node.parentNode.lastChild;

    while(last) {
        if (last.nodeType === Node.ELEMENT_NODE) {
            if (last.getAttribute("role") === 'radio') return last;
        }
        last = last.previousSibling;
    }

    return last;
}

function nextRadioButton(node) {

    var next = node.nextSibling;

    while(next) {
        if (next.nodeType === Node.ELEMENT_NODE) {
            if (next.getAttribute("role") === 'radio') return next;
        }
        next = next.nextSibling;
    }

    return null;
}

function previousRadioButton(node) {

    var prev = node.previousSibling;

    while(prev) {
        if (prev.nodeType === Node.ELEMENT_NODE) {
            if (prev.getAttribute("role") === 'radio') return prev;
        }
        prev = prev.previousSibling;
    }

    return null;
}

function getImage(node) {

    var child = node.firstChild;

    while(child) {
        if (child.nodeType === Node.ELEMENT_NODE) {
            if (child.tagName === 'IMG') return child;
        }
        child = child.nextSibling;
    }

    return null;
}

function setRadioButton(node, state) {
    var image = getImage(node);

    if (state == 'true') {
        node.setAttribute('aria-checked', 'true')
        node.tabIndex = 0;
        node.focus()
    }
    else {
        node.setAttribute('aria-checked', 'false')
        node.tabIndex = -1;
    }
}

function clickRadioGroup(event) {
    var type = event.type;

    if (type === 'click') {

        var node = event.currentTarget;

        var radioButton = firstRadioButton(node);

        while (radioButton) {
            setRadioButton(radioButton, "false");
            radioButton = nextRadioButton(radioButton);
        }

        setRadioButton(node, "true");

        event.preventDefault();
        event.stopPropagation();
    }
}

function keyDownRadioGroup(event) {
    var type = event.type;
    var next = false;

    if(type === "keydown"){
        var node = event.currentTarget;

        switch (event.keyCode) {
            case KEYCODE.DOWN:
            case KEYCODE.RIGHT:
                var next = nextRadioButton(node);
                if (!next) next = firstRadioButton(node);
                break;

            case KEYCODE.UP:
            case KEYCODE.LEFT:
                next = previousRadioButton(node);
                if (!next) next = lastRadioButton(node);
                break;

            case KEYCODE.SPACE:
                next = node;
                break;
        }

        if (next) {
            var radioButton = firstRadioButton(node);

            while (radioButton) {
                setRadioButton(radioButton, "false");
                radioButton = nextRadioButton(radioButton);
            }

            setRadioButton(next, "true");

            event.preventDefault();
            event.stopPropagation();
        }
    }
}

function focusRadioButton(event) {
    event.currentTarget.className += ' active';
}

function blurRadioButton(event) {
    event.currentTarget.className = event.currentTarget.className.replace(' active','');
}