import React, { useEffect, useReducer } from "react";
import {
  allSpeculationInitialState,
  allSpeculationReducer,
  speculationInitialState,
  speculationReducer,
} from "./speculations_reducers";

export default function SpeculationProvider() {
  const [speculations, speculationDispatch] = useReducer(
    speculationReducer,
    speculationInitialState
  );

  const [allSpeculations, allSpeculationDispatch] = useReducer(
    allSpeculationReducer,
    allSpeculationInitialState
  );


  useEffect(() => {
    console.log(speculations);
  }, []);

  return [speculations, allSpeculations];
}
