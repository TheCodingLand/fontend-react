
import * as React from 'react';

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"

import mydata from './lux_postcode.topo.json'
import myData from './data.json';
//try mapboxgl
 //"/path/to/your/topojson-map-file.json or geography object"
export default class MapPanel extends React.Component {
  render() {
    return(
      <div>
        <ComposableMap>
          <ZoomableGroup>
          <Geographies geography= "/public/lux_postcode.topo.json" >
            {(geographies, projection) => geographies.map(geography => (
              <Geography
                key={ geography.id }
                geography={ geography }
                projection={ projection }
                />
            ))}
          </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}
 

