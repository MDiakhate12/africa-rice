import * as React from 'react'
import { useState } from 'react'
import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from 'react-map-gl'
import { GlobalContext } from '../../store/GlobalProvider'
import * as senegal from './sn.json'
import PinDropIcon from '@material-ui/icons/PinDrop'

// import "mapbox-gl/dist/mapbox-gl.css";

import { IconButton } from '@material-ui/core'

const { ipcRenderer } = window.require('electron')
const { events, eventResponse } = require('../../store/utils/events')

export default function Map2() {
  const { institution } = React.useContext(GlobalContext)
  const [viewport, setViewport] = useState({
    width: '80vw',
    height: '80vh',
    latitude: 14.4750607,
    longitude: -14.4529612,
    zoom: 6,
  })

  const [productionsByRegion, setProductionsByRegion] = useState([])

  const getProductionsSumByRegion = () => {
    ipcRenderer.send('getProductionsSumByRegion', {
      institutionId: institution?.idInstitution,
    })
    ipcRenderer.once('gotProductionsSumByRegion', (event, data) => {
      console.log('getProductionsSumByRegion', data)
      setProductionsByRegion(data)
    })
  }

  React.useEffect(() => {
    getProductionsSumByRegion()
  }, [institution])

  const [selectedRegion, setSelectedRegion] = useState()

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken="pk.eyJ1IjoibGlsY2hlaWtoIiwiYSI6ImNrODU5cm93bjA0MjQzZ3BqbWJtZDRkcG4ifQ.TrPm96_JjZB-0OogoZJp5A"
      scrollZoom={false}
      // mapStyle="mapbox://styles/lilcheikh/cknjlxaqt03p417oannirmtxm" // Dark
      // mapStyle="mapbox://styles/lilcheikh/cknjmc4st1awe18mmh54cr29r" // Navigation
      mapStyle="mapbox://styles/lilcheikh/cknjmckc20jsl17npo19qnk83" // Satellite
    >
      {productionsByRegion.map((production) => {
        let region = senegal.cities.find(
          (c) => c.city.toLowerCase() === production.Localisation.region,
        )

        if (region)
          return (
            <Popup
              key={production.Localisation.region}
              latitude={parseFloat(region.lat)}
              longitude={parseFloat(region.lng)}
            >
              <div>{production.Localisation.region.toUpperCase()}</div>
              {/* <div>{`Département: ${production.Localisation.departement}`}</div>
              <div>{`Localité: ${production.Localisation.village}`}</div>
              <div>{`Varété: ${production.VarieteInstitution.Variete.nomVariete}`}</div> */}
              <div>{`Tot. disponible: ${production.totalQuantiteDisponible} KG`}</div>
              <div>{`Tot. produit: ${production.totalQuantiteProduite} KG`}</div>
            </Popup>
          )
        return null
      })}
      {/* {productionsByVariete.map((production) => {
        let region = production.Localisation.region;

        let city = senegal.cities.find((c) => c.city.toLowerCase() === region);

        if (city) {
          return (
            <>
              <Marker
                key={production.idProduction}
                latitude={parseFloat(city.lat)}
                longitude={parseFloat(city.lng)}
              >
                <IconButton>
                  <PinDropIcon
                    fontSize="large"
                    color="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedRegion(city)
                    }}
                  />
                </IconButton>
              </Marker>
            </>
          );
        } else {
          return null;
        }
      })}

      {selectedRegion && (
        <Popup
          key={production.VarieteInstitution.varieteId}
          latitude={parseFloat(senegal.cities[index].lat)}
          longitude={parseFloat(senegal.cities[index].lng)}
        >
          <div>{`Région: ${production.Localisation.region}`}</div>
          <div>{`Département: ${production.Localisation.departement}`}</div>
          <div>{`Localité: ${production.Localisation.village}`}</div>
          <div>{`Varété: ${production.VarieteInstitution.Variete.nomVariete}`}</div>
          <div>{`Total produit: ${production.totalQuantiteProduite} KG`}</div>
        </Popup>
      )} */}

      <NavigationControl
        style={{
          top: 10,
          left: 10,
        }}
      />
      <GeolocateControl
        style={{
          bottom: 10,
          right: 10,
        }}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        auto
      />
      <FullscreenControl
        style={{
          top: 10,
          right: 10,
        }}
      />
    </ReactMapGL>
  )
}
