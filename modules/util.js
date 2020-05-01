export function $(selector) {
    return document.querySelector(selector);
}

export function getPositionOfDom(element) {
    let left = parseInt(window.getComputedStyle(element)["left"]);
    let top = parseInt(window.getComputedStyle(element)["top"]);
    return { left, top }
}