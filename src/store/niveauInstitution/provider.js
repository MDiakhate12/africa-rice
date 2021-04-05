import React, { useEffect, useReducer } from 'react'
import { actions } from '../actions'
import { initialState, reducer } from './reducer'
const { events, eventResponse } = require('../utils/events')
const { ipcRenderer } = window.require('electron')

export default function Provider() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const add = (payload) => {
    dispatch({ type: actions.ON_ADD, payload })
    ipcRenderer.send(events.niveauInstitution.create)

    ipcRenderer.on(eventResponse.niveauInstitution.created, (event, data) => {
      console.log('EVENT:', event)
      console.log('DATA:', data)
    })
  }
  const getOne = (payload) => {
    dispatch({ type: actions.ON_GET_ONE, payload })
    ipcRenderer.send(events.niveauInstitution.getOne)

    ipcRenderer.on(eventResponse.niveauInstitution.gotOne, (event, data) => {
      console.log('EVENT:', event)
      console.log('DATA:', data)
    })
  }

  const getAll = () => {
    ipcRenderer.send(events.niveauInstitution.getAll)

    ipcRenderer.on(eventResponse.niveauInstitution.gotAll, (event, data) => {
      // console.log('EVENT:', event)
      console.log('DATA niveau Institution:', data)
      dispatch({ type: actions.ON_GET_ALL })
    })
  }

  const update = (payload) => {
    dispatch({ type: actions.ON_UPDATE, payload })
    ipcRenderer.send(events.niveauInstitution.update)

    ipcRenderer.on(eventResponse.niveauInstitution.updated, (event, data) => {
      console.log('EVENT:', event)
      console.log('DATA:', data)
    })
  }

  const deleteById = (payload) => {
    dispatch({ type: actions.ON_DELETE, payload })
    ipcRenderer.send(events.niveauInstitution.delete)

    ipcRenderer.on(eventResponse.niveauInstitution.deleted, (event, data) => {
      console.log('EVENT:', event)
      console.log('DATA:', data)
    })
  }

  return [state, add, getOne, getAll, update, deleteById]
}
