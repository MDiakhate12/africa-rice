import React, { useEffect, useReducer } from "react";
import { actions } from "../actions";
import { initialState, reducer } from "./reducer";
const { events, eventResponse } = require("../utils/events");
const { ipcRenderer } = window.require("electron");

export default function Provider() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const add = (payload) => {
    dispatch({ type: actions.ON_ADD, payload });
    ipcRenderer.send(events.zoneAgroInstitution.create);

    ipcRenderer.once(eventResponse.zoneAgroInstitution.created, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };
  const getOne = (payload) => {
    dispatch({ type: actions.ON_GET_ONE, payload });
    ipcRenderer.send(events.zoneAgroInstitution.getOne);

    ipcRenderer.once(eventResponse.zoneAgroInstitution.gotOne, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const getAll = () => {
    dispatch({ type: actions.ON_GET_ALL });
    ipcRenderer.send(events.zoneAgroInstitution.getAll);

    ipcRenderer.once(eventResponse.zoneAgroInstitution.gotAll, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const update = (payload) => {
    dispatch({ type: actions.ON_UPDATE, payload });
    ipcRenderer.send(events.zoneAgroInstitution.update);

    ipcRenderer.once(eventResponse.zoneAgroInstitution.updated, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const deleteById = (payload) => {
    dispatch({ type: actions.ON_DELETE, payload });
    ipcRenderer.send(events.zoneAgroInstitution.delete);

    ipcRenderer.once(eventResponse.zoneAgroInstitution.deleted, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  return [state, add, getOne, getAll, update, deleteById];
}
