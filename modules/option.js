import convertPositionsToGradient from "./platteModule";
//设置渲染函数的初始化参数
let initialFractalLocationInfo = { x0: -1.5, y0: -1, x1: 1.5, y1: 1 }
let threadNum = 4;
let chunkSize = { width: 100, height: 100 };

let defaultPlatte = Array.from({length:201}).map((i,idx)=>{
    return [0,0,0,idx];
})


let juliaParameter = { real: 0.285, imaginary: 0.00, platte: defaultPlatte };
let option = { chunkSize, threadNum, juliaParameter };




function setPlatteOption(positions){
    option.juliaParameter.platte = convertPositionsToGradient(positions).map(item=>{item.push(255);return item});
    console.log("platte",option.juliaParameter.platte);
}



export { option, initialFractalLocationInfo,setPlatteOption };