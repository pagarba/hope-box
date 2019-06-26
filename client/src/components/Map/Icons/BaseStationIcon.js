import React from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import basStationURL from '../../../images/wifiIcon.svg' 

const BaseStationIcon = (props) => {
    const baseStationIcon = L.icon({
        iconUrl: basStationURL,
        iconSize: [40, 40]
    });
    
    return(
        <Marker position={[parseFloat(props.icon.lat), parseFloat(props.icon.lon)]} icon={baseStationIcon}>
          <Popup>
            <span>{props.icon.message}</span>  
          </Popup>
        </Marker>
    )
}

export default BaseStationIcon;