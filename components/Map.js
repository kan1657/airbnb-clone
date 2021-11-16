import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";
const Map = ({ searchResults }) => {
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longtitude,
    zoom: 10,
  });

  console.log(center);
  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/kan1657/ckvunbajt1to814nmomg3hfs9"
      mapboxApiAccessToken={process.env.mapbox_key}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((res) => (
        <div key={res.long}>
          <Marker
            longtitude={res.long}
            latitude={res.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p className="cursor-pointer text-2xl animate-bounce">📌</p>
          </Marker>
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
