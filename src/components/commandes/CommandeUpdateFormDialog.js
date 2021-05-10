import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { GlobalContext } from "../../store/GlobalProvider";
import { FormHelperText, makeStyles } from "@material-ui/core";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  FilledInput,
  InputAdornment,
} from "@material-ui/core";
import DatePicker from "../common/DatePicker";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(1),
    // width: "25ch",
  },
  formDialog: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
}));

function CommandeUpdateFormDialog({ handleClose }) {
  const {
    commandeUpdateFormDialog: { open, data },
    closeCommandeUpdateFormDialog,
    institution,
  } = useContext(GlobalContext);

  const [formState, setFormState] = useState({});

  const [productions, setProductions] = useState([]);
  const [speculations, setSpeculations] = useState([]);
  const [etats, setEtats] = useState([]);
  const [niveauxInstitution, setNiveauxInstitution] = useState([]);

  const getEtats = () => {
    ipcRenderer.send(events.etatCommande.getAll);

    ipcRenderer.once(eventResponse.etatCommande.gotAll, (event, data) => {
      setEtats(data);
    });
  };

  const getAllProductions = () => {
    ipcRenderer.send(events.production.getAll, {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once(eventResponse.production.gotAll, (event, data) => {
      setProductions(data);

      setSpeculations([
        ...new Set(
          data.map(
            (production) =>
              production.VarieteInstitution.SpeculationInstitution.Speculation
                .nomSpeculation
          )
        ),
      ]);

      setNiveauxInstitution([
        ...new Set(
          data.map(
            (production) =>
              production.NiveauInstitution.NiveauDeProduction.nomNiveau
          )
        ),
      ]);
    });
  };

  useEffect(() => {
    getAllProductions();
    getEtats();
  }, []);

  useEffect(() => {
    open && data && console.log(data);
    console.log(data?.production);
    setFormState({
      idCommande: data?.idCommande,
      clientId: data?.clientId,
      etatId: data?.etatId,
      niveau: data?.Production.NiveauInstitution.NiveauDeProduction.nomNiveau,
      speculation:
        data?.Production.VarieteInstitution.SpeculationInstitution.Speculation
          .nomSpeculation,
      production: data?.Production,
      productionId: data?.productionId,
      quantite: data?.quantite,
      dateExpressionBesoinClient: new Date(
        data?.dateExpressionBesoinClient.toISOString()
      ),
      dateEnlevementSouhaitee: new Date(
        data?.dateEnlevementSouhaitee.toISOString()
      ),
    });
  }, [open, data]);

  const classes = useStyles();

  const close = (response, dataFromOpen = null) => {
    closeCommandeUpdateFormDialog();
    const newCommande = {
      idCommande: dataFromOpen?.idCommande,
      clientId: dataFromOpen?.clientId,
      etatId: dataFromOpen?.etatId,
      productionId: dataFromOpen?.productionId,
      quantite: dataFromOpen?.quantite,
      montant: dataFromOpen?.quantite * dataFromOpen?.production?.prixUnitaire,
      dateExpressionBesoinClient: dataFromOpen?.dateExpressionBesoinClient,
      dateEnlevementSouhaitee: dataFromOpen?.dateEnlevementSouhaitee,
    };
    console.log(newCommande);
    handleClose(response, newCommande);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "productionId") {
      setFormState({
        ...formState,
        [name]: value,
        production: productions.find((p) => p.idProduction === parseInt(value)),
      });
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Modifier commande</DialogTitle>
        <DialogContent className={classes.formDialog}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item sm={12}>
              <FormControl
                fullWidth
                variant="filled"
                className={classes.formControl}
              >
                <InputLabel id="client-label" color="secondary">
                  Client
                </InputLabel>
                <Select
                  labelId="client-label"
                  id="client-select"
                  value={formState.clientId || ""}
                  name="client"
                  margin="dense"
                  color="secondary"
                  disabled
                  fullWidth
                  onChange={handleChange}
                >
                  {
                    <MenuItem
                      key={formState?.clientId}
                      value={formState?.clientId}
                    >
                      {data?.Client?.nomCompletStructure ||
                        `${data?.Client?.prenom} ${data?.Client?.nom}`}
                    </MenuItem>
                  }
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={12}>
              <FormControl
                fullWidth
                margin="dense"
                variant="filled"
                className={classes.formControl}
              >
                <InputLabel id="Etat-label">Etat</InputLabel>
                <Select
                  labelId="Etat-label"
                  id="Etat-select"
                  value={formState?.etatId || ""}
                  name="etatId"
                  onChange={handleChange}
                  fullWidth
                >
                  {formState.etatId === 6 // Insuffisant
                    ? etats
                        .filter(
                          (etatCommande) =>
                            etatCommande.idEtat === 6 ||
                            etatCommande.idEtat === 2
                        )
                        .map((etatCommande) => (
                          <MenuItem
                            key={etatCommande.idEtat}
                            value={etatCommande.idEtat}
                          >
                            {etatCommande.etat}
                          </MenuItem>
                        ))
                    : formState.etatId === 2 // Rejeté
                    ? etats
                        .filter((etatCommande) => {
                          if(formState.production.quantiteDisponible >= formState.quantite) {
                            return (
                              etatCommande.idEtat === 2 ||
                              etatCommande.idEtat === 1 ||
                              etatCommande.idEtat === 4
                            );
                          } else {
                            return (
                              etatCommande.idEtat === 2 ||
                              etatCommande.idEtat === 6 
                            );
                          }
                          
                        })
                        .map((etatCommande) => (
                          <MenuItem
                            key={etatCommande.idEtat}
                            value={etatCommande.idEtat}
                          >
                            {etatCommande.etat}
                          </MenuItem>
                        ))
                    : etats.map((etatCommande) => (
                        <MenuItem
                          key={etatCommande.idEtat}
                          value={etatCommande.idEtat}
                        >
                          {etatCommande.etat}
                        </MenuItem>
                      ))}
                </Select>
                <FormHelperText>Etat</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item sm={12}>
              <FormControl
                fullWidth
                margin="dense"
                variant="filled"
                className={classes.formControl}
              >
                <InputLabel id="Niveau-label">Niveau</InputLabel>
                <Select
                  labelId="Niveau-label"
                  id="Niveau-select"
                  value={formState?.niveau || ""}
                  name="niveau"
                  onChange={handleChange}
                  fullWidth
                >
                  {niveauxInstitution.map((niveau) => (
                    <MenuItem key={niveau} value={niveau}>
                      {niveau}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Niveau de production</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <FormControl
                fullWidth
                margin="dense"
                variant="filled"
                className={classes.formControl}
              >
                <InputLabel id="Spéculation-label">Spéculation</InputLabel>
                <Select
                  labelId="Spéculation-label"
                  id="Spéculation-select"
                  value={formState?.speculation || ""}
                  name="speculation"
                  onChange={handleChange}
                >
                  {speculations.map((speculation) => (
                    <MenuItem key={speculation} value={speculation}>
                      {speculation}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Spéculation désirée</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <FormControl
                fullWidth
                margin="dense"
                variant="filled"
                className={classes.formControl}
              >
                <InputLabel id="Production-label">Production</InputLabel>
                <Select
                  labelId="Production-label"
                  id="Production-select"
                  value={formState?.productionId || ""}
                  name="productionId"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  {productions?.map((production) => {
                    if (
                      production?.VarieteInstitution?.SpeculationInstitution
                        ?.Speculation?.nomSpeculation ===
                        formState.speculation &&
                      production?.NiveauInstitution?.NiveauDeProduction
                        .nomNiveau === formState.niveau
                    )
                      return (
                        <MenuItem
                          key={production?.idProduction}
                          value={production?.idProduction}
                        >
                          {`${production?.VarieteInstitution?.Variete?.nomVariete} - ${production?.Localisation?.village}`}
                        </MenuItem>
                      );
                  })}
                </Select>
                <FormHelperText>
                  Production commandée{" "}
                  {formState?.production?.VarieteInstitution?.Variete
                    ?.nomVariete
                    ? ` - ${formState?.production?.prixUnitaire} FCFA`
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <FormControl variant="filled" fullWidth>
                <InputLabel id="Quantité-label" color="secondary">
                  Quantité
                </InputLabel>

                <FilledInput
                  value={formState.quantite || ""}
                  onChange={handleChange}
                  autoFocus
                  margin="dense"
                  id="quantite"
                  name="quantite"
                  type="number"
                  color="secondary"
                  inputProps={{
                    min: 0,
                    step: 100,
                  }}
                  endAdornment={
                    <InputAdornment position="end">Kg</InputAdornment>
                  }
                />
                <FormHelperText>
                  Quantité désirée pour cette production
                </FormHelperText>
              </FormControl>{" "}
            </Grid>
            <Grid item sm={12}>
              <DatePicker
                variant="filled"
                label="Date d'expression du besoin par le client"
                disableFuture={true}
                fullWidth={true}
                selectedDate={formState.dateExpressionBesoinClient}
                handleChange={handleChange}
                format="d MMMM yyyy"
                name="dateExpressionBesoinClient"
                disabled={true}
                firstValue={formState.dateExpressionBesoinClient}
              />
            </Grid>
            <Grid item sm={12}>
              <DatePicker
                variant="filled"
                label="Date d'enlèvement souhaité par le client"
                // disablePast={true}
                fullWidth={true}
                selectedDate={formState.dateEnlevementSouhaitee}
                handleChange={handleChange}
                format="d MMMM yyyy"
                name="dateEnlevementSouhaitee"
                firstValue={formState.dateEnlevementSouhaitee}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => close("no", formState)} color="secondary">
            Annuler
          </Button>
          <Button onClick={() => close("yes", formState)} color="primary">
            Entregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CommandeUpdateFormDialog;
