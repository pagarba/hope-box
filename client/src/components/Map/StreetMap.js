import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import Markers from './Markers';
import Sidebar from './Sidebar'
import './styles/StreetMap.css';

const StreetMap = () => {
  const position = [51.505, -0.09];
  return (
      <div className="map">
        <Map className="map" center={position} zoom={13}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Markers />
        </Map>   
        <Sidebar className="card"/>
      </div>
       
  );
}

export default StreetMap;
