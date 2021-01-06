export var addDomDragHandle = ((dom, handle) => {
    dom.addEventListener("mousedown", function (e) {
        const {offsetX,offsetY} = e;
        addDomDragHandle.moveHandle = e => handle(e,offsetX,offsetY);
        document.addEventListener("mousemove",addDomDragHandle.moveHandle);
    });
    document.addEventListener("mouseup", function () {
        document.removeEventListener("mousemove", addDomDragHandle.moveHandle);
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

export function addResizeHandleToWindow(win, handle) {
    const resizeObserver = new ResizeObserver(entries => {
      console.log(entries);
      for (let entry of entries) {
  
        let { width, height } = entry.contentRect;
        handle({width,height});
  
      }
      console.log('Size changed');
    });
  
  
    resizeObserver.observe(win);
  }

