import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import Markers from './Markers';
import Sidebar from './Sidebar';
import { connect } from 'react-redux';
import './styles/StreetMap.css';

class StreetMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: [51.505, -0.09]
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data.coordinates.lat !== prevProps.data.coordinates.lat) {
      this.setState({ position: this.props.data.coordinates })
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="map">
        <Map className="map" center={this.state.position} zoom={19}>
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
}

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

export default connect(mapStateToProps)(StreetMap);
