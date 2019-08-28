
import {connect} from 'react-redux'
import React from 'react'

import CoreContainer from '../core/Container'
import {deleteUser, getStation, getUser, postUser, putUser} from '../lib/actions'
import UserForm from '../component/UserForm'
import UserToolbar from '../component/UserToolbar'

class Users extends CoreContainer {
  constructor(props) {
    super(props)

    this.state.cols = ['bts', 'esi', 'imsi', 'msisdn', 'name']
    this.form = UserForm
    this.title = 'Users'
    this.toolbar = UserToolbar
  }

  deleteData = () => {
    this.confirm()
      .then(() => {
        const ids = new Set(this.state.selected)
        const promises = Array.from(ids).map(this.props._onDelete)
        return Promise.all(promises)
      })
      .then(this.loadData)
  }

  loadData = () => {
    Promise.all([
        this.props._onGet(this.state.limit, this.state.skip),
        this.props._onGetStations(),
      ])
      .then(res => this.setState({rows: res[0], selected: []}))
  }

  saveData = data => {
    if (!data) return

    const fn = data.id ? this.props._onPut : this.props._onPost
    fn(data).then(() => {
      this.toggleForm()
      this.loadData()
    })
  }
}

const mapDispatch = dispatch => ({
  _onDelete: id => dispatch(deleteUser(id)),
  _onGet: (limit, skip) => dispatch(getUser(limit, skip)),
  _onGetStations: () => dispatch(getStation(100, 0)),
  _onPost: data => dispatch(postUser(data)),
  _onPut: data => dispatch(putUser(data)),
})

const mapState = state => ({
  stations: state.stations,
  users: state.users,
})

export default connect(mapState, mapDispatch)(Users)
