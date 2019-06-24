import React from 'react';
import { Circle } from 'react-leaflet';

const SafeZone = () => {
    return (
        <div>
            <Circle center={[33.7554, -84.4008]} fillColor="green" radius={200} />
        </div>  
    );    
}

export default SafeZone;