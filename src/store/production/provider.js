import React, { useEffect, useReducer } from 'react'
import { actions } from '../actions'
import { initialState, reducer } from './reducer'
const { events, eventResponse } = require('../utils/events')
const { ipcRenderer } = window.require('electron')

export default function Provider() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const add = (payload) => {
    dispatch({ type: actions.ON_ADD, payload })
    ipcRenderer.send(events.production.create)

    ipcRenderer.on(eventResponse.production.created, (event, data) => {
      console.log('EVENT:', event)
      console.log('DATA:', data)
    })
  }
  const getOne = (payload) => {
    dispatch({ type: actions.ON_GET_ONE, payload })
    ipcRenderer.send(events.production.getOne)

    ipcRenderer.on(eventResponse.production.gotOne, (event, data) => {
      console.log('EVENT:', event)
      console.log('DATA:', data)
    })
  }

  const getAll = () => {
    ipcRenderer.send(events.production.getAll)

    ipcRenderer.on(eventResponse.production.gotAll, (event, data) => {
      // console.log("EVENT:", event);
      console.log('DATA Production :', data)
      dispatch({ type: actions.ON_GET_ALL, payload: data })
    })
  }

  const update = (payload) => {
    ipcRenderer.send(events.production.update)
    dispatch({ type: actions.ON_UPDATE, payload })

    ipcRenderer.on(eventResponse.production.updated, (event, data) => {
      console.log('EVENT:', event)
      console.log('DATA:', data)
    })
  }

  const deleteById = (payload) => {
    dispatch({ type: actions.ON_DELETE, payload })
    ipcRenderer.send(events.production.delete)

    ipcRenderer.on(eventResponse.production.deleted, (event, data) => {
      console.log('EVENT:', event)
      console.log('DATA:', data)
    })
  }

  return [state, add, getOne, getAll, update, deleteById]
}
