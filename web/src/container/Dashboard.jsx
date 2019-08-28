
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
  Row,
} from 'shards-react'
import {getResponder, getStation, getUser} from '../lib/actions'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.loadData()
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
    return (
      <div>
        <Row>
          <Col style={{paddingTop: 10}}>

          </Col>
          <Col>
            <h3 style={{margin: 10, textAlign: 'right'}}>Dashboard</h3>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="6" lg="4">
            <Card>
              <CardBody>
                <CardTitle>Responders</CardTitle>
                <h1>{this.props.responders.length}</h1>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" md="6" lg="4">
            <Card>
              <CardBody>
                <CardTitle>Stations</CardTitle>
                <h1>{this.props.stations.length}</h1>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" md="6" lg="4">
            <Card>
              <CardBody>
                <CardTitle>Users</CardTitle>
                <h1>{this.props.users.length}</h1>
              </CardBody>
            </Card>
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
  stations: state.stations,
  users: state.users,
})

export default connect(mapState, mapDispatch)(Dashboard)
