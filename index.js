import { disableFetch,getFetchAllDataFunc } from "./modules/fetchModule.js";
import _ from "underscore";
import canvas,{zoom, getStore,drag, saveSnapshotCanvas,canvasStore} from "./modules/canvasManipulate";
import "./index.css";



/****init****/

//默认渲染函数 设置canvas为900*600尺寸的渲染函数
let render = getFetchAllDataFunc(900, 600);

//对渲染函数进行防抖包装
let debouncedRender = _.debounce(render,100);

//设置渲染函数的初始化参数
let initialFractalLocationInfo = { x0: -1.5, y0: -1, x1: 1.5, y1: 1 }
let threadNum = 4;
let chunkSize = { width: 100, height: 100 };

let juliaParameter = {real:0.285,imaginary:0.00};
let option = { chunkSize, threadNum,juliaParameter };

//init render
render(initialFractalLocationInfo, option);

/****init****/


/************add event handle for canvas**************/
//wheel event implement
var addCanvasWheelHandle = ((canvas,handle)=>{
  canvas.addEventListener("wheel",handle);
})

addCanvasWheelHandle(canvas, function (e) {
  console.log("wheel");
  disableFetch();
  if(e.deltaY<0){
    _.throttle(zoom, 200)(1.2, e.clientX, e.clientY);
  }else{
    _.throttle(zoom, 200)(1/1.2, e.clientX, e.clientY);
  }
  
  debouncedRender(canvasStore.getState().fractalLocation, option);
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
  debouncedRender(canvasStore.getState().fractalLocation, option);
}
);

/************add event handle for canvas**************/




document.getElementById("imaginary").addEventListener("change",function(e){
  canvasStore.dispatch({type:"reset",payload:initialFractalLocationInfo});
  
  console.log("reset",canvasStore.getState());
  console.log(typeof e.target.value);
  option.juliaParameter.imaginary = parseFloat(e.target.value);
  render(initialFractalLocationInfo, option);

})

document.getElementById("real").addEventListener("change",function(e){
  canvasStore.dispatch({type:"reset",payload:initialFractalLocationInfo});
  console.log("reset initialFractalLocationInfo",initialFractalLocationInfo);
  console.log("reset",canvasStore.getState());
  console.log(typeof e.target.value);
  option.juliaParameter.real = parseFloat(e.target.value);
  render(initialFractalLocationInfo, option);

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

