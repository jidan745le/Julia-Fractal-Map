import createCanvasStore from "./canvasRedux.js";
import {rule} from "./rule.js";

var root = document.getElementById("root");
let snapshotCanvas = null;

var canvas = document.createElement("canvas");
export var canvasContext = canvas.getContext("2d");
root.appendChild(canvas);


export default canvas;

export var canvasStore = createCanvasStore(rule);

export function saveSnapshotCanvas(){
    snapshotCanvas = document.createElement("canvas");
    snapshotCanvas.width = canvas.width;
    snapshotCanvas.height = canvas.height;
    snapshotCanvas.getContext("2d").drawImage(canvas, 0, 0);
}

export function setCanvasSize(width,height){
  canvas.width = width;
  canvas.height = height;
  canvasStore.dispatch({type:"setSize",payload:{width,height}});
}

export function drawChunk(position,width,height,data){ 
canvasContext.putImageData(data,position.x,position.y) 
}

export function getSnapshotCanvas(){
    return snapshotCanvas;
}




export function clearCanvas(){     
    canvasContext.clearRect(0,0,canvas.width,canvas.height);
}



export function getCanvasSize(){
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    return {canvasWidth,canvasHeight}
}
