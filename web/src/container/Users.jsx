
import {connect} from 'react-redux'
import React from 'react'

class Users extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <h1>Users</h1>
    )
  }
}

const mapDispatch = dispatch => ({

})

const mapState = state => ({

})

export default connect(mapState, mapDispatch)(Users)
