import React, { Component } from 'react';
import IconForm from './IconForm';
import { Button, Modal, ModalHeader } from 'reactstrap';
import './styles/IconModal.css';

class IconModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modalState
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button className="button-modal" color="primary" onClick={this.toggle}>Add Marker</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add an Icon</ModalHeader>
              <IconForm />  
        </Modal>  
      </div>
    );
  }
}



export default IconModal;