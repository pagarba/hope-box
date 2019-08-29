
import {connect} from 'react-redux'
import React from 'react'

import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardTitle,
  CardBody,
  Col,
  Form,
  FormGroup,
  FormInput,
  Row,
} from 'shards-react'
import {getSettings, putSettings, setError} from '../lib/actions'

class Settings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      latitude: '',
      longitude: '',
      ssid: '',
      psk: '',
    }
  }

  componentWillMount() {
    this.setState({...this.props.settings})
  }

  componentDidMount() {
    this.props._getSettings().then(res => {
      if (!res.latitude || !res.longitude) {
        // Try to get the geolocation information from the browser.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError)
        }
      }
    })
  }

  geoError = err => {
    let message = 'Unknown error message.';
    switch(err.code) {
      case err.PERMISSION_DENIED:
        message = "User denied the request for Geolocation."
        break;
      case err.POSITION_UNAVAILABLE:
        message = "Location information is unavailable."
        break;
      case err.TIMEOUT:
        message = "The request to get user location timed out."
        break;
      case err.UNKNOWN_ERROR:
        message = "An unknown error occurred."
        break;
    }
    //this.props._updateError(message)
  }

  geoSuccess = ({coords: {latitude, longitude}}) => this.setState({latitude, longitude})

  handleChange = ({target: {id, value}}) => this.setState({[id]: value})

  handleSave = () => {
    this.props._putSettings({
        ...this.state,
        latitude: this.state.latitude.toString(),
        longitude: this.state.longitude.toString(),
      })
      .then(this._getSettings)
  }

  render() {
    return (
      <div>
        <Row>
          <Col style={{paddingTop: 10}}>
            <ButtonToolbar>
              <ButtonGroup className="mr-2" size="sm">
                <Button
                  onClick={this.handleSave}
                  outline
                  theme="primary">Save</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
          <Col>
            <h3 style={{margin: 10, textAlign: 'right'}}>Settings</h3>
          </Col>
        </Row>
        <Form>
          <Row>
            <Col>
                <FormGroup>
                  <label htmlFor="latitude">Latitude</label>
                  <FormInput
                    id="latitude"
                    onChange={this.handleChange}
                    placeholder="Latitude"
                    size="sm"
                    value={this.state.latitude} />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                  <label htmlFor="longitude">Longitude</label>
                  <FormInput
                    id="longitude"
                    onChange={this.handleChange}
                    placeholder="Longitude"
                    size="sm"
                    value={this.state.longitude} />
                </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
                <FormGroup>
                  <label htmlFor="ssid">SSID</label>
                  <FormInput
                    id="ssid"
                    onChange={this.handleChange}
                    placeholder="SSID"
                    size="sm"
                    value={this.state.ssid} />
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                  <label htmlFor="psk">PSK</label>
                  <FormInput
                    id="psk"
                    onChange={this.handleChange}
                    placeholder="PSK"
                    size="sm"
                    value={this.state.psk} />
                </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  _getSettings: () => dispatch(getSettings()),
  _putSettings: data => dispatch(putSettings(data)),
  _updateError: err => dispatch(setError(err)),
})

const mapState = state => ({
  settings: state.settings,
})

export default connect(mapState, mapDispatch)(Settings)
