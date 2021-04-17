import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "./Map.css";

import * as senegal from "./sn.json";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

export default function Map() {
  const [productionsByVariete, setProductionsByVariete] = React.useState([]);

  const getProductionsSumByVarietes = () => {
    ipcRenderer.send("getByVarietes");
    ipcRenderer.once("gotByVarietes", (event, data) => {
      console.log(data);
      setProductionsByVariete(data);
    });
  };

  React.useEffect(() => {
    getProductionsSumByVarietes();
  }, []);

  // const position = [14.7319,-17.4572]
  const position = [14.4750607, -14.4529612];
  // const position = [37.8, -96];
  return (
    <MapContainer
      id="mapid"
      center={position}
      zoom={7.5}
      scrollWheelZoom={false}
    >
      <TileLayer
        // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        id="mapbox/streets-v11"
        accessToken="pk.eyJ1IjoibGlsY2hlaWtoIiwiYSI6ImNrODU5cm93bjA0MjQzZ3BqbWJtZDRkcG4ifQ.TrPm96_JjZB-0OogoZJp5A"
      />
      {productionsByVariete.map((production) => {
        let region = production.Localisation.region;

        let index = senegal.cities
          .map((location) => location.city.toLowerCase())
          .indexOf(region.toLowerCase());

        if (index > -1) {
          console.log(index);
          console.log(parseFloat(senegal.cities[index].lat));
          console.log(parseFloat(senegal.cities[index].lng));
          return (
            <>
              <Marker
                key={production.VarieteInstitution.varieteId}
                position={[
                  parseFloat(senegal.cities[index].lat),
                  parseFloat(senegal.cities[index].lng),
                ]}
              >
                <Popup>
                  <div>
                    {`Département: ${production.Localisation.departement}`}
                  </div>
                  <div>{`Localité: ${production.Localisation.village}`}</div>
                  <div>{`Varété: ${production.VarieteInstitution.Variete.nomVariete}`}</div>
                  <div>{`Total produit: ${production.totalQuantiteProduite} KG`}</div>
                </Popup>{" "}
              </Marker>
            </>
          );
        } else {
          return null;
        }
      })}
    </MapContainer>
  );
}
