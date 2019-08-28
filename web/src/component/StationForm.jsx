
import React from 'react'

import {
  Button,
  Col,
  Form,
  FormGroup,
  FormInput,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
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
            <Row>
              <Col>
                <FormGroup>
                  <label htmlFor="latitude">Latitude</label>
                  <FormInput
                    id="latitude"
                    onChange={this.handleChange}
                    placeholder="34.0522342"
                    size="sm"
                    type="text"
                    value={this.state.latitude} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label htmlFor="longitude">Longitude</label>
                  <FormInput
                    id="longitude"
                    onChange={this.handleChange}
                    placeholder="-118.2436849"
                    size="sm"
                    type="text"
                    value={this.state.longitude} />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <label htmlFor="name">Name</label>
              <FormInput
                id="name"
                onChange={this.handleChange}
                placeholder="BTS 1"
                size="sm"
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
