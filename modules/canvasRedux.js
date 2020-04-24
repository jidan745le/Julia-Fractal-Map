//实现一个超级简易的redux
export default function createCanvasStore(reducer){    
    let store = reducer(undefined,{});

    function dispatch(action){
        store = reducer(store,action);
    }

    function getState(){
        return store;
    }

    return {dispatch,getState};

} 