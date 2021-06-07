import { useEffect, useReducer } from "react";
import { actions } from "../actions";
import { initialState, reducer } from "./reducer";
const { events, eventResponse } = require("../utils/events");
const { ipcRenderer } = window.require("electron");




export default function Provider() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const add = (payload) => {
    dispatch({ type: actions.ON_ADD, payload });
    ipcRenderer.send(events.zoneAgro.create);

    ipcRenderer.once(eventResponse.zoneAgro.created, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };
  const getOne = (payload) => {
    dispatch({ type: actions.ON_GET_ONE, payload });
    ipcRenderer.send(events.zoneAgro.getOne);

    ipcRenderer.once(eventResponse.zoneAgro.gotOne, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const getAll = () => {
    ipcRenderer.send(events.zoneAgro.getAll);

    ipcRenderer.once(eventResponse.zoneAgro.gotAll, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
      dispatch({ type: actions.ON_GET_ALL, payload: data });
    });
  };

  const update = (payload) => {
    dispatch({ type: actions.ON_UPDATE, payload });
    ipcRenderer.send(events.zoneAgro.update);

    ipcRenderer.once(eventResponse.zoneAgro.updated, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const deleteById = (payload) => {
    dispatch({ type: actions.ON_DELETE, payload });
    ipcRenderer.send(events.zoneAgro.delete);

    ipcRenderer.once(eventResponse.zoneAgro.deleted, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  return [state, add, getOne, getAll, update, deleteById];
}
