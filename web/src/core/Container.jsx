
import React from 'react'

import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
} from 'shards-react'
import Table from '../component/Table'

export default class Container extends React.Component {
  constructor(props) {
    super(props)

    this.form = null
    this.state = {
      cols: [],
      confirm: {resolve: null, reject: null},
      data: {},
      limit: 10,
      open: false,
      rows: [],
      selected: [],
      skip: 0,
    }
    this.title = 'Container'
    this.toolbar = null
  }

  componentDidMount() {
    this.loadData()
  }

  confirm = () => new Promise((resolve, reject) => {
    this.setState({
      confirm: {
        resolve: () => {
          resolve()
          this.confirmClose()
        },
        reject: () => {
          reject()
          this.confirmClose()
        },
      },
    })
  })

  confirmClose = () => this.setState({confirm: {resolve: null, reject: null}})

  deleteData = () => {
    console.log('TODO: deleteData')
  }

  handleCreate = () => this.setState({data: {}}, this.toggleForm)

  handleSelect = id => {
    const ids = new Set(this.state.selected)
    if (ids.has(id))
      ids.delete(id)
    else
      ids.add(id)
    this.setState({selected: Array.from(ids)})
  }

  handleUpdate = id => {
    const data = this.state.rows.find(row => row.id === id)
    if (data && data.id) this.setState({data}, this.toggleForm)
  }

  loadData = () => {
    console.log('TODO: loadData')
  }

  saveData = data => {
    console.log('TODO: saveData')
  }

  toggleForm = () => this.setState({open: !this.state.open})

  render() {
    const Form = this.form
    const Toolbar = this.toolbar

    return (
      <div>
        <Modal open={!!this.state.confirm.resolve} toggle={this.confirmClose}>
          <ModalBody>Are you sure you want to perform this delete action?</ModalBody>
          <ModalFooter>
            <Button onClick={this.state.confirm.resolve} theme="primary">Yes</Button>
            <Button onClick={this.state.confirm.reject} theme="secondary">No</Button>
          </ModalFooter>
        </Modal>
        <Row>
          <Col style={{paddingTop: 10}}>
            <Toolbar
              onCreate={this.handleCreate}
              onDelete={this.deleteData}
              onMessage={() => {}}
              selected={this.state.selected.length} />
          </Col>
          <Col>
            <h3 style={{margin: 10, textAlign: 'right'}}>{this.title}</h3>
          </Col>
        </Row>
        <div>
          {this.state.open &&
            <Form
              data={this.state.data}
              onClose={this.toggleForm}
              onSave={this.saveData}
              open={this.state.open} />
          }
          <Table
            cols={this.state.cols}
            onSelect={this.handleSelect}
            onUpdate={this.handleUpdate}
            rows={this.state.rows}
            selected={this.state.selected} />
        </div>
      </div>
    )
  }
}
