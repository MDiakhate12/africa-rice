import riz from '../../components/images/riz.jpg'
import sorgho from '../../components/images/sorgho.jpg'
import mil from '../../components/images/mil.jpg'
import mais from '../../components/images/mais.jpg'
import arachide from '../../components/images/arachide.jpg'
import niebe from '../../components/images/niebe.jpg'
import oignon from '../../components/images/oignon.jpg'
import tomate from '../../components/images/tomate.jpg'
import piment from '../../components/images/piment.jpg'
import jaxatu from '../../components/images/jaxatu.jpg'
import terre from '../../components/images/pomme_de_terre.jpg'
import douce from '../../components/images/patate_douce.jpg'
import gombo from '../../components/images/gombo.jpg'
import aubergine from '../../components/images/aubergine.jpg'

import { events, eventResponse } from '../utils/events'

const { ipcRenderer } = window.require('electron')

export const allSpeculations = [
  {
    nomSpeculation: 'riz',
    imageSpeculation: riz,
  },
  {
    nomSpeculation: 'sorgho',
    imageSpeculation: sorgho,
  },
  {
    nomSpeculation: 'mil',
    imageSpeculation: mil,
  },
  {
    nomSpeculation: 'mais',
    imageSpeculation: mais,
  },
  {
    nomSpeculation: 'arachide',
    imageSpeculation: arachide,
  },
  {
    nomSpeculation: 'niebe',
    imageSpeculation: niebe,
  },
  {
    nomSpeculation: 'oignon',
    imageSpeculation: oignon,
  },
  {
    nomSpeculation: 'tomate',
    imageSpeculation: tomate,
  },
  {
    nomSpeculation: 'piment',
    imageSpeculation: piment,
  },
  {
    nomSpeculation: 'jaxatu',
    imageSpeculation: jaxatu,
  },
  {
    nomSpeculation: 'pomme de terre',
    imageSpeculation: terre,
  },
  {
    nomSpeculation: 'patate douce',
    imageSpeculation: douce,
  },
  {
    nomSpeculation: 'gombo',
    imageSpeculation: gombo,
  },
  {
    nomSpeculation: 'aubergine',
    imageSpeculation: aubergine,
  },
]

allSpeculations.map((s) => {
  ipcRenderer.send(events.speculation.create, s)
})
