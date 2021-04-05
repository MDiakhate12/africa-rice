import { eventResponse, events } from '../utils/events'
const { ipcRenderer } = window.require('electron')

const magasin = {
  nomMagasin: 'Magasin1',
  localisationId: 1,
  institutionId: 1,
}

ipcRenderer.send(events.magasin.create, magasin)
