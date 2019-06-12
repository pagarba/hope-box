const initalState = {
    data: [],
    coordinates: {},
    filter: ''
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
        case 'FILTER_DATA':
            return {
                ...state,
                filter: action.filter
            }
        default:
            return state;
    }
}