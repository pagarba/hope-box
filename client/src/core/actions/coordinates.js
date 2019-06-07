export const fetch_data = (data) => {
    return {
        type: 'FETCH_DATA',
        data: data
    }
}

export const action_creator = () => dispatch => {
    // const data = {id: 1, lat: 51.4969, lon: -0.087, text: 'device is connected'};
    dispatch(fetch_data([{
        ismi: 310150123456789,
        lat: 51.4969,
        lon: -0.087,
        text: 'device is connected'
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
        ismi: 520031234567890,
        lat: 51.5,
        lon: -0.096,
        text: 'Assistance'
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
    }]))
}