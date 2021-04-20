import React, { useContext, useEffect, useState } from 'react'
import DataTable from '../common/DataTable'
import StockCard from './StockCard'
import riz from '../../components/images/riz.jpg'
import mil from '../../components/images/mil.jpg'
import defaultImage from '../../components/images/default.jpg'
import { Grid } from '@material-ui/core'
import { GlobalContext } from '../../store/GlobalProvider'
import CommonDialog from '../common/CommonDialog'

const { ipcRenderer } = window.require('electron')
const { events, eventResponse } = require('../../store/utils/events')

const columns = [
  { type: 'string', field: 'id', headerName: 'idProduction', hide: true },
  {
    type: 'string',
    field: 'variete',
    headerName: 'Variete',
    width: 180,
    renderCell: (params) =>
      params.getValue('VarieteInstitution')?.Variete.nomVariete,
  },
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

function Stock() {
  const [productionsBySpeculation, setProductionBySpec] = useState([])
  const [productionsByVariete, setProductionByVariete] = useState([])
  const { openDialog, dialog, institution } = useContext(GlobalContext)

  // PRODUCTIONS GROUPED BY SPECULATION
  // const [speculations, setSpeculations] = useState([
  //   {
  //     nomSpeculation: 'Riz',
  //     dateDerniereProduction: '12 Décembre 2013',
  //     imageSpeculation: riz,
  //     quantiteProduite: 2000,
  //   },
  //   {
  //     nomSpeculation: 'Mil',
  //     dateDerniereProduction: '29 Octobre 2012',
  //     imageSpeculation: mil,
  //     quantiteProduite: 3000,
  //   },
  //   {
  //     nomSpeculation: 'Total',
  //     dateDerniereProduction: '14 Février 2014',
  //     imageSpeculation: defaultImage,
  //     quantiteProduite: 5000,
  //   },
  // ])

  const getAllProductions = () => {
    ipcRenderer.send('getByVarietes', {
      institution: institution?.idInstitution,
    })
    ipcRenderer.once('gotByVarietes', (event, data) => {
      console.log(data)
      let sommeStock = 0
      let sommeQDispo = 0
      groupBySpeculation(data).map((value) => {
        sommeStock += value.totalStock
        sommeQDispo += value.totalQuantiteDisponible
      })
      setProductionByVariete(data)
      setProductionBySpec([
        ...groupBySpeculation(data),
        {
          varieteInstitutionId: 0,
          nomSpeculation: 'Total',
          dateDerniereProduction: '14 Février 2014',
          imageSpeculation: defaultImage,
          totalStock: sommeStock,
          totalQuantiteDisponible: sommeQDispo,
        },
      ])
    })
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
          nomSpeculation:
            value.VarieteInstitution.SpeculationInstitution.Speculation
              .nomSpeculation,
          imageSpeculation:
            value.VarieteInstitution.SpeculationInstitution.Speculation
              .imageSpeculation,
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
  }, [institution])

  const handleDialogClose = (response, data) => {
    if (response === 'yes') {
      console.log(data)
      return
    }
    return
  }

  return (
    <div>
      <CommonDialog handleClose={handleDialogClose} />
      <Grid container spacing={3}>
        {productionsBySpeculation.map((speculation) => (
          <Grid key={speculation.nomSpeculation} item sm={3}>
            <StockCard
              data={speculation}
              handleOpenDialog={() =>
                openDialog({
                  title: `Stock des variétés de ${speculation.nomSpeculation}`,
                  content: (
                    <DataTable
                      columns={columns}
                      rows={productionsByVariete
                        .filter(
                          (v) =>
                            v.VarieteInstitution.speculationInstitutionId ===
                              speculation.varieteInstitutionId ||
                            speculation.varieteInstitutionId === 0,
                        )
                        .map((v) => ({
                          id: v.varieteInstitutionId,
                          ...v,
                        }))}
                    />
                  ),
                })
              }
            >
              <DataTable
                columns={columns}
                rows={productionsByVariete
                  .filter(
                    (v) =>
                      v.VarieteInstitution.speculationInstitutionId ===
                      speculation.varieteInstitutionId,
                  )
                  .map((v) => ({
                    id: v.varieteInstitutionId,
                    ...v,
                  }))}
              />
            </StockCard>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Stock
