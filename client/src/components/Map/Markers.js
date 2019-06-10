import React, { Component } from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux'
import responseURL from '../../images/greenMarker.svg';
import noResponseURL from '../../images/redMarker.svg';
import noAssistanceURL from '../../images/orangeMarker.svg';
import { action_creator } from '../../core/actions/data';

class Markers extends Component {
  componentDidMount() {
    const response = this.props.action_creator()
    this.setState({ data: response })
  }
  
  render() {
    const responseIcon = L.icon({
      iconUrl: responseURL,
      iconSize: [40, 40] 
    });

    const noResponseIcon = L.icon({
      iconUrl: noResponseURL,
      iconSize: [40, 40]
    });

    const noAssistanceIcon = L.icon({
      iconUrl: noAssistanceURL,
      iconSize: [40, 40]
    });

    const filterByConnection = (data) => {
       if(data.connected) {
        return <Marker position={[data.lat, data.lon]} icon={responseIcon} key={data.ismi}>
          <Popup>
            {data.text}
          </Popup>
        </Marker>
      } else {
        return <Marker position={[data.lat, data.lon]} icon={noResponseIcon} key={data.ismi}>
          <Popup>
            {data.text}
          </Popup>
        </Marker>
      }
    }

    return (
      <div>  
      {
        this.props.data.data.map(data => filterByConnection(data))
      }
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
    action_creator: () => dispatch(action_creator())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Markers);


