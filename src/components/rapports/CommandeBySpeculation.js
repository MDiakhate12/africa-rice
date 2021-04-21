import React, { useEffect, useState, useContext } from 'react'
import { Pie, Line, Bar } from 'react-chartjs-2'
import DataTable from '../common/DataTable'
import { GlobalContext } from '../../store/GlobalProvider'
import { Colors } from './Colors'

const { ipcRenderer } = window.require('electron')
const { events, eventResponse } = require('../../store/utils/events')

const getNomSpeculation = (params) =>
  params.getValue('Production').VarieteInstitution.SpeculationInstitution
    .Speculation.nomSpeculation

const columns = [
  { type: 'string', field: 'id', headerName: 'idCommande', hide: true },
  {
    type: 'string',
    field: 'speculation',
    headerName: 'Commande',
    width: 170,
    renderCell: getNomSpeculation,
    valueGetter: getNomSpeculation,
  },
  {
    type: 'number',
    field: 'totalQuantiteCommandee',
    headerName: 'Total commandé',
    width: 150,
  },
]

export default function CommandesBySpeculation({ display }) {
  const { institution } = useContext(GlobalContext)
  const [commandesBySpeculation, setCommandesBySpeculation] = useState([])


  const getCommandeSumBySpeculation = () => {
    ipcRenderer.send('getCommandeSumBySpeculation', {
      institutionId: institution?.idInstitution,
    })
    ipcRenderer.once('gotCommandeSumBySpeculation', (event, data) => {
      console.log(data)
      setCommandesBySpeculation(data)
    })
  }

  useEffect(() => {
    getCommandeSumBySpeculation()
  }, [institution])

  const optionsSpeculation = {
    title: {
      display: true,
      text: 'Quantité commandée par spéculation',
      // position: "bottom",
    },
  }

  const dataBySpeculation = {
    labels: commandesBySpeculation.map(
      (commande) =>
        commande.Production.VarieteInstitution.SpeculationInstitution
          .Speculation.nomSpeculation,
    ),
    datasets: [
      {
        label: 'Commande',
        data: commandesBySpeculation.map(
          (commande) => commande.totalQuantiteCommandee,
        ),
        backgroundColor: Colors.slice(0, commandesBySpeculation.length),
      },
    ],
  }

  //   return <Bar data={dataBySpeculation} options={optionsSpeculation} />;
  // }

  const rows = commandesBySpeculation.map((v) => ({
    id: v.Production.VarieteInstitution.SpeculationInstitution.speculationId,
    ...v,
  }))

  return display === 'chart' ? (
    <Pie data={dataBySpeculation} options={optionsSpeculation} />
  ) : (
    <>
      <DataTable height={350} pageSize={4} columns={columns} rows={rows} />
    </>
  )
}
