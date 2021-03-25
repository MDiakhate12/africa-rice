import { useEffect, useReducer } from "react";
import {
  varietesReducer,
  varietesInitialState,
  allVarietesReducer,
  allVarietesInitialState,
} from "./varietes_reducers";
const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../utils/events");

export default function VarieteProvider() {
  const [varietes, varietesDispatch] = useReducer(
    varietesReducer,
    varietesInitialState
  );
  const [allVarietes, allVarietesDispatch] = useReducer(
    allVarietesReducer,
    allVarietesInitialState
  );

  const addVariete = (payload) => {
    console.log("PAYLOAD:", payload);
    console.log("VARIETE:", varietes);

    // ipcRenderer.send(events.varieteInstitution.create, payload);

    // ipcRenderer.on(eventResponse.varieteInstitution.created, (event, data) => {
    //   console.log(data);
    // });
    varietesDispatch({ type: "ON_ADD_VARIETE", payload });
    return;
  };

  const getAllVarietes = () => {
    console.log("DIAAAF");
    console.log(ipcRenderer);
    ipcRenderer.send(events.variete.getAll, {});
    console.log("DIAAAF");
  };

  // ipcRenderer.on(eventResponse.variete.gotAll, (e, data) => {
  //   console.log("EVENT", e);
  //   console.log("DATA", data);
  // });

  // useEffect(() => {
  //   getAllVarietes();
  // });

  return [varietes, allVarietes, addVariete];
}
