
import {debouncedRender} from "../fetchModule/fetchModule.js"
import {option} from "../option.js"
import canvas,{canvasStore,canvasContext,clearCanvas,saveSnapshotCanvas,getSnapshotCanvas} from "./canvasBasic.js"



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
  canvas.getContext("2d").drawImage(getSnapshotCanvas(), movementX, movementY);
}

export function wheelCanvas(event) {
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
  
  
export function moveCanvas(event){
    let { movementX, movementY } = event;
    console.log("movement");
    drag(movementX,movementY); 
    debouncedRender(canvasStore.getState().fractalLocation, option);  
}




 