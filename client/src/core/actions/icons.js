export const fetch_icons = (icons) => ({
    type: 'FETCH_ICONS',
    icons
})

export const fetchIcons = () => async dispatch => {
    const response = await fetch('icons/fetch')
    const icons = await response.json()
    dispatch(fetch_icons(icons))
}