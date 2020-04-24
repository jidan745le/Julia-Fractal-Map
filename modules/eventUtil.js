export var addDomDragHandle = ((dom, handle) => {
    dom.addEventListener("mousedown", function (e) {
        document.addEventListener("mousemove", handle);
    });
    dom.addEventListener("mouseup", function () {
        document.removeEventListener("mousemove", handle)
    });

    if (dom.tagName === "CANVAS") {
        dom.addEventListener("mouseleave", function () {
            document.removeEventListener("mousemove", handle)
        });
    }

})

export var addCanvasWheelHandle = ((canvas, handle) => {
    canvas.addEventListener("wheel", handle);
})

