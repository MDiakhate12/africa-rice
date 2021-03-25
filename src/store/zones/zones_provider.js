import React, { useEffect, useReducer } from "react";
import {
  allZonesInitialState,
  allZonesReducer,
  zonesInitialState,
  zonesReducer,
} from "./zones_reducers";

export default function ZoneProvider() {
  const [zones, zonesDispatch] = useReducer(zonesReducer, zonesInitialState);

  const [allZones, allZonesDispatch] = useReducer(
    allZonesReducer,
    allZonesInitialState
  );
  
  return [zones, allZones];
}
