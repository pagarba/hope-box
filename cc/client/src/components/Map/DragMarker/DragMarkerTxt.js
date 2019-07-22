import React, { Component } from 'react';
import DragMarker from './DragMarker';
import IconModal from '../IconModal';
import { Popup } from 'react-leaflet';

class DragMarkerTxt extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPos: null
        };
    };
    
    render() {
        return (
            <div>
                {
                this.props.currentPos && <DragMarker position={this.props.currentPos}>
                    <Popup position={this.props.currentPos}>
                        <div className="text-popup">
                            <span>
                                Current location: 
                                <pre>{`Latitude: ${this.props.currentPos.lat}`}</pre>
                                <pre>{`Longitude: ${this.props.currentPos.lng}`}</pre> 
                            </span>
                            <IconModal />
                        </div>
                    </Popup>
                </DragMarker>
                }
            </div>
        )
    }
}

export default DragMarkerTxt;