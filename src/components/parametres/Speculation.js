import React, { useContext, useEffect, useReducer, useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core'
import DataTable from '../common/DataTable'
import { GlobalContext } from '../../store/GlobalProvider'
import SingleLineGridList from '../common/SingleLineGridList'
import riz from '../images/riz.jpg'
import { events, eventResponse } from '../../store/utils/events'

const { ipcRenderer } = window.require('electron')

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(1),
    width: '25ch',
  },
  margin: {
    marginBottom: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  addButton: {
    width: '29ch',
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const columns = [
  { type: 'string', field: 'id', headerName: 'idVariete', hide: true },
  { type: 'string', field: 'nomVariete', headerName: 'Variété', width: 170 },
  {
    type: 'string',
    field: 'speculation',
    headerName: 'Spéculation',
    width: 130,
    renderCell: (params) => params.getValue('speculation').nomSpeculation,
  },
  { type: 'number', field: 'longueurCycle', headerName: 'Cycle', width: 100 },
  {
    type: 'number',
    field: 'stockDeSecurite',
    headerName: 'Stock De Sécurite',
    width: 170,
  },
  {
    type: 'string',
    field: 'zone',
    headerName: 'Zone',
    width: 100,
    renderCell: (params) => params.getValue('zone').nomZone,
  },
]

export default function Parametres() {
  const classes = useStyles()

  const {
    varietes,
    speculations,
    allSpeculations,
    allVarietes,
    addVariete,
    allZones,
  } = useContext(GlobalContext)

  const reducer = (state, action) => {
    let variete
    switch (action.type) {
      case 'ON_SPECULATION_CHANGE':
        variete = allVarietes.find(
          (v) => v.speculation.idSpeculation === action.payload.idSpeculation,
        )
        console.log('VARIETE ZONE', variete.zone)
        console.log('STATE ZONE', state.zone)
        console.log(
          'CORRESPONDING V:',
          allVarietes.find(
            (v) => v.speculation.idSpeculation === action.payload.idSpeculation,
          ),
        )
        return {
          ...state,
          speculation: action.payload,
          variete,
          longueurCycle: variete.longueurCycle,
          zone: variete.zone,
        }
      case 'ON_VARIETE_CHANGE':
        variete = allVarietes.find(
          (v) => v.idVariete === action.payload.idVariete,
        )
        console.log('VARIETE ZONE', variete.zone)
        console.log('STATE ZONE', state.zone)
        return {
          ...state,
          variete,
          longueurCycle: variete.longueurCycle,
          zone: variete.zone,
        }
      case 'ON_STOCK_CHANGE':
        return {
          ...state,
          stockDeSecurite: action.payload,
        }
      default:
        break
    }
  }

  const initialState = {
    variete: {
      idVariete: 1,
      nomVariete: 'Sahel 108',
    },
    speculation: {
      idSpeculation: 1,
      nomSpeculation: 'riz',
      imageSpeculation: riz,
    },
    zone: {
      nomZone: 'Vallée du Fleuve Sénégal',
      idZone: 1,
    },
    stockDeSecurite: 200,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleChange = (e) => {
    let { name, value } = e.target
    dispatch({ type: `ON_${name}_CHANGE`, payload: value })
  }

  const handleSubmit = () => {
    for (let [, value] of Object.entries(state)) {
      if (value === '') return
    }

    let newVariete = {
      ...state.variete,
      ...state,
      id: state.variete.idVariete + Math.round(Math.random() * 100),
    }

    console.log('NEW VARIETE:', newVariete)
    addVariete(newVariete)
  }

  ipcRenderer.on(eventResponse.variete.gotAll, (e, data) => {
    console.log('EVENT', e)
    console.log('DATA', data)
  })

  const handleIPC = () => {
    console.log('BEFORE IPC')
    ipcRenderer.send(events.variete.getAll)
    console.log('AFTER IPC')
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Grid container spacing={6} justify="space-between">
            <Grid item sm={3}>
              <Typography variant="button">Nos Spéculations</Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography variant="button">Ajouter Une Spéculation</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item sm={9}>
              <SingleLineGridList
                data={speculations.map(
                  ({ imageSpeculation, nomSpeculation }) => ({
                    img: imageSpeculation,
                    title: nomSpeculation,
                  }),
                )}
              />
            </Grid>
            <Grid item sm={3} className={classes.gridContainer}>
              <Button
                color="primary"
                variant="contained"
                className={classes.addButton}
                onClick={handleIPC}
              >
                Ajouter
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Box height={150}></Box>
        <Grid item sm={9}>
          <Typography variant="button">Nos Variétés</Typography>
          <DataTable
            columns={columns}
            rows={varietes.map((v) => ({ id: v.idVariete, ...v }))}
          />
        </Grid>
        <Grid item sm={3}>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography variant="button">Ajouter Une Variété</Typography>
          </Box>
          <Grid>
            <Grid item className={classes.gridContainer}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">
                  Spéculation
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={state.speculation || ''}
                  name="SPECULATION"
                  onChange={handleChange}
                >
                  {speculations.map((speculation) => (
                    <MenuItem
                      key={speculation.idSpeculation}
                      value={speculation}
                    >
                      {speculation.nomSpeculation}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item className={classes.gridContainer}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">
                  Variétés
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={state.variete || ''}
                  name="VARIETE"
                  onChange={handleChange}
                >
                  {allVarietes
                    .filter(
                      (variete) =>
                        variete.speculation.idSpeculation ===
                        state.speculation.idSpeculation,
                    )
                    .map((variete) => (
                      <MenuItem key={variete.idVariete} value={variete}>
                        {variete.nomVariete}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item className={classes.gridContainer}>
              <TextField
                label="Stock de sécurité"
                id="state.filstockDeSecurite-star || ''t -adornment"
                name="STOCK"
                value={state.stockDeSecurite || ''}
                className={clsx(classes.margin, classes.textField)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Kg</InputAdornment>
                  ),
                }}
                variant="filled"
                onChange={handleChange}
              />
            </Grid>
            <Grid item className={classes.gridContainer}>
              <TextField
                label="Longueur cycle"
                id="state.fillongueurCycle-star || ''t -adornment"
                name="CYCLE"
                value={state.longueurCycle || ''}
                className={clsx(classes.margin, classes.textField)}
                disabled
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Jours</InputAdornment>
                  ),
                }}
                variant="filled"
              />
            </Grid>
            <Grid item className={classes.gridContainer}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">
                  Zone
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={state.zone || ''}
                  name="ZONE"
                  disabled
                >
                  {allZones.map((zone) => (
                    <MenuItem key={zone.idZone} value={zone}>
                      {zone.nomZone}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item className={classes.gridContainer}>
              <Button
                color="primary"
                variant="contained"
                className={classes.addButton}
                onClick={handleSubmit}
              >
                Ajouter
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
