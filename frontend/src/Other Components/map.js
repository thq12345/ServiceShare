import React from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";
require("dotenv").config();

const CenterRedCirclePinpoint = () => (
  <div
    style={{
      color: "white",
      background: "red",
      padding: "10px 10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)",
    }}
  >
    {"Location"}
  </div>
);

function Map(props) {
  let defaultProps = {
    center: {
      lat: props.latitude,
      lng: props.longitude,
    },
    zoom: 11,
  };
  // document.getElementsByTagName("GoogleMapReact")[0].removeAttribute("class");
  return (
    <div className={"map"} role="application">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <CenterRedCirclePinpoint lat={props.latitude} lng={props.longitude} />
      </GoogleMapReact>
    </div>
  );
}

Map.propTypes = {
  longitude: PropTypes.number,
  latitude: PropTypes.number,
};
export default Map;
