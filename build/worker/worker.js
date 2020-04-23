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
    let {x0,x1,y1,y0} = data.fractalChunkData;
    let stepX = (x1-x0)/data.canvasData.chunkWidth;
    let stepY = (y1-y0)/data.canvasData.chunkHeight;
    for(let i = 0;i<data.canvasData.chunkHeight;i++){
        for(let j = 0;j<data.canvasData.chunkWidth;j++){
            ret.data[(j+i*data.canvasData.chunkWidth)*4] =  0;
            ret.data[(j+i*data.canvasData.chunkWidth)*4 +1] =  0;
            ret.data[(j+i*data.canvasData.chunkWidth)*4 +2] =  0;
            ret.data[(j+i*data.canvasData.chunkWidth)*4 +3] =  doConverge(x0 + j*stepX,y0 + i*stepY,data.option.real, data.option.imaginary)
            
        }
    }
    return ret;
}


self.addEventListener("message", function (e) {    
    self.postMessage(calculate(e.data));
}, false)