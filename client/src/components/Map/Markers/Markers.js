import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import InjuredMarker from './InjuredMarker';
import UnharmedMarker from './UnharmedMarker';
import AssistanceMarker from './AssistanceMarker';
import { fetchData } from '../../../core/actions/data';
import 'react-leaflet-markercluster/dist/styles.min.css';

class Markers extends Component {  
  async componentDidMount() {
    const response = await this.props.fetchData()
    this.setState({ data: response })
  }
  
  
  render() {
    return (
      <div>
        <MarkerClusterGroup spiderLegPolylineOptions={{
          weight: 0,
          opacity: 0,
        }}>
        {
          this.props.data.data.forEach(data => {
            if (data.status === 'injured') {
              return <InjuredMarker data={data}  key={data.imsi}/>
            } else if (data.status === 'unharmed') {
              return <UnharmedMarker data={data}  key={data.imsi}/>
            } else if (data.status === 'assistance') {
              return <AssistanceMarker data={data}  key={data.imsi}/>
            }
          })
        }
        </MarkerClusterGroup>  
      
      </div>
    );
  };
};

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


