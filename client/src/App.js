import React, { Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import connectedURL from './images/greenMarker.svg';
import assistanceURL from './images/redMarker.svg';
import noAssistanceURL from './images/orangeMarker.svg';
import './App.css';

class App extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
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

    const position = [this.state.lat, this.state.lng];
    return (
      <Map className="map" center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={connectedIcon}>
          <Popup>
            Connected!
          </Popup>
        </Marker>
        <Marker position={[51.505, -0.08]} icon={assistanceIcon}>
          <Popup>
            Assitance Needed!
          </Popup>
        </Marker>
        <Marker position={[51.505, -0.07]} icon={noAssistanceIcon}>
          <Popup>
            Assistance not needed!
          </Popup>
        </Marker>
      </Map>
    );
  }
  
}

export default App;
