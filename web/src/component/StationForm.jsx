
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
      imsi: '',
      msisdn: '',
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
              <label htmlFor="imsi">IMSI</label>
              <FormInput
                id="imsi"
                onChange={this.handleChange}
                placeholder="000000000000000"
                type="text"
                value={this.state.imsi} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="msisdn">MSISDN</label>
              <FormInput
                id="msisdn"
                onChange={this.handleChange}
                placeholder="123456"
                type="text"
                value={this.state.msisdn} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="name">Name</label>
              <FormInput
                id="name"
                onChange={this.handleChange}
                placeholder="John Doe"
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
