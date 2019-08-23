
import {connect} from 'react-redux'
import React from 'react'

class Stations extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <h1>Stations</h1>
    )
  }
}

const mapDispatch = dispatch => ({

})

const mapState = state => ({

})

export default connect(mapState, mapDispatch)(Stations)
