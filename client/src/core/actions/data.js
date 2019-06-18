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

export const fetchData = () => dispatch => {
    dispatch(fetch_data([{
        ismi: 520031234567890,
        lat: 51.5,
        lon: -0.096,
        text: 'Assistance'
    }, {
        ismi: 502130123456789,
        lat: 51.496,
        lon: -0.096,
        text: 'connected!'
    }, {
        ismi: 460001357924680,
        lat: 51.50,
        lon: -0.08,
        text: 'Need Help'
    }, {
        ismi: 470010171566423,
        lat: 51.503,
        lon: -0.09,
        text: 'no assistance needed'
    }, {
        ismi: 520010171566423,
        lat: 51.5,
        lon: -0.095,
        text: 'no help needed'
    }, {
        ismi: 310150123456789,
        lat: 51.4969,
        lon: -0.087,
        text: 'device is connected'
    }]))
}