import React, { useEffect, useReducer } from 'react'
import { actions } from '../actions'
import { initialState, reducer } from './reducer'
const { events, eventResponse } = require('../utils/events')
const { ipcRenderer } = window.require('electron')

export default function Provider() {
  const [{ institutions, institution }, dispatch] = useReducer(
    reducer,
    initialState,
  )

  const login = (payload) => {
    localStorage.setItem('institution', JSON.stringify(payload))
    dispatch({ type: actions.ON_GET_ONE, payload })
  }

  const logout = () => {
    localStorage.removeItem('institution')
    dispatch({ type: actions.ON_GET_ONE, payload: {} })
  }

  const checkAuth = () => {
    const institution = localStorage.getItem('institution')
    if (institution) {
      dispatch({ type: actions.ON_GET_ONE, payload: JSON.parse(institution) })
      return true
    } else {
      dispatch({ type: actions.ON_GET_ONE, payload: {} })
      return false
    }
  }

  const add = (payload) => {
    ipcRenderer.send(events.institution.create, payload)

    ipcRenderer.once(eventResponse.institution.created, (event, data) => {
      console.log('EVENT:', event)
      console.log('DATA:', data)
      dispatch({ type: actions.ON_ADD, payload: data })
    })
  }

  const getOne = (payload) => {
    console.log('GET ONE:', payload)
    ipcRenderer.send(events.institution.getOne, payload)

    ipcRenderer.once(eventResponse.institution.gotOne, (event, data) => {
      console.log('EVENT INSTITUTION:', event)
      console.log('DATA INSTITUTION:', data)
      dispatch({ type: actions.ON_GET_ONE, payload: data })
    })
  }

  const getAll = () => {
    ipcRenderer.send(events.institution.getAll)

    ipcRenderer.once(eventResponse.institution.gotAll, (event, data) => {
      console.log('EVENT:', event)
      console.log('DATA:', data)
      dispatch({ type: actions.ON_GET_ALL, payload: data })
    })
  }

  const update = (payload) => {
    ipcRenderer.send(events.institution.update, payload)

    ipcRenderer.once(eventResponse.institution.updated, (event, data) => {
      console.log('EVENT:', event)
      console.log('DATA:', data)
      // dispatch({ type: actions.ON_UPDATE, payload: data });

      getOne(institution.idInstitution)
    })
  }

  const deleteById = (payload) => {
    ipcRenderer.send(events.institution.delete, payload)

    ipcRenderer.once(eventResponse.institution.deleted, (event, data) => {
      console.log('EVENT:', event)
      console.log('DATA:', data)
      dispatch({ type: actions.ON_DELETE, payload: data })
    })
  }

  // useEffect(() => {
  //   getOne(1)
  // }, [])

  return [
    institutions,
    institution,
    add,
    getOne,
    getAll,
    update,
    deleteById,
    login,
    logout,
    checkAuth,
  ]
}
