import React, { useEffect, useReducer } from "react";
import { actions } from "../actions";
import { initialState, reducer } from "./reducer";
const { events, eventResponse } = require("../utils/events");
const { ipcRenderer } = window.require("electron");

export default function Provider() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const add = (payload) => {
    console.log(payload)
    ipcRenderer.send(events.magasin.create, payload);

    ipcRenderer.once(eventResponse.magasin.created, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
      getAll();

      // dispatch({ type: actions.ON_ADD, payload: data });
    });
  };
  const getOne = (payload) => {
    dispatch({ type: actions.ON_GET_ONE, payload });
    ipcRenderer.send(events.magasin.getOne);

    ipcRenderer.once(eventResponse.magasin.gotOne, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const getAll = () => {
    ipcRenderer.send(events.magasin.getAll);

    ipcRenderer.once(eventResponse.magasin.gotAll, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
      dispatch({ type: actions.ON_GET_ALL, payload: data });
    });
  };

  const update = (payload) => {
    dispatch({ type: actions.ON_UPDATE, payload });
    ipcRenderer.send(events.magasin.update);

    ipcRenderer.once(eventResponse.magasin.updated, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const deleteById = (payload) => {
    console.log("DELETE:", payload)
    ipcRenderer.send(events.magasin.delete, payload);

    ipcRenderer.once(eventResponse.magasin.deleted, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
      dispatch({ type: actions.ON_DELETE, payload: data });
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  return [state, add, getOne, getAll, update, deleteById];
}
