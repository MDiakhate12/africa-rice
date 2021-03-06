import { useCallback, useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
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
    institution,
    productionFormDialog: { open, title, data },
    closeProductionFormDialog,
  } = useContext(GlobalContext);

  const close = (response, dataFromOpen = null, title) => {
    closeProductionFormDialog();
    handleClose(response, dataFromOpen, title);
  };

  const classes = useStyles();
  const [formData, setFormData] = useState({
    dateDeProduction: new Date().toISOString(),
  });
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

  const getVarietesInstitution = useCallback(() => {
    ipcRenderer.send(events.varieteInstitution.getAll, {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once(eventResponse.varieteInstitution.gotAll, (event, data) => {
      setVarietes(data);
      console.log(data);
    });
  }, []);

  const getSpeculationsInstitution = () => {
    ipcRenderer.send(events.speculationInstitution.getAll, {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once(
      eventResponse.speculationInstitution.gotAll,
      (event, data) => {
        setSpeculation(data);
        console.log(data);
      }
    );
  };

  const getMagasins = () => {
    ipcRenderer.send(events.magasin.getAll, {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once(eventResponse.magasin.gotAll, (event, data) => {
      setMagasin(data);
    });
  };

  const getLocalisations = useCallback(() => {
    ipcRenderer.send(events.localisation.getAll);
    ipcRenderer.once(eventResponse.localisation.gotAll, (event, data) => {
      setLocalisation(data);
    });
  }, []);

  const getNiveau = () => {
    ipcRenderer.send(events.niveauInstitution.getAll, {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once(eventResponse.niveauInstitution.gotAll, (event, data) => {
      setNiveau(data);
    });
  };

  useEffect(() => {
    getSpeculationsInstitution();
    getVarietesInstitution();
    getMagasins();
    getLocalisations();
    getNiveau();
  }, [institution]);

  useEffect(() => {
    console.log(data);

    console.log(formData)

    if (data && open) {
      console.log(data);
      setFormData({
        idProduction: data.idProduction,
        speculationInstitutionId:
          data.VarieteInstitution.speculationInstitutionId,
        varieteInstitutionId: data.varieteInstitutionId,
        quantiteProduite: data.quantiteProduite,
        quantiteDisponible: data.quantiteDisponible,
        prixUnitaire: data.prixUnitaire,
        stockDeSecurite: data.stockDeSecurite,
        region: data.Localisation.region,
        departement: data.Localisation.departement,
        commune: data.Localisation.commune,
        localisationId: data.localisationId,
        magasinId: data.magasinId,
        niveauInstitutionId: data.niveauInstitutionId,
      });
    }
  }, [open, data]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        fullWidth
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {" "}
          <Typography variant="button">{title}</Typography>
        </DialogTitle>
        <DialogContent>
          <div className={classes.modal}>
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
                    value={
                      formData.speculationInstitutionId ||
                      data?.VarieteInstitution.speculationInstitutionId ||
                      ""
                    }
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
                    Vari??t??s
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    margin="dense"
                    id="demo-simple-select-filled"
                    value={
                      formData.varieteInstitutionId ||
                      data?.varieteInstitutionId ||
                      ""
                    }
                    name="varieteInstitutionId"
                    onChange={handleChange}
                  >
                    {varietes
                      .filter(
                        (variete) =>
                          variete.speculationInstitutionId ===
                            formData.speculationInstitutionId ||
                          (data &&
                            variete.speculationInstitutionId ===
                              data.VarieteInstitution.speculationInstitutionId)
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
                  label="Quantit?? Produite"
                  fullWidth
                  margin="dense"
                  id="state.filstockDeSecurite-star || ''t -adornment"
                  name="quantiteProduite"
                  value={
                    formData.quantiteProduite || data?.quantiteProduite || ""
                  }
                  type="number"
                  inputProps={{
                    min: 0,
                    step: 100,
                  }}
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
              {/*
                <Grid item sm={12}>
                  <TextField
                    label="Quantit?? Disponible"
                    fullWidth
                    margin="dense"
                    id="state.filstockDeSecurite-star || ''t -adornment"
                    name="quantiteDisponible"
                    value={formData.quantiteDisponible || data?.quantiteDisponible || "" || ''}
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
                */}
              <Grid item sm={12}>
                <TextField
                  label="Prix Unitaire"
                  fullWidth
                  margin="dense"
                  id="state.filstockDeSecurite-star || ''t -adornment"
                  name="prixUnitaire"
                  value={formData.prixUnitaire || data?.prixUnitaire || ""}
                  type="number"
                  inputProps={{
                    min: 0,
                    step: 25,
                  }}
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
                  value={
                    formData.stockDeSecurite || data?.stockDeSecurite || ""
                  }
                  className={classes.marginDense}
                  variant="filled"
                  onChange={handleChange}
                  type="number"
                  inputProps={{
                    min: 0,
                    step: 10,
                  }}
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
                  <InputLabel color="secondary">R??gion</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    margin="dense"
                    id="demo-simple-select-filled"
                    value={formData.region || data?.Localisation.region || ""}
                    name="region"
                    color="secondary"
                    onChange={handleChange}
                  >
                    {localisations
                      .map((l) => l.region.toLowerCase())
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
                  <InputLabel color="secondary">D??partement</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    margin="dense"
                    id="demo-simple-select-filled"
                    value={
                      formData.departement ||
                      data?.Localisation.departement ||
                      ""
                    }
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
                        return null;
                      })
                      .map((d, i, s) => {
                        if (d !== null && s.indexOf(d) === i)
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
                    value={formData.commune || data?.Localisation.commune || ""}
                    name="commune"
                    color="secondary"
                    onChange={handleChange}
                  >
                    {localisations
                      .map((l) => {
                        if (
                          l?.departement?.toLowerCase() ===
                            formData?.departement?.toLowerCase() ||
                          (data &&
                            l?.departement?.toLowerCase() ===
                              data.Localisation.departement.toLowerCase())
                        )
                          return l.commune;
                        return null;
                      })
                      .map((c, i, s) => {
                        if (c !== null && s.indexOf(c) === i)
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
                  <InputLabel color="secondary">Localit??</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    margin="dense"
                    id="demo-simple-select-filled"
                    value={
                      formData.localisationId ||
                      data?.localisationId ||
                      "" ||
                      ""
                    }
                    name="localisationId"
                    color="secondary"
                    onChange={handleChange}
                  >
                    {localisations.map((l) => {
                      if (
                        l?.commune?.toLowerCase() ===
                          formData?.commune?.toLowerCase() ||
                        (data &&
                          l?.commune?.toLowerCase() ===
                            data.Localisation?.commune?.toLowerCase())
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
                    value={formData.magasinId || data?.magasinId || ""}
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
                    value={
                      formData.niveauInstitutionId ||
                      data?.niveauInstitutionId ||
                      ""
                    }
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
              {/* {data?.dateDeProduction.toISOString()} */}
              <Grid item sm={12}>
                <DatePicker
                  id="dateDeProduction"
                  variant="filled"
                  label="Date de production"
                  disableFuture={true}
                  fullWidth={true}
                  selectedDate={
                    formData?.dateDeProduction ||
                    data?.dateDeProduction?.toISOString()
                  }
                  handleChange={handleChange}
                  format="d MMMM yyyy"
                  name="dateDeProduction"
                  firstValue={
                    formData?.dateDeProduction ||
                    data?.dateDeProduction?.toISOString()
                  }
                />
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => close("no", formData, title)} color="primary">
            Annuler
          </Button>
          <Button onClick={() => close("yes", formData, title)} color="primary">
            Entregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
