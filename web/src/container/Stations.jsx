
import {connect} from 'react-redux'
import React from 'react'

import CoreContainer from '../core/Container'
import {deleteStation, getStation, postStation, putStation} from '../lib/actions'
import StationForm from '../component/StationForm'
import StationToolbar from '../component/StationToolbar'

class Stations extends CoreContainer {
  constructor(props) {
    super(props)

    this.state.cols = ['name', 'latitude', 'longitude']
    this.form = StationForm
    this.title = 'Stations'
    this.toolbar = StationToolbar
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
    //this.props._onGet(this.state.limit, this.state.skip)
    //  .then(rows => this.setState({rows, selected: []}))
    this.setState({rows: [...this.props.stations], selected: []})
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
  _onDelete: id => dispatch(deleteStation(id)),
  _onGet: (limit, skip) => dispatch(getStation(limit, skip)),
  _onPost: data => dispatch(postStation(data)),
  _onPut: data => dispatch(putStation(data)),
})

const mapState = state => ({
  stations: state.stations,
})

export default connect(mapState, mapDispatch)(Stations)
