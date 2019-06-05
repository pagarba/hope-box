import React, { Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import connectedURL from './images/greenMarker.svg';
import assistanceURL from './images/redMarker.svg';
import noAssistanceURL from './images/orangeMarker.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props) 
      this.state = {
        connectedData: [{id: 1, lat: 51.4969, lon: -0.087, text: 'device is connected'}, {id: 2, lat: 51.496, lon: -0.096, text: 'connected!'}],
        assistanceData: [{id: 1, lat: 51.50, lon: -0.08, text: 'Need Help'}, {id: 2, lat: 51.5, lon: -0.096, text: 'Assistance'}],
        noAssistanceData: [{id: 1, lat: 51.51, lon: -0.09, text: 'no assistance needed'}, {id: 2, lat: 51.5, lon: -0.095, text: 'no help needed'}]
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

    const position = [51.505, -0.09];
    return (
      <Map className="map" center={position} zoom={13}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          this.state.connectedData.map(coordinate => (<Marker position={[coordinate.lat, coordinate.lon]} icon={connectedIcon} key={coordinate.id}>
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
      </Map>
    );
  }
  
}

export default App;
