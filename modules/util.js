export function $(selector) {
    return document.querySelector(selector);
}

export function getPositionOfDom(element) {
    let left = parseInt(window.getComputedStyle(element)["left"]);
    let top = parseInt(window.getComputedStyle(element)["top"]);
    return { left, top }
}

export function moveDom(dom,event) {
    dom.style.left = getPositionOfDom(dom).left + event.movementX + "px";
    dom.style.top = getPositionOfDom(dom).top + event.movementY + "px";
}