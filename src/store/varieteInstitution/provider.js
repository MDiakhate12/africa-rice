import React, { createContext, useEffect, useReducer } from 'react'
import { actions } from '../actions'
import { initialState, reducer } from './reducer'
const { events, eventResponse } = require('../utils/events')
const { ipcRenderer } = window.require('electron')

export const VarieteInstitutionContext = createContext()

export default function VarieteInstitutionProvider({ children }) {
  const [varietesInstitution, dispatch] = useReducer(reducer, initialState)

  const addVarieteInstitution = (payload, params) => {
    console.log(payload)
    ipcRenderer.send(events.varieteInstitution.create, payload)

    ipcRenderer.once(
      eventResponse.varieteInstitution.created,
      (event, data) => {
        console.log('EVENT:', event)
        console.log('DATA:', data)
        getAllVarieteInstitution(params)

        // dispatch({ type: actions.ON_ADD, payload: data });
      },
    )
  }
  const getOneVarieteInstitution = (payload) => {
    ipcRenderer.send(events.varieteInstitution.getOne)

    ipcRenderer.once(eventResponse.varieteInstitution.gotOne, (event, data) => {
      console.log('EVENT:', event)
      console.log('DATA:', data)
      dispatch({ type: actions.ON_GET_ONE, payload })
    })
  }

  const getAllVarieteInstitution = (params) => {
    ipcRenderer.send(events.varieteInstitution.getAll, params)

    ipcRenderer.once(eventResponse.varieteInstitution.gotAll, (event, data) => {
      console.log('EVENT:', event)
      console.log('DATA:', data)
      dispatch({ type: actions.ON_GET_ALL, payload: data })
    })
  }

  const updateVarieteInstitution = (payload) => {
    dispatch({ type: actions.ON_UPDATE, payload })
    ipcRenderer.send(events.varieteInstitution.update)

    ipcRenderer.once(
      eventResponse.varieteInstitution.updated,
      (event, data) => {
        console.log('EVENT:', event)
        console.log('DATA:', data)
      },
    )
  }

  const deleteByIdVarieteInstitution = (payload) => {
    console.log('DELETE:', payload)
    ipcRenderer.send(events.varieteInstitution.delete, payload)

    ipcRenderer.once(
      eventResponse.varieteInstitution.deleted,
      (event, data) => {
        console.log('EVENT:', event)
        console.log('DATA:', data)
        dispatch({ type: actions.ON_DELETE, payload })
      },
    )
  }

  // useEffect(() => {
  //   getAllVarieteInstitution();

  //   return () => {
  //     ipcRenderer.removeAllListeners([
  //       eventResponse.varieteInstitution.gotAll,
  //       eventResponse.varieteInstitution.created,
  //       events.varieteInstitution.getAll,
  //       events.varieteInstitution.create,
  //     ]);
  //   };
  // }, []);

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
  )
}
