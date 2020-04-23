function getRandomFunction(from, to) {
    return function () {
        return from + Math.round(Math.random() * (to - from));
    }
}

export {getRandomFunction};