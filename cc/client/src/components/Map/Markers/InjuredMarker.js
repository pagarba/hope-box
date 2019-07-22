import React from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import injuredURL from '../../../images/redMarker.svg';

const InjuredMarker = (props) =>  {
    const injuredIcon = L.icon({
        iconUrl: injuredURL,
        iconSize: [40, 40]
    });

    return(
        <Marker position={[parseFloat(props.data.lat), parseFloat(props.data.lon)]} icon={injuredIcon}>
          <Popup>
          <span>{props.data.message}</span>  
          </Popup>
        </Marker>
    ); 
}

export default InjuredMarker;