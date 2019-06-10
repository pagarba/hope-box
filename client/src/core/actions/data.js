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

export const sendCoordinates = (props) => dispatch => {
    dispatch(send_coordinates(props))
}

export const action_creator = () => dispatch => {
    dispatch(fetch_data([{
            ismi: 520031234567890,
            lat: 51.5,
            lon: -0.096,
            text: 'Assistance',
            connected: false
        }, {
            ismi: 502130123456789,
            lat: 51.496,
            lon: -0.096,
            text: 'connected!',
            connected: false
        }, {
            ismi: 460001357924680,
            lat: 51.50,
            lon: -0.08,
            text: 'Need Help',
            connected: true
        }, {
            ismi: 470010171566423,
            lat: 51.503,
            lon: -0.09,
            text: 'no assistance needed',
            connected: true
        }, {
            ismi: 520010171566423,
            lat: 51.5,
            lon: -0.095,
            text: 'no help needed',
            connected: false
        }, {
            ismi: 310150123456789,
            lat: 51.4969,
            lon: -0.087,
            text: 'device is connected',
            connected: true
        }
    ]))
}