import React from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import draggableURL from '../../../images/blackMarker.svg';

const DraggableMarker = (props) =>  {
    const draggableIcon = L.icon({
        iconUrl: draggableURL,
        iconSize: [40, 40]
    });

    const initMarker = ref => {
        if (ref) {
            ref.leafletElement.openPopup()
        }
    }

    return(
        <Marker icon={draggableIcon} ref={initMarker} {...props}>
        </Marker>
    ); 
}

export default DraggableMarker;