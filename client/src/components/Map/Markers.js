import React, { Component } from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux'
import connectedURL from '../../images/greenMarker.svg';
import assistanceURL from '../../images/redMarker.svg';
import noAssistanceURL from '../../images/orangeMarker.svg';
import { action_creator } from '../../core/actions/coordinates';

class Markers extends Component {
  componentDidMount() {
    const response = this.props.action_creator()
    this.setState({ data: response })
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

    return (
      <div>  
      {
        this.props.data.data.map(coordinate => (
          <Marker position={[coordinate.lat, coordinate.lon]} icon={connectedIcon} key={coordinate.ismi}>
            <Popup>
              {coordinate.text}
            </Popup>
          </Marker>)
        )
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


