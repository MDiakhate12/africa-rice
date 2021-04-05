import React, { useEffect, useReducer } from "react";
import { actions } from "../actions";
import { initialState, reducer } from "./reducer";
const { events, eventResponse } = require("../utils/events");
const { ipcRenderer } = window.require("electron");

export default function Provider() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const add = (payload) => {
    ipcRenderer.send(events.localisation.create, payload);

    ipcRenderer.once(eventResponse.localisation.created, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
      getAll();

      // dispatch({ type: actions.ON_ADD, payload: data });
    });
  };
  const getOne = (payload) => {
    dispatch({ type: actions.ON_GET_ONE, payload });
    ipcRenderer.send(events.localisation.getOne);

    ipcRenderer.once(eventResponse.localisation.gotOne, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const getAll = () => {
    ipcRenderer.send(events.localisation.getAll);

    ipcRenderer.once(eventResponse.localisation.gotAll, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
      dispatch({ type: actions.ON_GET_ALL, payload: data });
    });
  };

  const update = (payload) => {
    dispatch({ type: actions.ON_UPDATE, payload });
    ipcRenderer.send(events.localisation.update);

    ipcRenderer.once(eventResponse.localisation.updated, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const deleteById = (payload) => {
    console.log("DELETE:", payload);
    ipcRenderer.send(events.localisation.delete, payload);

    ipcRenderer.once(eventResponse.localisation.deleted, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
      dispatch({ type: actions.ON_DELETE, payload: data });
    });
  };
  useEffect(() => {
    getAll();

    return () => {
      ipcRenderer.removeAllListeners([
        eventResponse.localisation.gotAll,
        events.localisation.getAll,
      ]);
    };
  }, []);

  return [state, add, getOne, getAll, update, deleteById];
}
