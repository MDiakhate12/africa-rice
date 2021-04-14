import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { GlobalContext } from "../../store/GlobalProvider";
import DatePicker from "../common/DatePicker";

const useStyles = makeStyles((theme) => ({
  marginDense: {
    margin: theme.spacing(0),
  },
  withoutLabel: {
    // marginTop: theme.spacing(3),
  },

  selectEmpty: {
    // marginTop: theme.spacing(2),
  },
  addButton: {
    width: "20ch",
    // margin: theme.spacing(2),
  },
  // gridContainer: {
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  modal: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[4],
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    // marginLeft: theme.spacing('50'),
    // marginRight: theme.spacing('50'),
    // marginBottom: theme.spacing('7'),
  },
}));

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

export default function ProductionFormDialog({ handleClose }) {
  const {
    productionFormDialog: { open },
    closeProductionFormDialog,
  } = useContext(GlobalContext);

  const close = (response, dataFromOpen = null) => {
    closeProductionFormDialog();
    handleClose(response, dataFromOpen);
  };

  const classes = useStyles();
  const [formData, setFormData] = useState({});
  const [speculations, setSpeculation] = useState([]);
  const [varietes, setVarietes] = useState([]);
  const [magasins, setMagasin] = useState([]);
  const [localisations, setLocalisation] = useState([]);
  const [niveau, setNiveau] = useState([]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    console.log(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getVarietesInstitution = () => {
    ipcRenderer.send(events.varieteInstitution.getAll, { institutionId: 1 });
    ipcRenderer.on(eventResponse.varieteInstitution.gotAll, (event, data) => {
      setVarietes(data);
      console.log(data);
    });
  };
  const getSpeculationsInstitution = () => {
    ipcRenderer.send(events.speculationInstitution.getAll, {
      institutionId: 1,
    });
    ipcRenderer.on(
      eventResponse.speculationInstitution.gotAll,
      (event, data) => {
        setSpeculation(data);
        console.log(data);
      }
    );
  };
  const getMagasins = () => {
    ipcRenderer.send(events.magasin.getAll);
    ipcRenderer.on(eventResponse.magasin.gotAll, (event, data) => {
      setMagasin(data);
    });
  };
  const getLocalisations = () => {
    ipcRenderer.send(events.localisation.getAll);
    ipcRenderer.on(eventResponse.localisation.gotAll, (event, data) => {
      setLocalisation(data);
    });
  };
  const getNiveau = () => {
    ipcRenderer.send(events.niveauInstitution.getAll, { institutionId: 1 });
    ipcRenderer.on(eventResponse.niveauInstitution.gotAll, (event, data) => {
      setNiveau(data);
    });
  };

  useEffect(() => {
    getSpeculationsInstitution();
    getVarietesInstitution();
    getMagasins();
    getLocalisations();
    getNiveau();
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        fullWidth
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Nouvelle Production</DialogTitle>
        <DialogContent>
          <div className={classes.modal}>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant="button">Ajouter Une Production</Typography>
            </Box>
            {/* <Grid container spacing={1} direction="column" alignItems="center"> */}
            <Grid container spacing={1}>
              <Grid item sm={12}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">
                    Speculation
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    margin="dense"
                    id="demo-simple-select-filled"
                    value={formData.speculationInstitutionId}
                    name="speculationInstitutionId"
                    onChange={handleChange}
                  >
                    {speculations.map((speculation) => (
                      <MenuItem
                        key={speculation.idSpeculationInstitution}
                        value={speculation.idSpeculationInstitution}
                      >
                        {speculation.Speculation.nomSpeculation}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={12}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">
                    Variétés
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    margin="dense"
                    id="demo-simple-select-filled"
                    value={formData.varieteInstitutionId}
                    name="varieteInstitutionId"
                    onChange={handleChange}
                  >
                    {varietes
                      .filter(
                        (variete) =>
                          variete.speculationInstitutionId ===
                          formData.speculationInstitutionId
                      )
                      .map((variete) => (
                        <MenuItem
                          key={variete.idVarieteInstitution}
                          value={variete.idVarieteInstitution}
                        >
                          {variete.Variete?.nomVariete}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={12}>
                <TextField
                  label="Quantité Produite"
                  fullWidth
                  margin="dense"
                  id="state.filstockDeSecurite-star || ''t -adornment"
                  name="quantiteProduite"
                  value={formData.quantiteProduite || ""}
                  type="number"
                  className={classes.marginDense}
                  variant="filled"
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Kg</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  label="Quantité Disponible"
                  fullWidth
                  margin="dense"
                  id="state.filstockDeSecurite-star || ''t -adornment"
                  name="quantiteDisponible"
                  value={formData.quantiteDisponible || ""}
                  type="number"
                  className={classes.marginDense}
                  variant="filled"
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Kg</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  label="Prix Unitaire"
                  fullWidth
                  margin="dense"
                  id="state.filstockDeSecurite-star || ''t -adornment"
                  name="prixUnitaire"
                  value={formData.prixUnitaire}
                  type="number"
                  className={classes.marginDense}
                  variant="filled"
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">FCFA</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  label="Stock de Securite"
                  fullWidth
                  margin="dense"
                  id="state.fillongueurCycle-star || ''t -adornment"
                  name="stockDeSecurite"
                  value={formData.stockDeSecurite}
                  className={classes.marginDense}
                  variant="filled"
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Kg</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item sm={6}>
                {" "}
                <FormControl variant="filled" fullWidth>
                  <InputLabel color="secondary">Région</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    margin="dense"
                    id="demo-simple-select-filled"
                    value={formData.region || ""}
                    name="region"
                    color="secondary"
                    onChange={handleChange}
                  >
                    {localisations
                      .map((l) => l.region?.toLowerCase())
                      .map((r, i, s) => {
                        if (s.indexOf(r) === i)
                          return (
                            <MenuItem key={r} value={r}>
                              {r}
                            </MenuItem>
                          );
                      })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel color="secondary">Département</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    margin="dense"
                    id="demo-simple-select-filled"
                    value={formData.departement || ""}
                    name="departement"
                    color="secondary"
                    onChange={handleChange}
                  >
                    {localisations
                      .map((l) => {
                        if (
                          l.region.toLowerCase() ===
                          formData.region?.toLowerCase()
                        )
                          return l.departement;
                      })
                      .map((d, i, s) => {
                        if (s.indexOf(d) === i)
                          return (
                            <MenuItem key={d} value={d}>
                              {d}
                            </MenuItem>
                          );
                      })}
                  </Select>
                </FormControl>{" "}
              </Grid>
              <Grid item sm={6}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel color="secondary">Commune</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    margin="dense"
                    id="demo-simple-select-filled"
                    value={formData.commune || ""}
                    name="commune"
                    color="secondary"
                    onChange={handleChange}
                  >
                    {localisations
                      .map((l) => {
                        if (
                          l?.departement?.toLowerCase() ===
                          formData?.departement?.toLowerCase()
                        )
                          return l.commune;
                      })
                      .map((c, i, s) => {
                        if (s.indexOf(c) === i)
                          return (
                            <MenuItem key={c} value={c}>
                              {c}
                            </MenuItem>
                          );
                      })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={6}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel color="secondary">Localité</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    margin="dense"
                    id="demo-simple-select-filled"
                    value={formData.localisationId || ""}
                    name="localisationId"
                    color="secondary"
                    onChange={handleChange}
                  >
                    {localisations.map((l) => {
                      if (
                        l?.commune?.toLowerCase() ===
                        formData?.commune?.toLowerCase()
                      ) {
                        return (
                          <MenuItem key={l.village} value={l.idLocalisation}>
                            {l.village}
                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={12}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">
                    Magasin
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    margin="dense"
                    id="demo-simple-select-filled"
                    value={formData.magasinId}
                    name="magasinId"
                    onChange={handleChange}
                  >
                    {magasins.map((magasin) => (
                      <MenuItem
                        key={magasin.idMagasin}
                        value={magasin.idMagasin}
                      >
                        {magasin.nomMagasin}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={12}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">
                    Niveau Semences
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    margin="dense"
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
              {/* <Grid item sm={12}>
                <TextField
                  id="dateDeProduction"
                  label="Date de Production"
                  type="date"
                  onChange={handleChange}
                  fullWidth
                  name="dateDeProduction"
                  defaultValue="now"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid> */}
              <Grid item sm={12}>
                <DatePicker
                  id="dateDeProduction"
                  variant="filled"
                  label="Date de production"
                  disableFuture={true}
                  fullWidth={true}
                  selectedDate={formData.dateDeProduction}
                  handleChange={handleChange}
                  format="d MMMM yyyy"
                  name="dateDeProduction"
                />
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => close("no", formData)} color="primary">
            Annuler
          </Button>
          <Button onClick={() => close("yes", formData)} color="primary">
            Entregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
