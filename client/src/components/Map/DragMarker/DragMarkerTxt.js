// import React, { Component } from 'react';
// import DragMarker from './DragMarker';
// import { Popup } from 'react-leaflet';

// class DragMarkerTxt extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             currentPos: null
//         };
//     };
    
    
//     render() {
//         console.log(this.props.handleClick)
//         return (
//             <div>
//             {
//             this.state.currentPos && <DragMarker position={this.state.currentPos}>
//                 <Popup position={this.state.currentPos}>
//                     <div className="text-popup">
//                     <span>
//                         Current location: 
//                         <pre>{`Latitude: ${this.state.currentPos.lat}`}</pre>
//                         <pre>{`Longitude: ${this.state.currentPos.lng}`}</pre> 
//                     </span>
//                     </div>
//                 </Popup>
//             </DragMarker>
//             }
//             </div>
//         )
//     }
// }

// export default DragMarkerTxt;