import { useEffect, useReducer } from "react";
import { actions } from "../actions";
import { initialState, reducer } from "./reducer";
const { events, eventResponse } = require("../utils/events");
const { ipcRenderer } = window.require("electron");

export default function Provider() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const add = (payload) => {
    console.log(payload);
    ipcRenderer.send(events.variete.create, payload);

    ipcRenderer.once(eventResponse.variete.created, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
      // dispatch({ type: actions.ON_ADD, payload: data });
    });
  };
  const getOne = (payload) => {
    dispatch({ type: actions.ON_GET_ONE, payload });
    ipcRenderer.send(events.variete.getOne);

    ipcRenderer.once(eventResponse.variete.gotOne, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const getAll = () => {
    ipcRenderer.send(events.variete.getAll);

    ipcRenderer.once(eventResponse.variete.gotAll, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
      dispatch({ type: actions.ON_GET_ALL, payload: data });
    });
  };

  const update = (payload) => {
    dispatch({ type: actions.ON_UPDATE, payload });
    ipcRenderer.send(events.variete.update);

    ipcRenderer.once(eventResponse.variete.updated, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const deleteById = (payload) => {
    console.log("DELETE:", payload);
    ipcRenderer.send(events.variete.delete, payload);

    ipcRenderer.once(eventResponse.variete.deleted, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
      dispatch({ type: actions.ON_DELETE, payload });
    });
  };

  return [state, add, getOne, getAll, update, deleteById];
}
