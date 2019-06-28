import React from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import unharmedURL from '../../../images/blueMarker.svg';

const UnharmedMarker = (props) =>  {
    const unharmedIcon = L.icon({
        iconUrl: unharmedURL,
        iconSize: [40, 40]
    });

    return(
        <Marker position={[parseFloat(props.data.lat), parseFloat(props.data.lon)]} icon={unharmedIcon}>
          <Popup>
            <span>{props.data.message}</span>  
          </Popup>
        </Marker>
    ); 
}

export default UnharmedMarker;