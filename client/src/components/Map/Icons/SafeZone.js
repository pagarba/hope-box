import React from 'react';
import { CircleMarker, Popup } from 'react-leaflet';

const SafeZone = (props) => {
    return (
        <div>
            <CircleMarker center={[parseFloat(props.icon.lat), parseFloat(props.icon.lon)]} color="blue" radius={20}>
                <Popup>
            <span>{props.icon.message}</span>  
          </Popup>
            </CircleMarker>
        </div>  
    );    
}

export default SafeZone;