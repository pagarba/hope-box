
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

const definitions = {
  'BTS': 'Base Transceiver Station',
  'ESI': 'Emergency Severity Index',
  'IMSI': 'International Mobile Subscriber Identity',
  'MSISDN': 'Mobile Station International Subscriber Directory Number',
}

export default class HelpModal extends React.Component {
  render() {
    const defs = []
    for(let [k, v] of Object.entries(definitions)) {
      defs.push(
        <li key={k}>
          <strong>{k}</strong> = {v}
        </li>
      )
    }

    return (
      <Modal open={this.props.open} toggle={this.props.onClose}>
        <ModalHeader>
          Helpful Information
        </ModalHeader>
        <ModalBody>
          <ul>
            {defs}
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.props.onClose} theme="primary">Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
