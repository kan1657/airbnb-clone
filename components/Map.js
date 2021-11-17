import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";
const Map = ({ searchResults }) => {
  const [selectedLocation, setSelectedLocation] = useState({});

  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 10,
  });

  console.log(selectedLocation);
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
            longitude={res.long}
            latitude={res.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              onClick={() => setSelectedLocation(res)}
              aria-label="push-pin"
              role="img"
              className="cursor-pointer text-2xl animate-bounce"
            >
              📌
            </p>
          </Marker>

          {/* The popup that should show if we click on a Marker */}
          {selectedLocation.long === res.long ? (
            <Popup
              closeOnClick={true}
              onClose={() => setSelectedLocation({})}
              latitude={res.lat}
              longitude={res.long}
            >
              {res.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
