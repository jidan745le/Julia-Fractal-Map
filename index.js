import { disableFetch, resizeRenderFunction, render } from "./modules/fetchModule/fetchModule.js";
import { wheelCanvas, moveCanvas } from "./modules/canvasModule/canvasManipulate";
import canvas, { getSnapshotCanvas } from "./modules/canvasModule/canvasBasic";
import { addResizeHandleToWindow, addDomDragHandle, addCanvasWheelHandle } from "./modules/eventModule/eventUtil.js";
import { initialFractalLocationInfo, option, setPlatteOption } from "./modules/option.js";
import { $, moveDom } from "./modules/util.js";
import "./index.css";
import "./ui/index.js";

//init render
render(initialFractalLocationInfo, option);

//attach Event For canvas
addCanvasWheelHandle(canvas, function (e) {  
  disableFetch();
  wheelCanvas(e);
})

addDomDragHandle(canvas, function (e) {
  disableFetch();
  moveCanvas(e);
}
);

//attach Event For window
addDomDragHandle($(".header"), function (e) {
  e.preventDefault();
  let win = $(".window");
  moveDom(win,event);
}
);

addResizeHandleToWindow($(".window"), function ({ width, height }) {
  let snapshotCanvas = getSnapshotCanvas();
  resizeRenderFunction(width, height - 20);
  snapshotCanvas && canvas.getContext("2d").drawImage(snapshotCanvas, 0, 0, width, height - 20);
})






