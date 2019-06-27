import React from 'react';
import { Polygon } from 'react-leaflet';

const DangerZone = () => {
  const polygon = [[34.047503, -118.254586], [34.049778, -118.252473], [34.045315, -118.248207]]
  const polygon2 = [[34.049201, -118.242055], [34.045703, -118.246565], [34.045288, -118.236223]]
  const polygon3 = [[34.042921, -118.240710], [34.044672, -118.232507], [34.038746, -118.232626]]
  const polygon4 = [[34.036043, -118.233088], [34.030346, -118.230007], [34.035580, -118.228921]]
  return (
      <div>
        <Polygon color="red" positions={polygon} />
        <Polygon color="red" positions={polygon2} />
        <Polygon color="red" positions={polygon3} />
        <Polygon color="red" positions={polygon4} />
      </div>  
  );  
}

export default DangerZone;




