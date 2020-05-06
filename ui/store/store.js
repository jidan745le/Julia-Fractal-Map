import { createStore } from "redux";

let initialState = {
    positions: [[{ x: 10, y: 10 }, { x: 10, y: 10 }, { x: 10, y: 10 }], [{ x: 22, y: 12 }, { x: 22, y: 10 }, { x: 22, y: 44 }], [{ x: 55, y: 12 }, { x: 55, y: 10 }, { x: 55, y: 44 }]],
}

export default createStore((state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        case "changePosition": {
            let channelId = payload.colorChannelId;
            let dotId = payload.dotId;
            let position = payload.position;            
            let positions = [...state.positions];

 
            positions[dotId][channelId] = position;

            for (let channelId = 0; channelId < 3; channelId++) {
                positions[dotId][channelId].x = position.x;
            }

            return { ...state, positions };
        }

        default: {
            return state;
        }
    }
})