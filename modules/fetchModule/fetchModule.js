import { drawChunk, setCanvasSize, saveSnapshotCanvas } from "../canvasModule/canvasBasic.js";
import debounce from "lodash/debounce"
//properties {worker,working,promiseInstance}
var workers = [{}, {}, {}, {}, {}, {}, {}, {}];
var stopFlag = false;

function disableFetch() {
    // workers = [{},{},{},{},{},{},{},{}];
    stopFlag = true;
}

function enableFetch() {
    stopFlag = false;
}

function fetchCalcData(workerIndex, postData) {
    if (stopFlag) {
        return;
    }

    let worker;
    if (workers[workerIndex].worker) {
        worker = workers[workerIndex].worker;
    } else {
        worker = workers[workerIndex].worker = new Worker("./worker/worker.js");
    }
    if (!worker.working) {
        return (worker.promiseInstance = new Promise(resolve => {
            worker.postMessage(postData);
            worker.working = true;
            worker.onmessage = function (event) {
                worker.working = false;
                resolve(event.data);
            }
        }))
    } else {
        return worker.promiseInstance.then(() => { return fetchCalcData(workerIndex, postData) });
    }
}

let getFetchAllDataFunc = (canvasWidth, canvasHeight) => {
    //设置画布尺寸
    setCanvasSize(canvasWidth, canvasHeight);
    let fetchAllData = (fractalLocationInfo, option) => {
        console.log("store", fractalLocationInfo);
        let count = 0;
        let { chunkSize, threadNum, juliaParameter } = option;
        let stepX = (fractalLocationInfo.x1 - fractalLocationInfo.x0) / canvasWidth;
        let stepY = (fractalLocationInfo.y1 - fractalLocationInfo.y0) / canvasHeight;

        enableFetch();
        let chunkXaxisNum = Math.ceil(canvasWidth / chunkSize.width);
        let chunkYaxisNum = Math.ceil(canvasHeight / chunkSize.height);
        let chunkNum = chunkXaxisNum * chunkYaxisNum;
        console.log(chunkXaxisNum, chunkYaxisNum, chunkNum)

        return new Promise(resolve => {
            for (let idx = 0; idx < chunkNum; idx++) {
                let workerId = idx % threadNum;
                //prepare payload data
                let position = {};
                let chunkWidth = chunkSize.width;
                let chunkHeight = chunkSize.height;
                position.x = (idx % chunkXaxisNum) * chunkSize.width;
                position.y = parseInt(idx / chunkXaxisNum) * chunkSize.height;
                console.log("pos", position);

                if (position.x === chunkXaxisNum - 1 && canvasWidth % chunkSize.width > 0) {
                    //如果X轴有残端
                    chunkWidth = canvasWidth % chunkSize.width;
                }

                if (position.y === chunkYaxisNum - 1 && canvasHeight % chunkSize.height > 0) {
                    //如果y轴有残端
                    chunkHeight = canvasHeight % chunkSize.height;
                }


                //prepare canvasData
                let canvasData = { position, chunkWidth, chunkHeight };

                //prepare fractalChunkData
                let x0 = fractalLocationInfo.x0 + stepX * position.x;
                let y0 = fractalLocationInfo.y0 + stepY * position.y;
                let x1 = fractalLocationInfo.x0 + stepX * (position.x + chunkWidth);
                let y1 = fractalLocationInfo.y0 + stepY * (position.y + chunkHeight);
                let fractalChunkData = { x0, y0, x1, y1 };

                //prepare option
                let option = { real: juliaParameter.real, imaginary: juliaParameter.imaginary,platte:juliaParameter.platte }

                //prepare chunkdata payload
                let payloadChunkData = { fractalChunkData, canvasData, option };
                console.log(payloadChunkData);

                //fetchCalcData
                fetchCalcData(workerId, payloadChunkData).then(res => {
                    count++;
                    if (count === 1) {

                    } else if (count === chunkNum) {
                        resolve(chunkNum);
                    }

                    if (res) {
                        drawChunk(position, chunkWidth, chunkHeight, res);
                        console.log("webworker", idx, count, workerId, payloadChunkData, res);
                    }
                })
            }
        }).then(() => {
            //保存快照
            saveSnapshotCanvas();
        })

    }
    return fetchAllData;
}

function resizeRenderFunction(width, height) {
    render = getFetchAllDataFunc(width, height);
    debouncedRender = debounce(render, 100);
}


//默认渲染函数 设置canvas为900*600尺寸的渲染函数
let render = getFetchAllDataFunc(900, 600);

//对渲染函数进行防抖包装
let debouncedRender = debounce(render, 100);




export { fetchCalcData, disableFetch, enableFetch, getFetchAllDataFunc, resizeRenderFunction, render, debouncedRender };