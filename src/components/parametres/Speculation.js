import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Button, Grid } from "@material-ui/core";
import { GlobalContext } from "../../store/GlobalProvider";
import SingleLineGridList from "../common/SingleLineGridList";
import ConfirmDialog from "../common/ConfirmDialog";
import { SpeculationInstitutionContext } from "../../store/speculationInstitution/provider";

const { events, eventResponse } = require("../../store/utils/events");
const { ipcRenderer } = window.require("electron");

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(1),
    width: "25ch",
  },
  addButton: {
    width: "25ch",
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "flex-start",
    alignItems: "end",
  },
  secondaryScroll: {
    "*::-webkit-scrollbar-thumb": {
      background: theme.palette.primary.secondary,
    },
    "*::-webkit-scrollbar-thumb:hover": {
      background: theme.palette.primary.main,
    },
  },
}));

export default function Speculation() {
  const classes = useStyles();

  const {
    speculationsInstitution,
    addSpeculationInstitution,
    deleteByIdSpeculationInstitution,
  } = useContext(SpeculationInstitutionContext);

  const {
    speculations,
    openConfirmDialog,
    institution,
    getAllSpeculation,
    getAllLocalisation,
  } = useContext(GlobalContext);

  useEffect(() => {
    getAllSpeculation();
    getAllLocalisation();

    return () => {
      ipcRenderer.removeAllListeners([
        eventResponse.speculation.gotAll,
        events.speculation.getAll,
        eventResponse.localisation.gotAll,
        events.localisation.getAll,
      ]);
    };
  }, []);

  const [state, setState] = useState("");

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState(value);
    console.log("SPECULATION", { name, value });
  };

  const handleSubmit = (e) => {
    console.log("NEW SPECULATION", state);
    addSpeculationInstitution({
      speculationId: state.idSpeculation,
      institutionId: institution.idInstitution,
      ...state,
    });
  };

  const handleDialogClose = (res, data) => {
    if (res === "yes") {
      try {
        return deleteByIdSpeculationInstitution(data);
      } catch (error) {
        console.error(error);
      }
    }
    return;
  };

  return (
    <>
      <ConfirmDialog handleClose={handleDialogClose} />
      <Grid container spacing={2}>
        <Grid item sm={9} className={classes.secondaryScroll}>
          <SingleLineGridList
            data={speculationsInstitution.map((speculation) => ({
              img: speculation.Speculation.imageSpeculation,
              title: speculation.Speculation.nomSpeculation,
              onClick: () => {
                const removeAssociations = (obj) => {
                  let result = {};
                  for (let [key, value] of Object.entries(obj)) {
                    if (typeof value !== "object") {
                      result[key] = value;
                    }
                  }
                  return result;
                };

                console.log(removeAssociations(speculation))
                openConfirmDialog({
                  title: "Suppression",
                  content: `Souhaitez vous réellement supprimer la spéculation ${speculation.Speculation.nomSpeculation} ?\nAttention! Vous devez d'abord supprimer tous les produits qui en dépendent.`,
                  data: removeAssociations(speculation),
                });
              },
            }))}
          />
        </Grid>
        <Grid
          item
          container
          sm={3}
          className={classes.gridContainer}
          justify="flex-wrap"
        >
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel color="secondary">Spéculations</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={state || ""}
              name="ALL_SPECULATION"
              color="secondary"
              onChange={handleChange}
            >
              {speculations
                .filter(
                  (s) =>
                    !speculationsInstitution
                      .map((si) => si.speculationId)
                      .includes(s.idSpeculation)
                )
                .map((speculation) => (
                  <MenuItem key={speculation.idSpeculation} value={speculation}>
                    {speculation.nomSpeculation}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button
            color="secondary"
            variant="contained"
            className={classes.addButton}
            onClick={handleSubmit}
          >
            Ajouter
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
