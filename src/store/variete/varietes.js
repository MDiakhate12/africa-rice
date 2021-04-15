import { events, eventResponse } from '../utils/events'

const { ipcRenderer } = window.require('electron')

export const allVarietes = [
  {
    nomVariete: 'Sahel 108',
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'Sahel 210',
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'Sahel 177',
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'Sahel 134',
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'Sahel 201',
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'Sahel 329',
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'NERICA 4',
    longueurCycle: 30,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'NERICA 8',
    longueurCycle: 30,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'NERICA 6',
    longueurCycle: 30,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'NERICA L19',
    longueurCycle: 30,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'NERICA S44',
    longueurCycle: 30,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'FKR 45 N',
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'NERICA 14',
    longueurCycle: 30,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'DJ 11 509',
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'BG 90 2',
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'Tox 728',
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'War 77',
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'ROK 5',
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'ISRIZ 3 ',
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'ISRIZ 8',
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'ISRIZ 9',
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'ISRIZ 12',
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'ISRIZ 15',
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: 'CE 145-66',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 2,
  },
  {
    nomVariete: 'CE 151-262',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 2,
  },
  {
    nomVariete: 'CE 180-33',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 2,
  },
  {
    nomVariete: 'CE 196-7-2-1',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 2,
  },
  {
    nomVariete: 'F2-20',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 2,
  },
  {
    nomVariete: 'Faourou',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 2,
  },
  {
    nomVariete: 'Nguinte',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 2,
  },
  {
    nomVariete: 'Nganda',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 2,
  },
  {
    nomVariete: 'Darou',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 2,
  },
  {
    nomVariete: 'Souna 3',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 3,
  },
  {
    nomVariete: 'IBV 8001',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 3,
  },
  {
    nomVariete: 'IBV 8004',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 3,
  },
  {
    nomVariete: 'IBMV 8402',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 3,
  },
  {
    nomVariete: 'IDSMD 9507',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 3,
  },
  {
    nomVariete: 'Gawane',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 3,
  },
  {
    nomVariete: 'Thialack 2',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 3,
  },
  {
    nomVariete: 'Xeewel Gi',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 4,
  },
  {
    nomVariete: 'Noor 96',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 4,
  },
  {
    nomVariete: 'Doo Mer',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 4,
  },
  {
    nomVariete: 'Sooror',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 4,
  },
  {
    nomVariete: 'Gaaw Na',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 4,
  },
  {
    nomVariete: 'Jaboot',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 4,
  },
  {
    nomVariete: 'Goor Yomboul',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 4,
  },
  {
    nomVariete: 'Yaayi Seex',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 4,
  },
  {
    nomVariete: 'Obatampa',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 4,
  },
  {
    nomVariete: 'Swan',
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 4,
  },
]

allVarietes.map((v) => {
  ipcRenderer.send(events.variete.create, v)
})
