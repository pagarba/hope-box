const initalState = {
    icons: []
}

export default (state = initalState, action) => {
    switch (action.type) {
        case 'FETCH_ICONS':
            return {
                ...state,
                icons: action.icons
            }
            default:
                return state;
    }
}