import React, { useEffect, useReducer } from "react";
import { actions } from "../actions";
import { initialState, reducer } from "./reducer";
const { events, eventResponse } = require("../utils/events");
const { ipcRenderer } = window.require("electron");

export default function Provider() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const add = (payload) => {
    dispatch({ type: actions.ON_ADD, payload });
    ipcRenderer.send(events.speculation.create);

    ipcRenderer.once(eventResponse.speculation.created, (event, data) => {
      // console.log("EVENT:", event);
      console.log("DATA SPECULATION:", data);
    });
  };
  const getOne = (payload) => {
    dispatch({ type: actions.ON_GET_ONE, payload });
    ipcRenderer.send(events.speculation.getOne);

    ipcRenderer.once(eventResponse.speculation.gotOne, (event, data) => {
      // console.log("EVENT:", event);
      console.log("DATA SPECULATION:", data);
    });
  };

  const getAll = () => {
    ipcRenderer.send(events.speculation.getAll);

    ipcRenderer.once(eventResponse.speculation.gotAll, (event, data) => {
      // console.log("EVENT:", event);
      console.log("DATA SPECULATION:", data);
      dispatch({ type: actions.ON_GET_ALL, payload: data });
    });
  };

  const update = (payload) => {
    dispatch({ type: actions.ON_UPDATE, payload });
    ipcRenderer.send(events.speculation.update);

    ipcRenderer.once(eventResponse.speculation.updated, (event, data) => {
      // console.log("EVENT:", event);
      console.log("DATA SPECULATION:", data);
    });
  };

  const deleteById = (payload) => {
    dispatch({ type: actions.ON_DELETE, payload });
    ipcRenderer.send(events.speculation.delete);

    ipcRenderer.once(eventResponse.speculation.deleted, (event, data) => {
      // console.log("EVENT:", event);
      console.log("DATA SPECULATION:", data);
    });
  };
  useEffect(() => {
    getAll();

    return () => {
      ipcRenderer.removeAllListeners([
        eventResponse.speculation.gotAll,
        events.speculation.getAll,
      ]);
    };
  }, []);

  return [state, add, getOne, getAll, update, deleteById];
}
