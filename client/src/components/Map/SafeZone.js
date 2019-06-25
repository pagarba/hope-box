import React from 'react';
import { Polygon } from 'react-leaflet';

const SafeZone = () => {
    const polygon = [[34.0500, -118.2288], [34.0329, -118.2260], [34.0401, -118.2165]]
    return (
        <div>
            <Polygon color="blue" positions={polygon} />
        </div>  
    );    
}

export default SafeZone;