export function $(selector) {
    return document.querySelector(selector);
}

export function getPositionOfDom(element) {
    let left = parseInt(window.getComputedStyle(element)["left"]);
    let top = parseInt(window.getComputedStyle(element)["top"]);
    return { left, top }
}

export function moveDom(dom, event, iX, iY) {
    console.log(event);
    dom.style.left = event.clientX - iX + "px";
    dom.style.top = event.clientY - iY + "px";
}