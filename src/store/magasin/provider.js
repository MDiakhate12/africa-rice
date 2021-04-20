import React, { createContext, useEffect, useReducer } from "react";
import { actions } from "../actions";
import { initialState, reducer } from "./reducer";
const { events, eventResponse } = require("../utils/events");
const { ipcRenderer } = window.require("electron");

export const MagasinContext = createContext();

export default function MagasinProvider({ children }) {
  const [magasins, dispatch] = useReducer(reducer, initialState);

  const addMagasin = (payload) => {
    console.log(payload);
    ipcRenderer.send(events.magasin.create, payload);

    ipcRenderer.once(eventResponse.magasin.created, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
      getAllMagasin();

      // dispatch({ type: actions.ON_ADD, payload: data });
    });
  };
  const getOneMagasin = (payload) => {
    dispatch({ type: actions.ON_GET_ONE, payload });
    ipcRenderer.send(events.magasin.getOne);

    ipcRenderer.once(eventResponse.magasin.gotOne, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const getAllMagasin = (params) => {
    ipcRenderer.send(events.magasin.getAll, params);

    ipcRenderer.once(eventResponse.magasin.gotAll, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
      dispatch({ type: actions.ON_GET_ALL, payload: data });
    });
  };

  const updateMagasin = (payload) => {
    dispatch({ type: actions.ON_UPDATE, payload });
    ipcRenderer.send(events.magasin.update);

    ipcRenderer.once(eventResponse.magasin.updated, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const deleteByIdMagasin = (payload) => {
    console.log("DELETE:", payload);
    ipcRenderer.send(events.magasin.delete, payload);

    ipcRenderer.once(eventResponse.magasin.deleted, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
      dispatch({ type: actions.ON_DELETE, payload: payload });
    });
  };

  // return [magasin, add, getOne, getAll, update, deleteById];

  return (
    <MagasinContext.Provider
      value={{
        magasins,
        addMagasin,
        getOneMagasin,
        getAllMagasin,
        updateMagasin,
        deleteByIdMagasin,
      }}
    >
      {children}
    </MagasinContext.Provider>
  );
}
