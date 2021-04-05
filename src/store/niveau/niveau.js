import { eventResponse, events } from '../utils/events'
const { ipcRenderer } = window.require('electron')

const niveau = [
  {
    nomNiveau: 'G0',
  },
  {
    nomNiveau: 'G1',
  },
  {
    nomNiveau: 'G2',
  },
  {
    nomNiveau: 'Prébase',
  },
  {
    nomNiveau: 'Base',
  },
  {
    nomNiveau: 'R1',
  },
  {
    nomNiveau: 'R2',
  },
]

niveau.map((n) => {
  ipcRenderer.send(events.niveauDeProduction.create, n)
})
