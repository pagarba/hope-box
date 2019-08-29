
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

export default class ResponderForm extends CoreForm {
  constructor(props) {
    super(props)

    this.initState = {
      imsi: '',
      latitude: '',
      longitude: '',
      msisdn: '',
      name: '',
    }
    this.state = {...this.initState}
  }

  render() {
    return (
      <Modal open={this.props.open} toggle={this.props.onClose}>
        <ModalHeader>
          {this.props.data ? 'Update' : 'Create'} Responder
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <label htmlFor="imsi">IMSI</label>
              <FormInput
                id="imsi"
                onChange={this.handleChange}
                placeholder="000000000000000"
                size="sm"
                type="text"
                value={this.state.imsi} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="msisdn">MSISDN</label>
              <FormInput
                id="msisdn"
                onChange={this.handleChange}
                placeholder="123456"
                size="sm"
                type="text"
                value={this.state.msisdn} />
            </FormGroup>
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
                placeholder="John Doe"
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
