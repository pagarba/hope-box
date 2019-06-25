import React, { Component } from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import noAssistURL from '../../images/greenMarker.svg';
import assistURL from '../../images/redMarker.svg'
import { fetchData } from '../../core/actions/data';

class Markers extends Component {  
  render() {
    const noAssistIcon = L.icon({
      iconUrl: noAssistURL,
      iconSize: [40, 40] 
    });

    const assistIcon = L.icon({
      iconUrl: assistURL,
      iconSize: [40, 40]
    });

    const filterByConnection = (data) => {
      if (data.assistance === true) {
         return <Marker position={[parseFloat(data.lat), parseFloat(data.lon)]} icon={assistIcon} key={data.imsi}>
          <Popup>
          <span>{data.message}</span>  
          </Popup>
        </Marker>
      } else {
        return <Marker position={[parseFloat(data.lat), parseFloat(data.lon)]} icon={noAssistIcon} key={data.imsi}>
          <Popup>
          <span>{data.message}</span>  
          </Popup>
        </Marker>
      }
       
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


