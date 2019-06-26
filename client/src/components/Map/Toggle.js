import React from 'react';
import { UncontrolledCollapse, Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import './styles/Toggle.css'

const Toggle = () => (
  <div>
    <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
      Toggle
    </Button>
    <UncontrolledCollapse toggler="#toggler">
      <Card className="card-form">
        <Form className="form">
          <FormGroup>
            <Label for="exampleEmail">Latitude</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Longitude</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Location Name</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </FormGroup>
        </Form>
      </Card>
      
    </UncontrolledCollapse>
  </div>
);

export default Toggle;