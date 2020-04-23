var root = document.getElementById("root");
var canvas = document.createElement("canvas");
var canvasContext = canvas.getContext("2d");
root.appendChild(canvas);

let x0 = -1.5;
let x1 = 1.5;
let y0 = -1;
let y1 = 1;
let store = {x0,x1,y0,y1};
let snapshotCanvas = null;


// export function initStore(reducer){
//     store = createCanvasStore(reducer);
// }
export default canvas;

export function saveSnapshotCanvas(){
    snapshotCanvas = document.createElement("canvas");
    snapshotCanvas.width = canvas.width;
    snapshotCanvas.height = canvas.height;
    snapshotCanvas.getContext("2d").drawImage(canvas, 0, 0);
}

export function getStore(){
    return store;
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

export function zoomOut(zoom,x,y){
     //副本
     let cvs = document.createElement("canvas");
     cvs.width = canvas.width;
     cvs.height = canvas.height;
     cvs.getContext("2d").drawImage(canvas,0,0);
     //clear
      canvasContext.clearRect(0,0,canvas.width,canvas.height);
     //reduce
     let s = {...store};
     store.x0 = ((zoom-1)*(s.x0+((s.x1-s.x0)/canvas.width)*x) + s.x0)/zoom;
     store.x1 = ((zoom-1)*(s.x0+((s.x1-s.x0)/canvas.width)*x) + s.x1)/zoom;
     store.y0 = ((zoom-1)*(s.y0+((s.y1-s.y0)/canvas.height)*y) + s.y0)/zoom;
     store.y1 = ((zoom-1)*(s.y0+((s.y1-s.y0)/canvas.height)*y) + s.y1)/zoom;
     //draw
     canvasContext.drawImage(cvs,(1-zoom)*x,(1-zoom)*y,canvas.width*zoom,canvas.height*zoom);
}

export function drag(moveX, moveY,movementX,movementY){
  //clear
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  //reduce
  let s = {...store}
 
  store.x0 = s.x0 - ((s.x1-s.x0)/canvas.width)*movementX;
  store.x1 = s.x1 - ((s.x1-s.x0)/canvas.width)*movementX;
  store.y0 = s.y0 - ((s.y1-s.y0)/canvas.height)*movementY;
  store.y1 = s.y1 - ((s.y1-s.y0)/canvas.height)*movementY;
  console.log("x0",{x0,x1,y0,y1});
  //draw
  canvas.getContext("2d").drawImage(snapshotCanvas, moveX, moveY);
}


 