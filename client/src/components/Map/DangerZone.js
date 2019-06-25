import React from 'react';
import { Polygon } from 'react-leaflet';

const DangerZone = () => {
  const polygon = [[34.0495, -118.2312], [34.0290, -118.2267], [34.0485, -118.2560]]
  return (
      <div>
        <Polygon color="red" positions={polygon} />
      </div>  
  );  
}

export default DangerZone;




