import { events } from '../utils/events'
const { ipcRenderer } = window.require('electron')

const production = {
  dateDeProduction: '07/06/2012',
  quantiteProduite: 100,
  prixUnitaire: 1000,
  quantiteDisponible: 12,
  institutionId: 1,
  varieteInstitutionId: 1,
  niveauInstitutionId: 1,
  magasinId: 1,
  localisationId: 1,
}
ipcRenderer.send(events.production.create, production)
