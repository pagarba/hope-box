import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { postIcons } from '../../core/actions/icons';

const IconForm = (props) => {
    const onFormSubmit = (e) => {
        props.postIcons({
            lat: e.target.latitude.value,
            lon: e.target.longitude.value,
            message: e.target.locationName.value,
            item: e.target.item.value
        })
    }
    
    return(
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
                    <option>Safe Zone</option>
                    <option>Responder</option>
                    <option>Base Station</option>
                    <option>Danger Zone</option>
                </Input>
            </FormGroup>
        <Button className="submit-button">Submit</Button>
        </Form>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        postIcons: (icons) => dispatch(postIcons(icons))
    }
}

export default connect(null, mapDispatchToProps)(IconForm);