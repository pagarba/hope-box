import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

const Sidebar = () => {
  return (
    <Card body>
      <CardTitle>Markers</CardTitle>
      <CardText>View Markers</CardText>
      <Button>Go</Button>
    </Card>
  );
}

export default Sidebar;