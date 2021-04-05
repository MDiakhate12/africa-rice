import { events } from '../utils/events'

const { ipcRenderer } = window.require('electron')

;[1, 2, 3, 4, 5].map((speculationId) => {
  const institution = {
    speculationId,
    institutionId: 1,
  }
  console.log(institution)
  ipcRenderer.send(events.speculationInstitution.create, institution)
})
