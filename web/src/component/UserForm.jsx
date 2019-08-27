
import React from 'react'

import {
  Button,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'shards-react'
import CoreForm from '../core/Form'

export default class UserForm extends CoreForm {
  constructor(props) {
    super(props)

    this.initState = {
      bts: '0',
      esi: '0',
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
          {this.props.data ? 'Update' : 'Create'} User
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <label htmlFor="bts">Base Transceiver Station (BTS)</label>
                  <FormSelect
                    id="bts"
                    onChange={this.handleChange}
                    placeholder="0"
                    value={this.state.bts}>
                    <option value="0">0</option>
                    <option value="1">Station: 1</option>
                    <option value="2">Station: 2</option>
                    <option value="3">Station: 3</option>
                    <option value="4">Station: 4</option>
                    <option value="5">Station: 5</option>
                  </FormSelect>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label htmlFor="esi">Emergency Severity Index (ESI)</label>
                  <FormSelect
                    id="esi"
                    onChange={this.handleChange}
                    placeholder="0"
                    value={this.state.esi}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </FormSelect>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <label htmlFor="imsi">International Mobile Subscriber Identity (IMSI)</label>
                  <FormInput
                    id="imsi"
                    onChange={this.handleChange}
                    placeholder="000000000000000"
                    type="text"
                    value={this.state.imsi} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label htmlFor="msisdn">Mobile Station International Subscriber Directory Number (MSISDN)</label>
                  <FormInput
                    id="msisdn"
                    onChange={this.handleChange}
                    placeholder="123456"
                    type="text"
                    value={this.state.msisdn} />
                </FormGroup>
              </Col>
            </Row>
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
