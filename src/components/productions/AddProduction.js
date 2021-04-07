import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { Box, Button, Grid, TextField, Typography } from '@material-ui/core'
const { ipcRenderer } = window.require('electron')
const { events, eventResponse } = require('../../store/utils/events')

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(1),
    width: '50ch',
  },
  margin: {
    marginBottom: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '50ch',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  addButton: {
    width: '20ch',
    margin: theme.spacing(2),
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    padding: theme.spacing(3, 3, 3),
    marginLeft: theme.spacing('50'),
    marginRight: theme.spacing('50'),
    marginBottom: theme.spacing('7'),
  },
}))

function AddProduction({ handleClose }) {
  const classes = useStyles()
  const [formData, setFormData] = useState({})
  const [varietes, setVarietes] = useState([])
  const [magasins, setMagasin] = useState([])
  const [localisations, setLocalisation] = useState([])
  const [niveau, setNiveau] = useState([])

  const handleChange = (evt) => {
    const value = evt.target.value
    setFormData({
      ...formData,
      [evt.target.name]: value,
    })
  }

  const getVarietesInstitution = () => {
    ipcRenderer.send(events.varieteInstitution.getAll, { institutionId: 4 })
    ipcRenderer.on(eventResponse.varieteInstitution.gotAll, (event, data) => {
      setVarietes(data)
    })
  }
  const getMagasins = () => {
    ipcRenderer.send(events.magasin.getAll)
    ipcRenderer.on(eventResponse.magasin.gotAll, (event, data) => {
      setMagasin(data)
    })
  }
  const getLocalisations = () => {
    ipcRenderer.send(events.localisation.getAll)
    ipcRenderer.on(eventResponse.localisation.gotAll, (event, data) => {
      setLocalisation(data)
    })
  }
  const getNiveau = () => {
    ipcRenderer.send(events.niveauInstitution.getAll, { institutionId: 4 })
    ipcRenderer.on(eventResponse.niveauInstitution.gotAll, (event, data) => {
      setNiveau(data)
    })
  }

  const handleSubmitProduction = (evt) => {
    const data = { ...formData, institutionId: 4 }
    console.log(data)
    ipcRenderer.send(events.production.create, data)
    handleClose()
  }

  useEffect(() => {
    getVarietesInstitution()
    getMagasins()
    getLocalisations()
    getNiveau()
  }, [])

  return (
    <div className={classes.modal}>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant="button">Ajouter Une Production</Typography>
      </Box>
      <Grid>
        <Grid item className={classes.gridContainer}>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">
              Variétés
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={formData.varieteInstitutionId}
              name="varieteInstitutionId"
              onChange={handleChange}
            >
              {varietes.map((variete) => (
                <MenuItem
                  key={variete.idVarieteInstitution}
                  value={variete.idVarieteInstitution}
                >
                  {variete.Variete.nomVariete}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item className={classes.gridContainer}>
          <TextField
            label="Quantité Produite"
            id="state.filstockDeSecurite-star || ''t -adornment"
            name="quantiteProduite"
            value={formData.quantiteProduite || ''}
            type="number"
            className={clsx(classes.margin, classes.textField)}
            variant="filled"
            onChange={handleChange}
          />
        </Grid>

        <Grid item className={classes.gridContainer}>
          <TextField
            label="Quantité Disponible"
            id="state.filstockDeSecurite-star || ''t -adornment"
            name="quantiteDisponible"
            value={formData.quantiteDisponible || ''}
            type="number"
            className={clsx(classes.margin, classes.textField)}
            variant="filled"
            onChange={handleChange}
          />
        </Grid>

        <Grid item className={classes.gridContainer}>
          <TextField
            label="Prix Unitaire"
            id="state.filstockDeSecurite-star || ''t -adornment"
            name="prixUnitaire"
            value={formData.prixUnitaire}
            type="number"
            className={clsx(classes.margin, classes.textField)}
            variant="filled"
            onChange={handleChange}
          />
        </Grid>

        
          <Grid item className={classes.gridContainer}>
          <TextField
          label="Stock de Securite"
            id="state.fillongueurCycle-star || ''t -adornment"
            name="stockDeSecurite"
            value={''}
            className={clsx(classes.margin, classes.textField)}
            variant="filled"
            onChange={handleChange}
            />
          </Grid>
         

        <Grid item className={classes.gridContainer}>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">
              Localisation
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={formData.localisationId}
              name="localisationId"
              onChange={handleChange}
            >
              {localisations.map((localisation) => (
                <MenuItem
                  key={localisation.idLocalisation}
                  value={localisation.idLocalisation}
                >
                  {localisation.commune}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item className={classes.gridContainer}>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">
              Magasin
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={formData.magasinId}
              name="magasinId"
              onChange={handleChange}
            >
              {magasins.map((magasin) => (
                <MenuItem key={magasin.idMagasin} value={magasin.idMagasin}>
                  {magasin.nomMagasin}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item className={classes.gridContainer}>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">
              Niveau Semences
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={formData.niveauInstitutionId}
              name="niveauInstitutionId"
              onChange={handleChange}
            >
              {niveau.map((niveau) => (
                <MenuItem
                  key={niveau.idNiveauInstitution}
                  value={niveau.idNiveauInstitution}
                >
                  {niveau.NiveauDeProduction.nomNiveau}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item className={classes.gridContainer}>
          <TextField
            id="dateDeProduction"
            label="Date de Production"
            type="date"
            onChange={handleChange}
            name="dateDeProduction"
            defaultValue="now"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item className={classes.gridContainer}>
          <Button
            color="secondary"
            variant="contained"
            className={classes.addButton}
            onClick={handleClose}
          >
            Annuler
          </Button>

          <Button
            color="primary"
            variant="contained"
            className={classes.addButton}
            onClick={handleSubmitProduction}
          >
            Ajouter
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default AddProduction