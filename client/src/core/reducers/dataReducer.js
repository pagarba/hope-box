const initalState = {
    data: [],
    coordinates: {}
}

export default (state = initalState, action) => {
    switch(action.type) {
        case 'FETCH_DATA':
            return {
                ...state,
                data: action.data   
            }
        case 'SEND_COORDINATES':
            return {
                ...state,
                coordinates: action.coordinates
            }
        default:
            return state;
    }
}