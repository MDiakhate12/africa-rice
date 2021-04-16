import * as React from "react";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as senegal from "./sn.json";
import PinDropIcon from "@material-ui/icons/PinDrop";

// import "mapbox-gl/dist/mapbox-gl.css";

import { IconButton } from "@material-ui/core";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

export default function Map2() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 14.4750607,
    longitude: -14.4529612,
    zoom: 7,
  });

  const [productionsByVariete, setProductionsByVariete] = useState([]);

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

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken="pk.eyJ1IjoibGlsY2hlaWtoIiwiYSI6ImNrODU5cm93bjA0MjQzZ3BqbWJtZDRkcG4ifQ.TrPm96_JjZB-0OogoZJp5A"
      // scrollZoom={false}
      // mapStyle="mapbox://styles/lilcheikh/cknjlxaqt03p417oannirmtxm" // Dark
      // mapStyle="mapbox://styles/lilcheikh/cknjmc4st1awe18mmh54cr29r" // Navigation
      mapStyle="mapbox://styles/lilcheikh/cknjmckc20jsl17npo19qnk83" // Satellite
    >
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
                latitude={parseFloat(senegal.cities[index].lat)}
                longitude={parseFloat(senegal.cities[index].lng)}
              >
                <IconButton>
                  <PinDropIcon fontSize="large" color="secondary" />
                </IconButton>
              </Marker>
              <Popup
                key={production.VarieteInstitution.varieteId}
                latitude={parseFloat(senegal.cities[index].lat)}
                longitude={parseFloat(senegal.cities[index].lng)}
              >
                <div>
                  {`Département: ${production.Localisation.departement}`}
                </div>
                <div>{`Localité: ${production.Localisation.village}`}</div>
                <div>{`Varété: ${production.VarieteInstitution.Variete.nomVariete}`}</div>
                <div>{`Total produit: ${production.totalQuantiteProduite} KG`}</div>
              </Popup>
            </>
          );
        } else {
          return null;
        }
      })}
    </ReactMapGL>
  );
}
