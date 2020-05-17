import { disableFetch, resizeRenderFunction, render } from "./modules/fetchModule/fetchModule.js";
import {wheelCanvas, moveCanvas } from "./modules/canvasModule/canvasManipulate";
import canvas, { getSnapshotCanvas} from "./modules/canvasModule/canvasBasic";
import { addDomDragHandle, addCanvasWheelHandle } from "./modules/eventModule/eventUtil.js";
import { initialFractalLocationInfo, option,setPlatteOption } from "./modules/option.js";
import { $, getPositionOfDom } from "./modules/util.js";
import "./index.css";
import "./ui/index.js";

//init render
render(initialFractalLocationInfo, option);
//attach Event For canvas

addCanvasWheelHandle(canvas, function (e) {
  console.log("wheel");
  disableFetch();
  wheelCanvas(e);
})

addDomDragHandle(canvas, function (e) {
  //副本
  disableFetch();
  moveCanvas(e);
}
);

/************add event handle for canvas**************/


addDomDragHandle($(".header"), function (e) {
  //副本
  e.preventDefault();
  let win = $(".window");
  win.style.left = getPositionOfDom(win).left + e.movementX + "px";
  win.style.top = getPositionOfDom(win).top + e.movementY + "px";
}
);


const resizeObserver = new ResizeObserver(entries => {
  console.log(entries);
  for (let entry of entries) {

    let { width, height } = entry.contentRect;
    let snapshotCanvas = getSnapshotCanvas();
    console.log(width, height);

    resizeRenderFunction(width, height - 20);
    snapshotCanvas && canvas.getContext("2d").drawImage(snapshotCanvas, 0, 0, width, height - 20);
  }
  console.log('Size changed');
});


resizeObserver.observe($(".window"));






