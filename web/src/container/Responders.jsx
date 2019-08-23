
import {connect} from 'react-redux'
import React from 'react'

import {Card} from 'shards-react'
import {deleteResponder, getResponder, postResponder, putResponder} from '../lib/actions'
import ResponderForm from '../component/ResponderForm'
import ResponderToolbar from '../component/ResponderToolbar'
import Table from '../component/Table'

class Responders extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {},
      limit: 10,
      open: false,
      selected: [],
      skip: 0
    }
  }

  componentDidMount() {
    this.handleGet()
  }

  handleDelete = () => {
    console.log("TODO: Responders.handleDelete")
  }

  handleGet = () => {
    this.props._onGet(this.state.limit, this.state.skip)
  }

  handleSave = data => {
    const fn = data.id ? this.props._onPut : this.props._onPost
    fn(data).then(() => {
      this.toggleForm()
      this.handleGet()
      this.setState({data: {}})
    })
    return false
  }

  handleSelect = id => {
    const ids = new Set(this.state.selected)
    if (ids.has(id)) {
      ids.delete(id)
    } else {
      ids.add(id)
    }
    this.setState({selected: Array.from(ids)})
  }

  handleUpdate = id => {
    const data = this.props.responders.find(r => r.id === id)
    if (data && data.id) this.setState({data}, this.toggleForm)
  }

  toggleForm = (data = {}) => this.setState({data, open: !this.state.open})

  render() {
    return (
      <div>
        <h3 style={{margin: 10}}>Responders</h3>
        <Card>
          <ResponderToolbar
            onCreate={this.toggleForm}
            onDelete={this.handleDelete}
            onMessage={() => false}
            selected={this.state.selected.length} />
          <ResponderForm
            data={Object.keys(this.state.data).length ? this.state.data : null}
            onClose={this.toggleForm}
            onSave={this.handleSave}
            open={this.state.open} />
          <Table
            cols={['imsi', 'msisdn', 'name']}
            data={this.props.responders}
            onSelect={this.handleSelect}
            onUpdate={this.handleUpdate}
            selected={this.state.selected} />
        </Card>
      </div>
    )
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
