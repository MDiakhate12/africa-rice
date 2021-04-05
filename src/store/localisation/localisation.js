import { eventResponse, events } from '../utils/events'
const { ipcRenderer } = window.require('electron')

const localisation = {
  region: 'Dakar',
  departement: 'Dakar',
  commune: 'Sacre Coeur',
  village: 'Mamsoum',
  latitude: '12',
  longitude: '13',
  zoneId: 1,
}

ipcRenderer.send(events.localisation.create, localisation)
