
import React from 'react'

import 'leaflet/dist/leaflet'
import './LeafletMap.css'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'

export default class LeafletMap extends React.Component {
  getColor = id => {
    const colorsMap = {
      '0': 'gray',
      '1': 'red',
      '2': 'orange',
      '3': 'yellow',
      '4': 'cyan',
      '5': 'green',
    }

    return colorsMap[id]
  }

  getIcon = (data, type) => {
    if (!data || typeof(data) !== 'object' || !type) return 'images/marker-clear.png'

    const iconMap = {
      'responders': 'images/responders.png',
      'stations': 'images/stations.png',
      'users': `images/marker-${this.getColor(data.esi)}.png`,
    }

    return iconMap.hasOwnProperty(type) ? iconMap[type] : 'images/marker-clear.png'
  }

  render() {
    return (
      <Map
        center={[this.props.position[0] + 0.004, this.props.position[1]]}
        style={{height: '80vh'}}
        zoom={this.props.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="#">Pagarba</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          icon={L.icon({
            iconUrl: 'images/cc.png',
            iconSize: [32, 32],
          })}
          position={this.props.position}
          zIndexOffset={1000}>
          <Popup>Command Center</Popup>
        </Marker>
        {this.props.markers
          .filter(m => m && m.data && m.data.id)
          .map(m => (
            <Marker
              {...m.props}
              icon={L.icon({
                iconUrl: this.getIcon(m.data, m.type),
                iconSize: [24, 24],
              })}
              key={`${m.type}-${m.data.id}`} >
              <Popup>{m.popup}</Popup>
            </Marker>
          )
        )}
      </Map>
    )
  }
}
