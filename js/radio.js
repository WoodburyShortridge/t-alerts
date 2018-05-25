const KEYCODE = {
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
    UP: 38
};

window.addEventListener('load', () => {
    const radiobuttons = document.querySelectorAll('[role=radio]');

for (const rb of radiobuttons) {
    rb.addEventListener('click', clickRadioGroup);
    rb.addEventListener('keydown', keyDownRadioGroup);
    rb.addEventListener('focus', focusRadioButton);
}
});

function firstRadioButton(node) {

    let first = node.parentNode.firstChild;

    while(first) {
        if (first.nodeType === Node.ELEMENT_NODE) {
            if (first.getAttribute("role") === 'radio') return first;
        }
        first = first.nextSibling;
    }

    return null;
}

function lastRadioButton(node) {

    let last = node.parentNode.lastChild;

    while(last) {
        if (last.nodeType === Node.ELEMENT_NODE) {
            if (last.getAttribute("role") === 'radio') return last;
        }
        last = last.previousSibling;
    }

    return last;
}

function nextRadioButton(node) {

    let next = node.nextSibling;

    while(next) {
        if (next.nodeType === Node.ELEMENT_NODE) {
            if (next.getAttribute("role") === 'radio') return next;
        }
        next = next.nextSibling;
    }

    return null;
}

function previousRadioButton(node) {

    let prev = node.previousSibling;

    while(prev) {
        if (prev.nodeType === Node.ELEMENT_NODE) {
            if (prev.getAttribute("role") === 'radio') return prev;
        }
        prev = prev.previousSibling;
    }

    return null;
}

function setRadioButton(node, state) {

    if (state === 'true') {
        node.setAttribute('aria-checked', 'true');
        node.classList.add('active');
        node.tabIndex = 0;
        node.focus()
    }
    else {
        node.setAttribute('aria-checked', 'false');
        node.classList.remove('active');
        node.tabIndex = -1;
    }
}

function clickRadioGroup(event) {
    const type = event.type;

    if (type === 'click') {

        const node = event.currentTarget;

        let radioButton = firstRadioButton(node);

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
    const type = event.type;
    let next = false;

    if(type === "keydown"){
        const node = event.currentTarget;

        switch (event.keyCode) {
            case KEYCODE.DOWN:
            case KEYCODE.RIGHT:
                next = nextRadioButton(node);
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
            let radioButton = firstRadioButton(node);

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
    event.currentTarget.classList.add('active');
}