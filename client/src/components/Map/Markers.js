import React, { Component } from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import connectedURL from '../../images/greenMarker.svg';
import assistanceURL from '../../images/redMarker.svg';
import noAssistanceURL from '../../images/orangeMarker.svg';

class Markers extends Component {
  constructor(props) {
    super(props) 
      this.state = {
        connectedData: [{id: 1, lat: 51.4969, lon: -0.087, text: 'device is connected'}, {id: 2, lat: 51.496, lon: -0.096, text: 'connected!'}],
        assistanceData: [{id: 1, lat: 51.50, lon: -0.08, text: 'Need Help'}, {id: 2, lat: 51.5, lon: -0.096, text: 'Assistance'}],
        noAssistanceData: [{id: 1, lat: 51.503, lon: -0.09, text: 'no assistance needed'}, {id: 2, lat: 51.5, lon: -0.095, text: 'no help needed'}]
      }
  }
  
  render() {
    const connectedIcon = L.icon({
      iconUrl: connectedURL,
      iconSize: [40, 40] 
    });

    const assistanceIcon = L.icon({
      iconUrl: assistanceURL,
      iconSize: [40, 40]
    });

    const noAssistanceIcon = L.icon({
      iconUrl: noAssistanceURL,
      iconSize: [40, 40]
    });
    return (
      <div>
      {
          this.state.connectedData.map(coordinate => (
            <Marker position={[coordinate.lat, coordinate.lon]} icon={connectedIcon} key={coordinate.id}>
              <Popup>
                {coordinate.text}
              </Popup>
            </Marker>)
        )
      }
        {
          this.state.assistanceData.map(coordinate => (
            (<Marker position={[coordinate.lat, coordinate.lon]} icon={assistanceIcon} key={coordinate.id}>
              <Popup>
                {coordinate.text}
              </Popup>
            </Marker>)
        ))
      }
        {
          this.state.noAssistanceData.map(coordinate => (
            (<Marker position={[coordinate.lat, coordinate.lon]} icon={noAssistanceIcon} key={coordinate.id}>
              <Popup>
                {coordinate.text}
              </Popup>
            </Marker>)
        ))
      }
      </div>
    );
  }
  
}

export default Markers;