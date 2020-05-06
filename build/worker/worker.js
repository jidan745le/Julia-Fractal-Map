function mod(x, y) {
    return x * x + y * y;
}

function doConverge(x, y, real, imaginary) {
    var temp;
    for (var i = 0; i < 200; i++) {
        if (mod(x, y) > 4) {
            return i;
        }
        temp = x;
        x = x * x - y * y + real;
        y = 2 * temp * y + imaginary;
    }
    
    return i;
}



function calculate(data){
    let ret = new ImageData(data.canvasData.chunkWidth,data.canvasData.chunkHeight);
    let {real,imaginary,platte} = data.option;
    let {x0,x1,y1,y0} = data.fractalChunkData;
    let stepX = (x1-x0)/data.canvasData.chunkWidth;
    let stepY = (y1-y0)/data.canvasData.chunkHeight;
    // eval(platte);
    for(let i = 0;i<data.canvasData.chunkHeight;i++){
        for(let j = 0;j<data.canvasData.chunkWidth;j++){
            const iteration = doConverge(x0 + j*stepX,y0 + i*stepY,real,imaginary);
            
            const platteArray = platte[iteration];
            ret.data[(j+i*data.canvasData.chunkWidth)*4] =  platteArray[0];
            ret.data[(j+i*data.canvasData.chunkWidth)*4 +1] =  platteArray[1];
            ret.data[(j+i*data.canvasData.chunkWidth)*4 +2] =  platteArray[2];
            ret.data[(j+i*data.canvasData.chunkWidth)*4 +3] =  platteArray[3];
            
        }
    }
    return ret;
}


self.addEventListener("message", function (e) {    
    self.postMessage(calculate(e.data));
}, false)