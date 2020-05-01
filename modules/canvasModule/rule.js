let initialState = {
    fractalLocation: { x0: -1.5, x1: 1.5, y0: -1, y1: 1 },
    canvasSize: { width: 900, height: 600 }
}


export function rule(state = initialState, action) {
    switch (action.type) {
        case "zoom": {
            let { zoom, x, y } = action.payload;
            let { width, height } = state.canvasSize;
            let { x0, x1, y0, y1 } = state.fractalLocation;
            let fractalLocation = {};

            fractalLocation.x0 = ((zoom - 1) * (x0 + ((x1 - x0) / width) * x) + x0) / zoom;
            fractalLocation.x1 = ((zoom - 1) * (x0 + ((x1 - x0) / width) * x) + x1) / zoom;
            fractalLocation.y0 = ((zoom - 1) * (y0 + ((y1 - y0) / height) * y) + y0) / zoom;
            fractalLocation.y1 = ((zoom - 1) * (y0 + ((y1 - y0) / height) * y) + y1) / zoom;
            return {
                ...state, fractalLocation
            };
        }

        case "drag": {
            
            let {movementX,movementY } = action.payload;
            let { width, height } = state.canvasSize;
            let { x0, x1, y0, y1 } = state.fractalLocation;
            let fractalLocation = {};

            fractalLocation.x0 = x0 - ((x1 - x0) / width) * movementX;
            fractalLocation.x1 = x1 - ((x1 - x0) / width) * movementX;
            fractalLocation.y0 = y0 - ((y1 - y0) / height) * movementY;
            fractalLocation.y1 = y1 - ((y1 - y0) / height) * movementY;
            return {
                ...state, fractalLocation
            };
        }

        case "reset":{
            
            let fractalLocation = {...action.payload};            
            return {
                ...state, fractalLocation
            };
        }

        case "setSize":{
            let canvasSize = {...action.payload}
            return {
                ...state, canvasSize
            };
        }

        default:
            return state;
    }
}