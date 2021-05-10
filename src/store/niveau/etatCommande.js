const { ipcRenderer } = window.require('electron')
const { events, eventResponse } = require('../utils/events')

const etats = [
  { etat: 'Acceptable' },
  { etat: 'Rejete' },
  { etat: 'Annule' },
  { etat: 'Accepte' },
  { etat: 'Enleve' },
  { etat: 'Insuffisant' },
]

export const initEtat = () =>
  etats.forEach((niveau) =>
    ipcRenderer.send(events.etatCommande.create, niveau),
  )

initEtat()
