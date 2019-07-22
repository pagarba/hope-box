import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { postIcons } from '../../core/actions/icons';

const IconForm = (props) => {
    const onFormSubmit = (e) => {
        props.postIcons({
            lat: props.coords.lat,
            lon: props.coords.lng,
            message: e.target.locationName.value,
            item: e.target.item.value
        })
    }
    return(
        <Form onSubmit={onFormSubmit}>
            <FormGroup>
                <Label for="locationName">Name</Label>
                <Input type="locationName" name="locationName"/>
            </FormGroup>
            <FormGroup>
                <Label for="iconType">Icon Type</Label>
                <Input type="select" name="item">
                    <option>Safe Zone</option>
                    <option>Responder</option>
                    <option>Base Station</option>
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

const mapStateToProps = state => {
    return {
        coords: state.icons.coords
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IconForm);