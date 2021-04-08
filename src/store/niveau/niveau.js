const { ipcRenderer } = window.require('electron')
const { events, eventResponse } = require('../utils/events')

const niveaux = [
  { nomNiveau: 'prebase' },
  { nomNiveau: 'base' },
  { nomNiveau: 'G0' },
  { nomNiveau: 'G1' },
  { nomNiveau: 'G2' },
  { nomNiveau: 'R1' },
  { nomNiveau: 'R2' },
]

export const initializeNiveau = () =>
  niveaux.forEach(
    (niveau) =>
      ipcRenderer.send(events.niveauDeProduction.create, niveau) *
      ipcRenderer.once(
        eventResponse.niveauDeProduction.created,
        (event, data) => {
          console.log(data)
        },
      ),
  )

initializeNiveau()
