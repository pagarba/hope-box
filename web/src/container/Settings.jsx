
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

class Settings extends React.Component {
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
            <h3 style={{margin: 10, textAlign: 'right'}}>Settings</h3>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({

})

const mapState = state => ({
  settings: state.settings,
})

export default connect(mapState, mapDispatch)(Settings)
