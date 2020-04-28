import { disableFetch,getFetchAllDataFunc } from "./modules/fetchModule.js";
import _ from "underscore";
import canvas,{zoom, getStore,drag, saveSnapshotCanvas,getSnapshotCanvas,canvasStore,setCanvasSize} from "./modules/canvasManipulate";
import {addDomDragHandle,addCanvasWheelHandle} from "./modules/eventUtil.js";
import "./index.css";

function resizeRenderFunction(width,height){
    let render = getFetchAllDataFunc(width, height);
    debouncedRender = _.debounce(render,100);    
}

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
function wheelCanvas(event) {
  event.stopPropagation();
  let x = event.clientX - canvas.getBoundingClientRect().left;
  let y = event.clientY - canvas.getBoundingClientRect().top;

  if (event.deltaY < 0) {
    zoom(1.2, x, y);
  } else {
    zoom(1 / 1.2, x, y);
  }

  debouncedRender(canvasStore.getState().fractalLocation, option);    
}


function moveCanvas(event){
  let { movementX, movementY } = event;
  console.log("movement");
  drag(movementX,movementY); 
  debouncedRender(canvasStore.getState().fractalLocation, option);  
}
//wheel event implement

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
function $(selector){
  return document.querySelector(selector);
}

function getPositionOfDom(element){
     let left = parseInt(window.getComputedStyle(element)["left"]);     
     let top = parseInt(window.getComputedStyle(element)["top"]);
    return {left,top}
}

addDomDragHandle($(".header"), function (e) {
  //副本
  e.preventDefault();
  let win = $(".window");
  win.style.left = getPositionOfDom(win).left+e.movementX+"px";
  win.style.top = getPositionOfDom(win).top+e.movementY+"px";
}
);


const resizeObserver = new ResizeObserver(entries => {
  console.log(entries);
  for (let entry of entries) {
      
      let {width,height} = entry.contentRect;
      let snapshotCanvas = getSnapshotCanvas();
      console.log(width,height);
      
      resizeRenderFunction(width,height-20);
      snapshotCanvas && canvas.getContext("2d").drawImage(snapshotCanvas,0,0,width,height-20);   
  }
  console.log('Size changed');
});


resizeObserver.observe($(".window"));




// document.getElementById("imaginary").addEventListener("change",function(e){
//   canvasStore.dispatch({type:"reset",payload:initialFractalLocationInfo});
  
//   console.log("reset",canvasStore.getState());
//   console.log(typeof e.target.value);
//   option.juliaParameter.imaginary = parseFloat(e.target.value);
//   render(initialFractalLocationInfo, option);

// })

// document.getElementById("real").addEventListener("change",function(e){
//   canvasStore.dispatch({type:"reset",payload:initialFractalLocationInfo});
//   console.log("reset initialFractalLocationInfo",initialFractalLocationInfo);
//   console.log("reset",canvasStore.getState());
//   console.log(typeof e.target.value);
//   option.juliaParameter.real = parseFloat(e.target.value);
//   render(initialFractalLocationInfo, option);

// })

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

