import createCanvasStore from "./canvasRedux.js";
import {rule} from "./rule.js";

var root = document.getElementById("root");
var canvas = document.createElement("canvas");
var canvasContext = canvas.getContext("2d");
root.appendChild(canvas);

let snapshotCanvas = null;


export default canvas;

export var canvasStore = createCanvasStore(rule);

export function saveSnapshotCanvas(){
    snapshotCanvas = document.createElement("canvas");
    snapshotCanvas.width = canvas.width;
    snapshotCanvas.height = canvas.height;
    snapshotCanvas.getContext("2d").drawImage(canvas, 0, 0);
}



export function clearCanvas(){     
    canvasContext.clearRect(0,0,canvas.width,canvas.height);
}

export function setCanvasSize(width,height){
    canvas.width = width;
    canvas.height = height;
}

export function getCanvasSize(){
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    return {canvasWidth,canvasHeight}
}

export function drawChunk(position,width,height,data){ 
    canvasContext.putImageData(data,position.x,position.y) 
}

export function zoom(zoom,x,y){

     //副本
     let cvs = document.createElement("canvas");
     cvs.width = canvas.width;
     cvs.height = canvas.height;
     cvs.getContext("2d").drawImage(canvas,0,0);

     clearCanvas();
     //reduce
     canvasStore.dispatch({type:"zoom",payload:{zoom,x,y}});
     //draw
     canvasContext.drawImage(cvs,(1-zoom)*x,(1-zoom)*y,canvas.width*zoom,canvas.height*zoom);
}

export function drag(movementX,movementY){
  saveSnapshotCanvas();
  clearCanvas();
  //reduce
  canvasStore.dispatch({type:"drag",payload:{movementX,movementY}});
  //draw
  canvas.getContext("2d").drawImage(snapshotCanvas, movementX, movementY);
}


 