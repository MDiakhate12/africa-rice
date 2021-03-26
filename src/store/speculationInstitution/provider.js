import React, { useEffect, useReducer } from "react";
import { actions } from "../actions";
import { initialState, reducer } from "./reducer";
const { events, eventResponse } = require("../utils/events");
const { ipcRenderer } = window.require("electron");

export default function Provider() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const add = (payload) => {
    ipcRenderer.send(events.speculationInstitution.create, payload);

    ipcRenderer.on(
      eventResponse.speculationInstitution.created,
      (event, data) => {
        console.log("EVENT:", event);
        console.log("DATA:", data);
        dispatch({ type: actions.ON_ADD, payload: data });
      }
    );
  };
  const getOne = (payload) => {
    dispatch({ type: actions.ON_GET_ONE, payload });
    ipcRenderer.send(events.speculationInstitution.getOne);

    ipcRenderer.on(
      eventResponse.speculationInstitution.gotOne,
      (event, data) => {
        console.log("EVENT:", event);
        console.log("DATA:", data);
      }
    );
  };

  const getAll = () => {
    dispatch({ type: actions.ON_GET_ALL });
    ipcRenderer.send(events.speculationInstitution.getAll);

    ipcRenderer.on(
      eventResponse.speculationInstitution.gotAll,
      (event, data) => {
        console.log("EVENT:", event);
        console.log("DATA:", data);
      }
    );
  };

  const update = (payload) => {
    dispatch({ type: actions.ON_UPDATE, payload });
    ipcRenderer.send(events.speculationInstitution.update);

    ipcRenderer.on(
      eventResponse.speculationInstitution.updated,
      (event, data) => {
        console.log("EVENT:", event);
        console.log("DATA:", data);
      }
    );
  };

  const deleteById = (payload) => {
    dispatch({ type: actions.ON_DELETE, payload });
    ipcRenderer.send(events.speculationInstitution.delete);

    ipcRenderer.on(
      eventResponse.speculationInstitution.deleted,
      (event, data) => {
        console.log("EVENT:", event);
        console.log("DATA:", data);
      }
    );
  };

  return [state, add, getOne, getAll, update, deleteById];
}
