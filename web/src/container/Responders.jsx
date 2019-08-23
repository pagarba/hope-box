
import {connect} from 'react-redux'
import React from 'react'

import CoreContainer from '../core/Container'
import {deleteResponder, getResponder, postResponder, putResponder} from '../lib/actions'
import ResponderForm from '../component/ResponderForm'
import ResponderToolbar from '../component/ResponderToolbar'

class Responders extends CoreContainer {
  constructor(props) {
    super(props)

    this.state.cols = ['imsi', 'msisdn', 'name']
    this.form = ResponderForm
    this.title = 'Responders'
    this.toolbar = ResponderToolbar
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
    this.props._onGet(this.state.limit, this.state.skip)
      .then(rows => this.setState({rows, selected: []}))
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
  _onDelete: id => dispatch(deleteResponder(id)),
  _onGet: (limit, skip) => dispatch(getResponder(limit, skip)),
  _onPost: data => dispatch(postResponder(data)),
  _onPut: data => dispatch(putResponder(data)),
})

const mapState = state => ({
  responders: state.responders,
})

export default connect(mapState, mapDispatch)(Responders)
