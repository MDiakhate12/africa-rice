import * as React from "react";
import { useState } from "react";
import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
  Popup,
} from "react-map-gl";
import { GlobalContext } from "../../store/GlobalProvider";
import * as senegal from "./sn.json";

import 'mapbox-gl/dist/mapbox-gl.css';

// import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';

// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";

const { ipcRenderer } = window.require("electron");

export default function Map2() {
  const { institution } = React.useContext(GlobalContext);
  const [viewport, setViewport] = useState({
    width: "80vw",
    height: "80vh",
    latitude: 14.4750607,
    longitude: -14.4529612,
    zoom: 7,
  });

  const [productionsByRegion, setProductionsByRegion] = useState([]);

  const getProductionsSumByRegion = () => {
    ipcRenderer.send("getProductionsSumByRegion", {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once("gotProductionsSumByRegion", (event, data) => {
      console.log("getProductionsSumByRegion", data);
      setProductionsByRegion(data);
    });
  };

  React.useEffect(() => {
    getProductionsSumByRegion();
    console.log(ReactMapGL);
  }, [institution]);

  const geolocateStyle = {
    top: 0,
    left: 0,
    padding: "10px",
  };

  const fullscreenControlStyle = {
    top: 36,
    left: 0,
    padding: "10px",
  };

  const navStyle = {
    top: 72,
    left: 0,
    padding: "10px",
  };

  const scaleControlStyle = {
    bottom: 36,
    left: 0,
    padding: "10px",
  };

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken="pk.eyJ1IjoibGlsY2hlaWtoIiwiYSI6ImNrODU5cm93bjA0MjQzZ3BqbWJtZDRkcG4ifQ.TrPm96_JjZB-0OogoZJp5A"
      scrollZoom={false}
      // mapStyle="mapbox://styles/lilcheikh/cknjlxaqt03p417oannirmtxm" // Dark
      // mapStyle="mapbox://styles/lilcheikh/cknjmc4st1awe18mmh54cr29r" // Navigation
      // mapStyle="mapbox://styles/lilcheikh/cknjmckc20jsl17npo19qnk83" // Satellite
      mapStyle="mapbox://styles/mapbox/streets-v11" // Satellite

    >
      {productionsByRegion.map((production) => {
        let region = senegal.cities.find(
          (c) => c.city.toLowerCase() === production.Localisation.region
        );

        if (region)
          return (
            <Popup
              key={production.Localisation.region}
              latitude={parseFloat(region.lat)}
              longitude={parseFloat(region.lng)}
            >
              <div>{production.Localisation.region.toUpperCase()}</div>
              {/* <div>{production.Localisation.village}</div> */}
              <div>{`Tot. disponible: ${production.totalQuantiteDisponible} KG`}</div>
              <div>{`Tot. produit: ${production.totalQuantiteProduite} KG`}</div>
            </Popup>
          );
        return null;
      })}

      <GeolocateControl style={geolocateStyle} />
      <FullscreenControl style={fullscreenControlStyle} />
      <NavigationControl style={navStyle} />
      <ScaleControl style={scaleControlStyle} />
    </ReactMapGL>
  );
}
