import { useEffect, useState } from 'react';
import * as React from 'react';
import DataTable from '../common/DataTable'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { Box } from '@material-ui/core'
import Select from '@material-ui/core/Select'
const { ipcRenderer } = window.require('electron')

const columns = [
  { type: 'string', field: 'id', headerName: 'idProduction', hide: true },
  {
    type: 'number',
    field: 'totalQuantiteProduite',
    headerName: 'Quantite Produite Total',
    width: 160,
  },
  {
    type: 'number',
    field: 'totalQuantiteDisponible',
    headerName: 'Quantite Disponible Total',
    width: 160,
  },
  {
    type: 'number',
    field: 'totalStock',
    headerName: 'Total Stock ',
    width: 160,
  },
  {
    type: 'number',
    field: 'totalPrix',
    headerName: 'Prix Total',
    width: 160,
  },
]
const columnVariete = [
  {
    type: 'string',
    field: 'variete',
    headerName: 'Variete',
    width: 140,
    renderCell: (params) =>
      params.getValue('VarieteInstitution')?.Variete.nomVariete,
  },
  {
    type: 'string',
    field: 'speculation',
    headerName: 'Speculation',
    width: 140,
    renderCell: (params) =>
      params.getValue('VarieteInstitution').SpeculationInstitution?.Speculation
        .nomSpeculation,
  },
  ...columns,
]

const columnSpeculation = [
  {
    type: 'string',
    field: 'speculation',
    headerName: 'Speculation',
    width: 140,
  },
  ...columns,
]

function StockState() {
  const [productionsBySpeculation, setProductionBySpec] = useState([])
  const [productionsByVariete, setProductionByVariete] = useState([])
  const [choice, setChoice] = useState('speculation')

  const getAllProductions = () => {
    ipcRenderer.send('getByVarietes')
    ipcRenderer.on('gotByVarietes', (event, data) => {
      setProductionByVariete(data)
      setProductionBySpec(groupBySpeculation(data))
    })
  }

  const handleChange = (evt) => {
    const value = evt.target.value
    setChoice(value)
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
          totalStock: value.totalStock,
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
        ].totalStock =
          bySpeculation[value.VarieteInstitution.speculationInstitutionId]
            .totalStock + value.totalStock
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
  }, [])

  return (
    <div>
      <div>
        <InputLabel id="demo-simple-select-label">Etat Stock Par </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={choice}
          onChange={handleChange}
        >
          <MenuItem value={'speculation'}>Speculation</MenuItem>
          <MenuItem value={'variete'}>Variete</MenuItem>
        </Select>
      </div>
      <Box height={15}></Box>
      {choice === 'variete' ? (
        <DataTable
          columns={columnVariete}
          rows={productionsByVariete.map((v) => ({
            id: v.varieteInstitutionId,
            ...v,
          }))}
        />
      ) : (
        <DataTable
          columns={columnSpeculation}
          rows={productionsBySpeculation.map((v) => ({
            id: v.varieteInstitutionId,
            ...v,
          }))}
        />
      )}
    </div>
  )
}

export default StockState
