export function genGradient(from,to){
    let distance = to.x - from.x;
    let step = to.rgb.map((rgb,index)=>{return ((rgb-from.rgb[index])/distance)});
    let count = 1;
    let ret = {};

    for(let idx = from.x+1;idx<=to.x;idx++){
        ret[idx] = from.rgb.map((rgb,idx) => Math.round(rgb + count*step[idx]))
        count++;
    }
    ret[from.x] = from.rgb;

    return ret;
}

export default function convertPositionsToGradient(positions) {
    let retMap = {};
    let gradientArray = [];
    let gradientStart,gradientEnd;
    
    for (let i = 0; i < positions.length; i++) {
        let rgb = positions[i].map(p=>p.y).map(rgb=>{return Math.round(rgb*(255/150))});
        gradientArray.push({x:positions[i][0].x,rgb});

        if(i==0){
            gradientStart = positions[i][0].x;
        }

        if(i==positions.length-1){
            gradientEnd = positions[i][0].x;
        }
    }
    console.log(gradientArray);
    for(let idx = 0;idx< gradientArray.length-1;idx++){
        Object.assign(retMap,genGradient(gradientArray[idx],gradientArray[idx+1]));
    }
    retMap.length =201;
    retMap = Array.from(retMap);
    console.log("platte",retMap,gradientStart,gradientEnd);
    return retMap.map((rgb,idx,arr)=>{
        if(idx<gradientStart){
            return arr[gradientStart].slice();
        }else if(idx>gradientEnd){
            return arr[gradientEnd].slice(); 
        }else{
            return rgb;
        }
    })
}