import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, FormGroup, Label, Input } from 'reactstrap';
import { postIcons } from '../../core/actions/icons';
import './styles/ModalExample.css';

class ModalExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const onFormSubmit = (e) => {
      e.preventDefault();
      this.props.postIcons({
        lat: e.target.latitude.value,
        lon: e.target.longitude.value,
        message: e.target.locationName.value,
        item: e.target.item.value
      })
    }

    return (
      <div>
        <Button className="button-modal" color="primary" onClick={this.toggle}>Add SafeZone</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <Form onSubmit={onFormSubmit}>
            <FormGroup className="form-group">
              <Label for="latitude">Latitude</Label>
              <Input type="latitude" name="latitude"/>
            </FormGroup>
            <FormGroup>
              <Label for="longitude">Longitude</Label>
              <Input type="longitude" name="longitude" />
            </FormGroup>
            <FormGroup>
              <Label for="locationName">Location Name</Label>
              <Input type="locationName" name="locationName"/>
            </FormGroup>
            <FormGroup>
          <Label for="iconType">Icon Type</Label>
          <Input type="select" name="item">
            <option>safezone</option>
          </Input>
        </FormGroup>
            <Button className="submit-button">Submit</Button>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postIcons: (icons) => dispatch(postIcons(icons))
  }
}

export default connect(null, mapDispatchToProps)(ModalExample);