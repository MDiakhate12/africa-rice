import React, { useEffect, useReducer } from "react";
import { actions } from "../actions";
import { initialState, reducer } from "./reducer";
const { events, eventResponse } = require("../utils/events");
const { ipcRenderer } = window.require("electron");

export default function Provider() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const add = (payload) => {
    dispatch({ type: actions.ON_ADD, payload });
    ipcRenderer.send(events.varieteInstitution.create);

    ipcRenderer.on(eventResponse.varieteInstitution.created, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };
  const getOne = (payload) => {
    dispatch({ type: actions.ON_GET_ONE, payload });
    ipcRenderer.send(events.varieteInstitution.getOne);

    ipcRenderer.on(eventResponse.varieteInstitution.gotOne, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const getAll = () => {
    dispatch({ type: actions.ON_GET_ALL });
    ipcRenderer.send(events.varieteInstitution.getAll);

    ipcRenderer.on(eventResponse.varieteInstitution.gotAll, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const update = (payload) => {
    dispatch({ type: actions.ON_UPDATE, payload });
    ipcRenderer.send(events.varieteInstitution.update);

    ipcRenderer.on(eventResponse.varieteInstitution.updated, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const deleteById = (payload) => {
    dispatch({ type: actions.ON_DELETE, payload });
    ipcRenderer.send(events.varieteInstitution.delete);

    ipcRenderer.on(eventResponse.varieteInstitution.deleted, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  return [state, add, getOne, getAll, update, deleteById];
}
