import React from 'react';
import { Polygon } from 'react-leaflet';

const DangerZone = () => {
  const polygon = [[34.0495, -118.2312], [34.0285 , -118.2320], [34.0485, -118.2570]]
  return (
      <div>
        <Polygon color="red" positions={polygon} />
      </div>  
  );  
}

export default DangerZone;
