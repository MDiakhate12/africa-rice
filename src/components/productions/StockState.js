import React, { useEffect, useState } from 'react'
import DataTable from '../common/DataTable'
const { ipcRenderer } = window.require('electron')
const { events, eventResponse } = require('../../store/utils/events')

const varieteColumn = {
  type: 'string',
  field: 'variete',
  headerName: 'Variete',
  width: 180,
  renderCell: (params) =>
    params.getValue('VarieteInstitution')?.Variete.nomVariete,
}

const speculationColumn = {
  type: 'string',
  field: 'speculation',
  headerName: 'Speculation',
  width: 180,
}

const columns = [
  { type: 'string', field: 'id', headerName: 'idProduction', hide: true },
  varieteColumn,
  {
    type: 'number',
    field: 'totalQuantiteProduite',
    headerName: 'Quantite Total Produite',
    width: 200,
  },
  {
    type: 'number',
    field: 'totalQuantiteDisponible',
    headerName: 'Quantite Total Disponible',
    width: 200,
  },
  {
    type: 'number',
    field: 'totalPrix',
    headerName: 'Prix Total',
    width: 160,
  },
]

function StockState() {
  const [columnName, setColumnName] = useState(columns)
  const [productions, setProductions] = useState([])

  const getAllProductions = () => {
    ipcRenderer.send('getByVarietes')
    ipcRenderer.on('gotByVarietes', (event, data) => {
      console.log(data)
      // updateColumn(false)
      setProductions(data)
      // setTimeout(() => {
      //   updateColumn(true)
      //   setProductions(groupBySpeculation(data))
      // }, 3000)
    })
  }

  const updateColumn = (isSpeculation) => {
    isSpeculation
      ? (columns[1] = speculationColumn)
      : (columns[1] = varieteColumn)
    console.log(columns)
    setColumnName(columns)
  }
  const groupBySpeculation = (data) => {
    const bySpeculation = {}
    data.map((value) => {
      if (
        !Object.keys(bySpeculation).includes(
          value.VarieteInstitution.speculationInstitutionId.toString(),
        )
      ) {
        bySpeculation[value.VarieteInstitution.speculationInstitutionId] = {
          totalPrix: value.totalPrix,
          totalQuantiteProduite: value.totalQuantiteProduite,
          totalQuantiteDisponible: value.totalQuantiteDisponible,
          speculation:
            value.VarieteInstitution.SpeculationInstitution.Speculation
              .nomSpeculation,
          varieteInstitutionId:
            value.VarieteInstitution.speculationInstitutionId,
        }
      } else {
        bySpeculation[
          value.VarieteInstitution.speculationInstitutionId
        ].totalPrix =
          bySpeculation[value.VarieteInstitution.speculationInstitutionId]
            .totalPrix + value.totalPrix
        bySpeculation[
          value.VarieteInstitution.speculationInstitutionId
        ].totalQuantiteProduite =
          bySpeculation[value.VarieteInstitution.speculationInstitutionId]
            .totalQuantiteProduite + value.totalQuantiteProduite
        bySpeculation[
          value.VarieteInstitution.speculationInstitutionId
        ].totalQuantiteDisponible =
          bySpeculation[value.VarieteInstitution.speculationInstitutionId]
            .totalQuantiteDisponible + value.totalQuantiteDisponible
      }
    })
    return Object.values(bySpeculation)
  }

  useEffect(() => {
    getAllProductions()
    // console.log(productions)
  }, [])

  return (
    <div>
      <DataTable
        columns={columnName}
        rows={productions.map((v) => ({ id: v.varieteInstitutionId, ...v }))}
      />
    </div>
  )
}

export default StockState
