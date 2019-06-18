import React, { Component } from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import responseURL from '../../images/greenMarker.svg';
import { fetchData } from '../../core/actions/data';

class Markers extends Component {
  componentDidMount() {
    const response = this.props.fetchData();
    this.setState({ data: response });
  }
  
  render() {
    const responseIcon = L.icon({
      iconUrl: responseURL,
      iconSize: [40, 40] 
    });

    const filterByConnection = (data) => {
        return <Marker position={[data.coord.lat, data.coord.lon]} icon={responseIcon} key={data.ismi}>
          <Popup>
            {data.text}
          </Popup>
        </Marker>
    }
    return (
      <div>
        <MarkerClusterGroup spiderLegPolylineOptions={{
          weight: 0,
          opacity: 0,
        }}>
          {
            this.props.data.data.map(data => filterByConnection(data))
          }
        </MarkerClusterGroup>  
      
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {
    data: state.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Markers);


