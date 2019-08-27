
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

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
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

})

const mapState = state => ({
  responders: state.responders,
  stations: state.stations,
  users: state.users,
})

export default connect(mapState, mapDispatch)(Dashboard)
