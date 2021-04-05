import React, { createContext, useEffect, useReducer } from "react";
import { actions } from "../actions";
import { initialState, reducer } from "./reducer";
const { events, eventResponse } = require("../utils/events");
const { ipcRenderer } = window.require("electron");

export const SpeculationInstitutionContext = createContext();

export default function SpeculationInstitutionProvider({ children }) {
  const [speculationsInstitution, dispatch] = useReducer(reducer, initialState);

  const addSpeculationInstitution = (payload) => {
    console.log(payload);
    ipcRenderer.send(events.speculationInstitution.create, payload);

    ipcRenderer.once(eventResponse.speculationInstitution.created, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
      getAllSpeculationInstitution();

      // dispatch({ type: actions.ON_ADD, payload: data });
    });
  };
  const getOneSpeculationInstitution = (payload) => {
    dispatch({ type: actions.ON_GET_ONE, payload });
    ipcRenderer.send(events.speculationInstitution.getOne);

    ipcRenderer.once(eventResponse.speculationInstitution.gotOne, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const getAllSpeculationInstitution = () => {
    ipcRenderer.send(events.speculationInstitution.getAll);

    ipcRenderer.once(eventResponse.speculationInstitution.gotAll, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
      dispatch({ type: actions.ON_GET_ALL, payload: data });
    });
  };

  const updateSpeculationInstitution = (payload) => {
    dispatch({ type: actions.ON_UPDATE, payload });
    ipcRenderer.send(events.speculationInstitution.update);

    ipcRenderer.once(eventResponse.speculationInstitution.updated, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const deleteByIdSpeculationInstitution = (payload) => {
    console.log("DELETE:", payload);
    ipcRenderer.send(events.speculationInstitution.delete, payload);

    ipcRenderer.once(eventResponse.speculationInstitution.deleted, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
      dispatch({ type: actions.ON_DELETE, payload: data });
    });
  };


  useEffect(() => {
    getAllSpeculationInstitution();

    return () => {
      ipcRenderer.removeAllListeners([
        eventResponse.speculationInstitution.gotAll,
        events.speculationInstitution.getAll,
      ]);
    };
  }, []);

  // return [speculationInstitution, add, getOne, getAll, update, deleteById];

  return (
    <SpeculationInstitutionContext.Provider
      value={{
        speculationsInstitution,
        addSpeculationInstitution,
        getOneSpeculationInstitution,
        getAllSpeculationInstitution,
        updateSpeculationInstitution,
        deleteByIdSpeculationInstitution,
      }}
    >
      {children}
    </SpeculationInstitutionContext.Provider>
  );
}
