import React, { Component } from 'react';
import { Circle } from 'react-leaflet';

class DangerZone extends Component {
    
  render() {
    return (
        <div>
            <Circle center={[33.7550, -84.3895]} fillColor="red" radius={200} />
        </div>  
    );
  }
    
}

export default DangerZone;
