
import React from 'react'

import {
  Button,
  Form,
  FormGroup,
  FormInput,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'shards-react'
import CoreForm from '../core/Form'

export default class StationForm extends CoreForm {
  constructor(props) {
    super(props)

    this.initState = {
      latitude: '',
      longitude: '',
      name: ''
    }
    this.state = {...this.initState}
  }

  render() {
    return (
      <Modal open={this.props.open} toggle={this.props.onClose}>
        <ModalHeader>
          {this.props.data ? 'Update' : 'Create'} Station
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <label htmlFor="latitude">Latitude</label>
              <FormInput
                id="latitude"
                onChange={this.handleChange}
                placeholder="34.0522342"
                type="text"
                value={this.state.latitude} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="longitude">Longitude</label>
              <FormInput
                id="longitude"
                onChange={this.handleChange}
                placeholder="-118.2436849"
                type="text"
                value={this.state.longitude} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="name">Name</label>
              <FormInput
                id="name"
                onChange={this.handleChange}
                placeholder="BTS 1"
                type="text"
                value={this.state.name} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.handleSave} theme="primary">Save</Button>
          <Button onClick={this.props.onClose} theme="secondary">Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
