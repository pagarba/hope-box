import React from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import responderURL from '../../../images/crossIcon.svg' 

const ResponderIcon = (props) => {
    const responderIcon = L.icon({
        iconUrl: responderURL,
        iconSize: [40, 40]
    });
    
    return(
        <Marker position={[parseFloat(props.icon.lat), parseFloat(props.icon.lon)]} icon={responderIcon}>
          <Popup>
            <span>{props.icon.message}</span>  
          </Popup>
        </Marker>
    )
}

export default ResponderIcon;