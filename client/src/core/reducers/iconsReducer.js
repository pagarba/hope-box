const initalState = {
    icons: [],
    coords: {}
}

export default (state = initalState, action) => {
    switch (action.type) {
        case 'FETCH_ICONS':
            return {
                ...state,
                icons: action.icons
            }
        case 'SEND_ICON_COORDS':
            return {
                ...state,
                coords: action.coords
            }
            default:
                return state;
    }
}