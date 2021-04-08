import { events, eventResponse } from '../utils/events'

const { ipcRenderer } = window.require('electron')

const institution = {
  nomComplet: 'Africa Mil',
  sigle: 'AM',
  logo: 'img',
  addresse: 'Thies',
}

ipcRenderer.send(events.institution.create, institution)
ipcRenderer.once(eventResponse.institution.created, (ev, data) => {
  console.log(data)
})
