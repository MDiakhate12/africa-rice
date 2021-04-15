const { ipcRenderer } = window.require('electron')
const { events, eventResponse } = require('../utils/events')

const niveaux = [
  // { etat: 'Acceptable' },
  // { etat: 'Rejete' },
  // { etat: 'Annule' },
  // { etat: 'Accepte' },
  // { etat: 'Enleve' },
  { etat: 'Insuffisant' },
]

export const initializeNiveau = () =>
  niveaux.forEach((niveau) =>
    ipcRenderer.send(events.etatCommande.create, niveau),
  )

initializeNiveau()
