export const fetch_icons = (icons) => ({
    type: 'FETCH_ICONS',
    icons
})

export const post_icons = (icon) => ({
    type: 'POST_ICONS',
    icon
})

export const send_icon_coords = (coords) => ({
    type: 'SEND_ICON_COORDS',
    coords
})

export const sendIconCoords = (coords) => dispatch => {
    dispatch(send_icon_coords(coords))
}

export const postIcons = ({ lat, lon, message, item}) => async dispatch =>{
    await fetch('/icons/post', {
        method: 'Post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lat, lon, message, item })
    })
}

export const fetchIcons = () => async dispatch => {
    const response = await fetch('/icons/fetch')
    const icons = await response.json()
    dispatch(fetch_icons(icons))
}