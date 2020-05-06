
export const  rgbArray = ["red", "green", "blue"];

export function transformPositionToLinearGradientStyle(positions) {
  let linearGradientStr = positions.map((position, idx) => {
       let px = position[0].x + "px";
       
       return `rgb(${position.map(rgb=>Math.round((256/150)*rgb.y)).join()}) ${px} `;
    
  }).join();

  let background = `linear-gradient(to right,${linearGradientStr})`;
  return { background };
}

//将位置装换位style
export function transformPositionToStyle(position) {
    let posStyle = { left: `${position.x - 5}px`, top: `${position.y - 5}px` }
    return posStyle;
}