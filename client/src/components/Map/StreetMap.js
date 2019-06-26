import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import Markers from './Markers/Markers';
import Sidebar from './Sidebar';
import Icons from './Icons/Icons';
// import DangerZone from './DangerZone';
import Toggle from './Toggle';
import { connect } from 'react-redux';
import './styles/StreetMap.css';


class StreetMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: [ 51.505, -0.09 ],
      zoom: null
    };
  };

  async componentDidMount() {
      let response = await fetch('https://ipapi.co/json')
      let position = await response.json()
      this.setState({ position: [position.latitude, position.longitude], zoom: 15})
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data.coordinates !== prevProps.data.coordinates) {
      this.setState({ position: [this.props.data.coordinates.lat, this.props.data.coordinates.lon], zoom: 18})
    }
  };

  render() {
    return (
      <div className="map">
        <Map className="map" center={this.state.position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Markers />
          <Icons />
          <div className="toggle">
            <Toggle />
          </div>
        </Map>   
        
        <Sidebar className="card"/>
      </div>   
    );
  };
};

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

export default connect(mapStateToProps)(StreetMap);
