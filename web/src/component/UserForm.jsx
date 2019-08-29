
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
          {this.props.data ? 'Update' : 'Create'} User
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <label htmlFor="bts">BTS</label>
                  <FormSelect
                    id="bts"
                    onChange={this.handleChange}
                    placeholder="Connected BTS"
                    size="sm"
                    value={this.state.bts}>
                    <option value="0">0</option>
                    {this.props.stations.map(station => (
                      <option key={station.id} value={station.id}>{station.name}</option>
                    ))}
                  </FormSelect>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label htmlFor="esi">ESI</label>
                  <FormSelect
                    id="esi"
                    onChange={this.handleChange}
                    placeholder="Emergency Severity Index"
                    size="sm"
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
                  <label htmlFor="imsi">IMSI</label>
                  <FormInput
                    id="imsi"
                    onChange={this.handleChange}
                    placeholder="Mobile Device Identifier"
                    size="sm"
                    type="text"
                    value={this.state.imsi} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label htmlFor="msisdn">MSISDN</label>
                  <FormInput
                    id="msisdn"
                    onChange={this.handleChange}
                    placeholder="Phone Number"
                    size="sm"
                    type="text"
                    value={this.state.msisdn} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <label htmlFor="latitude">Latitude</label>
                  <FormInput
                    id="latitude"
                    onChange={this.handleChange}
                    placeholder="Longitude"
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
                    placeholder="Latitude"
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
                placeholder="User Name or Nickname"
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
