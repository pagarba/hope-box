
import C from '../lib/constants'
import {connect} from 'react-redux'
import React from 'react'

import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  FormCheckbox,
  Row,
} from 'shards-react'
import {getResponder, getStation, getUser} from '../lib/actions'
import LeafletMap from '../component/LeafletMap'
import ResponderInfo from '../component/ResponderInfo'
import StationInfo from '../component/StationInfo'
import UserInfo from '../component/UserInfo'

class _Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: {responders: true, stations: true, users: true},
      latitude: C.LATITUDE,
      longitude: C.LONGITUDE,
      markers: [],
      zoom: C.ZOOM,
    }
  }

  componentWillMount() {
    const {latitude, longitude} = this.props.settings
    if (!!latitude && !!longitude) {
      this.setState({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      })
    }
  }

  componentDidMount() {
    this.loadData()
  }

  filterData = () => {
    const bts = {}
    const markers = []

    this.props.stations.forEach(data => {
      bts[data.id] = {
        latitude: data.latitude,
        longitude: data.longitude,
      }

      if (this.state.filter.stations) {
        markers.push({
          data,
          popup: `Station: ${data.id}`,
          props: {
            position: [data.latitude, data.longitude],
            zIndexOffset: 30,
          },
          type: 'stations',
        })
      }
    })

    if (this.state.filter.responders) {
      this.props.responders.forEach(data => markers.push({
        data,
        popup: `Responder: ${data.id}`,
        props: {
          position: [
            data.latitude || this.state.latitude,
            data.longitude || this.state.longitude,
          ],
          zIndexOffset: 20,
        },
        type: 'responders',
      }))
    }

    if (this.state.filter.users) {
      this.props.users.forEach(data => markers.push({
        data,
        popup: `User: ${data.id}`,
        props: {
          position: [
            !!data.latitude ? data.latitude : !!bts[data.bts] ? bts[data.bts].latitude : this.state.latitude,
            !!data.longitude ? data.longitude : !!bts[data.bts] ? bts[data.bts].longitude : this.state.longitude,
          ],
          zIndexOffset: 10,
        },
        type: 'users',
      }))
    }

    this.setState({markers})
  }

  handleFilter = key => {
    this.setState({
      filter: {
        ...this.state.filter,
        [key]: !this.state.filter[key],
      },
    }, this.filterData)
  }

  loadData = () => {
    Promise.all([
        this.props._onGetResponders(),
        this.props._onGetStations(),
        this.props._onGetUsers(),
      ])
      .then(this.filterData)
  }

  render() {
    const position = [this.state.latitude, this.state.longitude]

    return (
      <div>
        <Row>
          <Col style={{paddingTop: 10}}>
            <ButtonToolbar>
              <ButtonGroup className="mr-2" size="sm">
                <Button
                  onClick={this.loadData}
                  outline
                  theme="primary">Refresh</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
          <Col>
            <h3 style={{margin: 10, textAlign: 'right'}}>Map</h3>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="4" lg="2">
            {['Responders', 'Stations', 'Users'].map(key => {
              const low_key = key.toLowerCase()
              return (
                <FormCheckbox
                  checked={this.state.filter[low_key]}
                  key={key}
                  name={low_key}
                  onChange={() => this.handleFilter(low_key)}>
                  {key}
                </FormCheckbox>
              )
            })}
          </Col>
          <Col sm="12" md="8" lg="10">
            <LeafletMap
              markers={this.state.markers
                .filter(m => m && m.data && m.data.id)
                .map(m => {
                  let popup = null
                  switch(m.type) {
                    case 'responders':
                      popup = <ResponderInfo data={m.data} />
                      break
                    case 'stations':
                      popup = <StationInfo data={m.data} />
                      break
                    case 'users':
                      popup = <UserInfo data={m.data} />
                      break
                  }
                  return {...m, popup}
                })}
              position={position}
              zoom={this.state.zoom} />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  _onGetResponders: () => dispatch(getResponder(1000, 0)),
  _onGetStations: () => dispatch(getStation(1000, 0)),
  _onGetUsers: () => dispatch(getUser(1000, 0)),
})

const mapState = state => ({
  responders: state.responders,
  settings: state.settings,
  stations: state.stations,
  users: state.users,
})

export default connect(mapState, mapDispatch)(_Map)
