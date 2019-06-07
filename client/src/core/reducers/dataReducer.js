const initalState = {
    data: []
}

export default (state = initalState, action) => {
    switch(action.type) {
        case 'FETCH_DATA':
            return {
                ...state,
                data: action.data
            }
        default:
            return state;
    }
}