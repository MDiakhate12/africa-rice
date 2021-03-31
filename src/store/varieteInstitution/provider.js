import React, { createContext, useEffect, useReducer } from "react";
import { actions } from "../actions";
import { initialState, reducer } from "./reducer";
const { events, eventResponse } = require("../utils/events");
const { ipcRenderer } = window.require("electron");

export const VarieteInstitutionContext = createContext();

export default function VarieteInstitutionProvider({ children }) {
  const [varietesInstitution, dispatch] = useReducer(reducer, initialState);

  const addVarieteInstitution = (payload) => {
    console.log(payload);
    ipcRenderer.send(events.varieteInstitution.create, payload);

    ipcRenderer.on(eventResponse.varieteInstitution.created, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
      getAllVarieteInstitution();

      // dispatch({ type: actions.ON_ADD, payload: data });
    });
  };
  const getOneVarieteInstitution = (payload) => {
    dispatch({ type: actions.ON_GET_ONE, payload });
    ipcRenderer.send(events.varieteInstitution.getOne);

    ipcRenderer.on(eventResponse.varieteInstitution.gotOne, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const getAllVarieteInstitution = () => {
    ipcRenderer.send(events.varieteInstitution.getAll);

    ipcRenderer.on(eventResponse.varieteInstitution.gotAll, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
      dispatch({ type: actions.ON_GET_ALL, payload: data });
    });
  };

  const updateVarieteInstitution = (payload) => {
    dispatch({ type: actions.ON_UPDATE, payload });
    ipcRenderer.send(events.varieteInstitution.update);

    ipcRenderer.on(eventResponse.varieteInstitution.updated, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
    });
  };

  const deleteByIdVarieteInstitution = (payload) => {
    console.log("DELETE:", payload);
    ipcRenderer.send(events.varieteInstitution.delete, payload);

    ipcRenderer.on(eventResponse.varieteInstitution.deleted, (event, data) => {
      console.log("EVENT:", event);
      console.log("DATA:", data);
      dispatch({ type: actions.ON_DELETE, payload: data });
    });
  };

  useEffect(() => {
    getAllVarieteInstitution();
  }, []);

  // return [varieteInstitution, add, getOne, getAll, update, deleteById];

  return (
    <VarieteInstitutionContext.Provider
      value={{
        varietesInstitution,
        addVarieteInstitution,
        getOneVarieteInstitution,
        getAllVarieteInstitution,
        updateVarieteInstitution,
        deleteByIdVarieteInstitution,
      }}
    >
      {children}
    </VarieteInstitutionContext.Provider>
  );
}
