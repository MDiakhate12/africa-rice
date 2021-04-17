import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "./Map.css";

function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

export default function Map() {
  // const position = [14.7319,-17.4572]
  const position = [14.4750607, -14.4529612];
  // const position = [37.8, -96];
  return (
    <MapContainer id="mapid" center={position} zoom={7.5} scrollWheelZoom={false}>
      <TileLayer
        // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        id="mapbox/streets-v11"
        accessToken="pk.eyJ1IjoibGlsY2hlaWtoIiwiYSI6ImNrODU5cm93bjA0MjQzZ3BqbWJtZDRkcG4ifQ.TrPm96_JjZB-0OogoZJp5A"
        
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
