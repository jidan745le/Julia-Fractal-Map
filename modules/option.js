//设置渲染函数的初始化参数
let initialFractalLocationInfo = { x0: -1.5, y0: -1, x1: 1.5, y1: 1 }
let threadNum = 4;
let chunkSize = { width: 100, height: 100 };

let juliaParameter = {real:0.285,imaginary:0.00};
let option = { chunkSize, threadNum,juliaParameter };

export  {option,initialFractalLocationInfo};