import { disableFetch,getFetchAllDataFunc } from "./modules/fetchModule.js";
import _ from "underscore";
import canvas,{zoomOut, getStore,drag, saveSnapshotCanvas } from "./modules/canvasManipulate";
import "./index.css";





let fetchAllData = getFetchAllDataFunc(900, 600);

let debouncedFetchAllData = _.debounce(fetchAllData,100);

let initialFractalLocationInfo = { x0: -1.5, y0: -1, x1: 1.5, y1: 1 }
let threadNum = 4;
let chunkSize = { width: 100, height: 100 };

let juliaParameter = {real:0.285,imaginary:0.00};
let option = { chunkSize, threadNum,juliaParameter };

//init
fetchAllData(initialFractalLocationInfo, option);

//wheel event implement
canvas.addEventListener("wheel", function (e) {
  console.log("wheel");
  disableFetch();
  if(e.deltaY<0){
    _.throttle(zoomOut, 200)(1.2, e.clientX, e.clientY);
  }else{
    _.throttle(zoomOut, 200)(1/1.2, e.clientX, e.clientY);
  }
  
  debouncedFetchAllData(getStore(), option);
  e.stopPropagation();
})

//drag event implement
var moveX = 0;
var moveY = 0;
var addCanvasDragHandle = ((canvas, handle) => {
  canvas.addEventListener("mousedown", function () {
    canvas.addEventListener("mousemove", handle);
    //clear
    moveX = 0;
    moveY = 0;
    //save snapshot
    saveSnapshotCanvas();

  });
  canvas.addEventListener("mouseup", function () {
    canvas.removeEventListener("mousemove", handle)
  });

  canvas.addEventListener("mouseleave", function () {
    canvas.removeEventListener("mousemove", handle)
  });
})

addCanvasDragHandle(canvas, function ({ movementX, movementY }) {
  //副本
  disableFetch();
  moveX = moveX + movementX;
  moveY = moveY + movementY;
  //clear
  drag(moveX,moveY,movementX,movementY);
  console.log("drag",getStore());
  debouncedFetchAllData(getStore(), option);
}
);

document.getElementById("imaginary").addEventListener("change",function(e){
  console.log(typeof e.target.value);
  option.juliaParameter.imaginary = parseFloat(e.target.value);
  fetchAllData(initialFractalLocationInfo, option);

})

document.getElementById("real").addEventListener("change",function(e){
  console.log(typeof e.target.value);
  option.juliaParameter.real = parseFloat(e.target.value);
  fetchAllData(initialFractalLocationInfo, option);

})

//test
// function createDom(tpl){
//   let tplModule = require("raw-loader"+tpl);

//   var dom = document.createElement("div");
//   dom.innerHTML = tplModule.default;

//   function addEvent(event,handle){

//   }
//   return {dom,addEvent};
// }

// document.body.append(createDom("!./file.html").dom);

//test
// document.addEventListener("click", function (e) {
//   console.log("wheel");
//   disableFetch();
  // _.throttle(zoomOut, 200)(1.05, e.clientX, e.clientY);
  // zoomOut(2,600, 400);
  //console.log(debouncedFetchAllData(initialFractalLocationInfo));
//   debouncedFetchAllData(convert(2,600, 400, {x0: -1.5, y0: -1, x1: 1.5, y1: 1}),option);
//   e.stopPropagation();
// })
//convert(2,150, 100, {x0: -1.5, y0: -1, x1: 1.5, y1: 1})
// function convert(zoom,x,y,store){
//   let s = {...store};
//   store.x0 = ((zoom-1)*(s.x0+((s.x1-s.x0)/1200)*x) + s.x0)/zoom;
//   store.x1 = ((zoom-1)*(s.x0+((s.x1-s.x0)/1200)*x) + s.x1)/zoom;
//   store.y0 = ((zoom-1)*(s.y0+((s.y1-s.y0)/800)*y) + s.y0)/zoom;
//   store.y1 = ((zoom-1)*(s.y0+((s.y1-s.y0)/800)*y) + s.y1)/zoom;
//   console.log("store",store);
//   return store;
// }