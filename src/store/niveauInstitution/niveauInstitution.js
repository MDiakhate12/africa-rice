import { eventResponse, events } from '../utils/events'
const { ipcRenderer } = window.require('electron')

const niveau = [
  {
    niveauId: 1,
    institutionId: 1,
  },
  {
    niveauId: 2,
    institutionId: 1,
  },
  {
    niveauId: 3,
    institutionId: 1,
  },
  {
    niveauId: 4,
    institutionId: 1,
  },
  {
    niveauId: 5,
    institutionId: 1,
  },
]

niveau.map((n) => {
  ipcRenderer.send(events.niveauInstitution.create, n)
})
