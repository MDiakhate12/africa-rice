import React, { useEffect, useReducer } from "react";
import { actions } from "../actions";
import { initialState, reducer } from "./reducer";
const { events, eventResponse } = require("../utils/events");
const { ipcRenderer } = window.require("electron");

export default function Provider() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const add = (payload) => {
    dispatch({ type: actions.ON_ADD, payload });
    ipcRenderer.send(events.client.create);

    ipcRenderer.once(eventResponse.client.created, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };
  const getOne = (payload) => {
    dispatch({ type: actions.ON_GET_ONE, payload });
    ipcRenderer.send(events.client.getOne);

    ipcRenderer.once(eventResponse.client.gotOne, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const getAll = () => {
    dispatch({ type: actions.ON_GET_ALL });
    ipcRenderer.send(events.client.getAll);

    ipcRenderer.once(eventResponse.client.gotAll, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const update = (payload) => {
    dispatch({ type: actions.ON_UPDATE, payload });
    ipcRenderer.send(events.client.update);

    ipcRenderer.once(eventResponse.client.updated, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const deleteById = (payload) => {
    console.log('DELETE:', payload)
    ipcRenderer.send(events.client.delete, payload)

    ipcRenderer.once(
      eventResponse.client.deleted,
      (event, data) => {
        console.log('EVENT:', event)
        console.log('DATA:', data)
        dispatch({ type: actions.ON_DELETE, payload })
      },
    )
  };

  return [state, add, getOne, getAll, update, deleteById];
}
