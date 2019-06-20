export const fetch_data = (data) => ({
    type: 'FETCH_DATA',
    data
})

export const send_coordinates = ({
    lat,
    lon
}) => ({
    type: 'SEND_COORDINATES',
    coordinates: {
        lat,
        lon
    }
})

export const filter_data = (text) => ({
    type: 'FILTER_DATA',
    filter: text
})

export const sendCoordinates = (props) => dispatch => {
    dispatch(send_coordinates(props))
}

export const filterData = (text) => dispatch => {
    dispatch(filter_data(text))
}

export const fetchData = () => async dispatch => {
    const response = await fetch('data/fetch')
    const data = await response.json()

    dispatch(fetch_data(data))
}