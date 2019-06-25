import React from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import assistanceURL from '../../images/yellowMarker.svg';

const AssistanceMarker = (props) =>  {
    const assistanceIcon = L.icon({
        iconUrl: assistanceURL,
        iconSize: [40, 40]
    });

    return(
        <Marker position={[parseFloat(props.data.lat), parseFloat(props.data.lon)]} icon={assistanceIcon}>
          <Popup>
          <span>{props.data.message}</span>  
          </Popup>
        </Marker>
    ); 
}

export default AssistanceMarker;