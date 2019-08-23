
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

export default class ResponderForm extends React.Component {
  static initState = {
    imsi: '',
    msisdn: '',
    name: ''
  }

  constructor(props) {
    super(props)

    this.state = {...this.initState}
  }

  componentDidUpdate(prevProps) {
    if(prevProps.data !== this.props.data) {
      this.setState({...this.props.data})
    }
  }

  handleChange = ev => this.setState({[ev.target.id]: ev.target.value})

  handleSave = () => {
    console.log('TODO: ResponderForm.handleSave validation')
    this.props.onSave({...this.state})
    this.setState({...this.initState})
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
