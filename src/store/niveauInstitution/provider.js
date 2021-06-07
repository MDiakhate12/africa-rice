import { createContext, useEffect, useReducer } from 'react';
import { actions } from '../actions'
import { initialState, reducer } from './reducer'
const { events, eventResponse } = require('../utils/events')
const { ipcRenderer } = window.require('electron')

export const Context = createContext()

export default function Provider() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const add = (payload) => {
    console.log(payload)
    ipcRenderer.send(events.niveauInstitution.create, payload)

    ipcRenderer.once(eventResponse.niveauInstitution.created, (event, data) => {
      console.log('EVENT:', event)
      console.log('DATA:', data)
      getAll()

      // dispatch({ type: actions.ON_ADD, payload: data });
    })
  }
  const getOne = (payload) => {
    dispatch({ type: actions.ON_GET_ONE, payload })
    ipcRenderer.send(events.niveauInstitution.getOne)

    ipcRenderer.once(eventResponse.niveauInstitution.gotOne, (event, data) => {
      console.log('EVENT:', event)
      console.log('DATA:', data)
    })
  }

  const getAll = (params) => {
    ipcRenderer.send(events.niveauInstitution.getAll, params)

    ipcRenderer.once(eventResponse.niveauInstitution.gotAll, (event, data) => {
      console.log('EVENT:', event)
      console.log('DATA:', data)
      dispatch({ type: actions.ON_GET_ALL, payload: data })
    })
  }

  const update = (payload) => {
    dispatch({ type: actions.ON_UPDATE, payload })
    ipcRenderer.send(events.niveauInstitution.update)

    ipcRenderer.once(eventResponse.niveauInstitution.updated, (event, data) => {
      console.log('EVENT:', event)
      console.log('DATA:', data)
    })
  }

  const deleteById = (payload) => {
    console.log('DELETE:', payload)
    ipcRenderer.send(events.niveauInstitution.delete, payload)

    ipcRenderer.once(eventResponse.niveauInstitution.deleted, (event, data) => {
      console.log('EVENT:', event)
      console.log('DATA:', data)
      dispatch({ type: actions.ON_DELETE, payload: data })
    })
  }

  // useEffect(() => {
  //   getAll()
  // }, [])

  return [state, add, getOne, getAll, update, deleteById]
}
