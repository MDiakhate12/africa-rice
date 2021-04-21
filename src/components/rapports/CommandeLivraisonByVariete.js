import React, { useEffect, useState, useContext } from 'react'
import { Colors } from './Colors'
import { Bar } from 'react-chartjs-2'
import DataTable from '../common/DataTable'
import { GlobalContext } from '../../store/GlobalProvider'

const { ipcRenderer } = window.require('electron')
const { events, eventResponse } = require('../../store/utils/events')

const getNomVariete = (params) =>
  params.getValue('Production').VarieteInstitution.Variete.nomVariete

const getNomSpeculation = (params) =>
  params.getValue('Production').VarieteInstitution.SpeculationInstitution
    .Speculation.nomSpeculation

const columns = [
  { type: 'string', field: 'id', headerName: 'idCommande', hide: true },
  {
    type: 'string',
    field: 'speculation',
    headerName: 'Speculation',
    width: 130,
    renderCell: getNomSpeculation,
    valueGetter: getNomSpeculation,
    hide: true,
  },
  {
    type: 'string',
    field: 'commande',
    headerName: 'Commande',
    width: 170,
    renderCell: getNomVariete,
    valueGetter: getNomVariete,
  },
  {
    type: 'number',
    field: 'totalQuantiteCommandee',
    headerName: 'Total commandé',
    width: 150,
  },
  {
    type: 'number',
    field: 'totalQuantiteEnleve',
    headerName: 'Total livré',
    width: 150,
  },
]

export default function CommandeLivraisonByVariete({ display }) {
  const { institution } = useContext(GlobalContext)
  const [commandesByVariete, setCommandeByVariete] = useState([])
  const [commandeByVarieteByState, setCommandeByVarieteByState] = useState([])


  const getCommandeSumByVariete = () => {
    ipcRenderer.send('getCommandeSumByVarietes', {
      institutionId: institution?.idInstitution,
    })
    ipcRenderer.once('gotCommandeSumByVarietes', (event, data) => {
      setCommandeByVariete(data)
    })
  }

  useEffect(() => {
    getCommandeSumByVariete()
  }, [institution])

  const getCommandeSumByVarieteByState = () => {
    ipcRenderer.send('getCommandeSumByVarieteByState', {
      '$Production.institutionId$': institution.idInstitution,
    })
    ipcRenderer.once('gotCommandeSumByVarieteByState', (event, data) => {
      setCommandeByVarieteByState(data)
      console.log('BY STATE: ', data)
    })
  }

  useEffect(() => {
    getCommandeSumByVariete()
    getCommandeSumByVarieteByState()
  }, [])

  const optionsVarieteByState = {
    title: {
      display: true,
      text: 'Quantité commandée VS Quantité Livrée par variété',
      // position: "bottom",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 200,
          },
        },
      ],
    },
  }

  const labels = commandesByVariete.map(
    (commande) => commande.Production.VarieteInstitution.Variete.nomVariete,
  )

  const commandeByVarieteByStateLabels = commandeByVarieteByState
    .filter((commande) => commande.etatId === 5)
    .map(
      (commande) => commande.Production.VarieteInstitution.Variete.nomVariete,
    )

  const commandesEnlevees = commandeByVarieteByState.filter(
    (commande) => commande.etatId === 5,
  )

  console.log(commandeByVarieteByStateLabels)

  const totalEnleve = labels.map((label) => {
    let index = commandeByVarieteByStateLabels.indexOf(label)
    if (index > -1) {
      return commandesEnlevees[index].totalQuantiteCommandee
    }
    return 0
  })

  const dataByVarieteByState = {
    labels,
    datasets: [
      {
        label: 'Commande',
        data: commandesByVariete.map(
          (commande) => commande.totalQuantiteCommandee,
        ),
        // backgroundColor: colors.slice(3, commandesByVariete.length + 3),
        backgroundColor: Colors[4],
      },
      {
        label: 'Enlèvement',
        data: labels.map((label) => {
          // if (commandeByVarieteByStateLabels.includes(label)) {
          //   return commandeByVarieteByState.find(
          //     (commande) =>
          //       commande.Production.VarieteInstitution.SpeculationInstitution
          //         .Speculation.nomSpeculation === label
          //   ).totalQuantiteCommandee;
          // }
          // return 0;
          let index = commandeByVarieteByStateLabels.indexOf(label)
          if (index > -1) {
            return commandesEnlevees[index].totalQuantiteCommandee
          }
          return 0
        }),
        // commande.etatId === 5 ? commande.totalQuantiteCommandee : 0
        backgroundColor: Colors[5],
      },
    ],
  }

  //   return <Bar data={dataByVarieteByState} options={optionsVarieteByState} />; //
  // }

  const rows = commandesByVariete.map((v, i) => {
    return {
      id: `${v.Production.VarieteInstitution.SpeculationInstitution.speculationId}${v.etatId}`,
      ...v,
      totalQuantiteEnleve: totalEnleve[i],
    }
  })

  return display === 'chart' ? (
    <Bar data={dataByVarieteByState} options={optionsVarieteByState} />
  ) : (
    <>
      <DataTable height={350} pageSize={4} columns={columns} rows={rows} />
    </>
  )
}
