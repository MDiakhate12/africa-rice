import React, { useContext, useEffect, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Box, Button, Grid, IconButton, Typography } from "@material-ui/core";
import DataTable from "../common/DataTable";
import { GlobalContext } from "../../store/GlobalProvider";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmDialog from "../common/ConfirmDialog";
import { VarieteInstitutionContext } from "../../store/varieteInstitution/provider";
import { SpeculationInstitutionContext } from "../../store/speculationInstitution/provider";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(1),
    width: "25ch",
  },
  margin: {
    marginBottom: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  addButton: {
    width: "29ch",
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Variete() {
  const { varietes, institution, openConfirmDialog } = useContext(GlobalContext);

  const columns = [
    { type: "string", field: "id", headerName: "idVariete", hide: true },
    {
      type: "string",
      field: "variete",
      headerName: "Variété",
      width: 170,
      renderCell: (params) => params.getValue("Variete").nomVariete,
    },
    {
      type: "string",
      field: "speculation",
      headerName: "Spéculation",
      width: 130,
      renderCell: (params) =>
        params.getValue("Variete").Speculation.nomSpeculation,
    },
    {
      type: "number",
      field: "longueurCycle",
      headerName: "Cycle",
      width: 100,
      renderCell: (params) => params.getValue("Variete").longueurCycle,
    },
    {
      type: "string",
      field: "zone",
      headerName: "Zone",
      width: 100,
      renderCell: (params) =>
        params.getValue("Variete").ZoneAgroEcologique.nomZone,
    },
    {
      type: "string",
      field: "delete",
      headerName: "Supprimer",
      width: 120,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            openConfirmDialog({
              title: "Suppression",
              content: `Souhaitez vous réellement supprimer la variété ${
                params.getValue("Variete").nomVariete
              } ?\nAttention! Vous devez d'abord supprimer tous les produits qui en dépendent.`,
              data: params.getValue("idVarieteInstitution"),
            });
            console.log(params.getValue("idVarieteInstitution"));
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const classes = useStyles();

  const {
    varietesInstitution,
    addVarieteInstitution,
    deleteByIdVarieteInstitution,
  } = useContext(VarieteInstitutionContext);

  const { speculationsInstitution } = useContext(SpeculationInstitutionContext);

  const reducer = (state, action) => {
    let { name, value } = action.payload;
    let variete;

    switch (action.type) {
      case "ON_SPECULATIONINSTITUTION_CHANGE":
        // console.log(value)
        variete = varietes.find(
          (v) => v.speculationId === value.Speculation?.idSpeculation
        );
        console.log(variete?.ZoneAgroEcologique);
        return {
          ...state,
          [name]: value,
          variete,
        };
      case "ON_VARIETE_CHANGE":
        return {
          ...state,
          [name]: value,
        };
      default:
        break;
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    // console.log(name, value);
    dispatch({
      type: `ON_${name.toUpperCase()}_CHANGE`,
      payload: { name, value },
    });
  };

  const handleSubmit = (e) => {
    if (!state.variete || !state.speculationInstitution) {
      return;
    }

    let newVarieteInstitution = {
      speculationInstitutionId:
        state.speculationInstitution.idSpeculationInstitution,
      varieteId: state.variete.idVariete,
      institutionId: state.idInstitution,
    };

    console.log(newVarieteInstitution);
    addVarieteInstitution(newVarieteInstitution);
  };

  const handleDialogClose = (res, data) => {
    if (res === "yes") {
      try {
        return deleteByIdVarieteInstitution(data);
      } catch (error) {
        console.error(error);
      }
    }
    return;
  };

  let initialState = {
    speculationInstitution: {},
    variete: {},
    idInstitution: institution?.idInstitution,
  };


  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <ConfirmDialog handleClose={handleDialogClose} />
      <Grid item sm={9}>
        <Typography variant="button">Nos Variétés</Typography>
        <DataTable
          columns={columns}
          rows={varietesInstitution.map((v) => ({
            id: v.idVarieteInstitution,
            ...v,
          }))}
        />
      </Grid>
      <Grid item sm={3}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
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
                value={state.speculationInstitution || ""}
                name="speculationInstitution"
                onChange={handleChange}
              >
                {speculationsInstitution.map((si) => (
                  <MenuItem key={si.idSpeculationInstitution} value={si}>
                    {si.Speculation.nomSpeculation}
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
                value={state.variete || ""}
                name="variete"
                onChange={handleChange}
              >
                {varietes
                  .filter(
                    // Only display variete not chosen yet
                    (v) =>
                      !varietesInstitution
                        .map((vi) => vi.varieteId)
                        .includes(v.idVariete)
                  )
                  .filter(
                    // Only display varietes of the speculations of te institution
                    (v) =>
                      speculationsInstitution.find(
                        (si) =>
                          si.idSpeculationInstitution ===
                          state.speculationInstitution.idSpeculationInstitution
                      )?.speculationId === v.speculationId
                  )
                  .map((variete) => {
                    return (
                      <MenuItem key={variete.idVariete} value={variete}>
                        {variete.nomVariete}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item className={classes.gridContainer}>
            <TextField
              label="Stock de sécurité"
              id="state.filstockDeSecurite-star || ''t -adornment"
              name="stock"
              value={state.stockDeSecurite || ""}
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
              label="Prix"
              id="state.fillongueurCycle-star || ''t -adornment"
              name="prix"
              value={state.prix || ""}
              className={clsx(classes.margin, classes.textField)}
              disabled
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">FCFA</InputAdornment>
                ),
              }}
              variant="filled"
            />
          </Grid> */}

          {/* <Grid item className={classes.gridContainer}>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="zone-label">Zone</InputLabel>
              <Select
                labelId="zone-label"
                id="zone"
                value={state.zone || ""}
                name="zone"
                onChange={handleChange}
              >
                {zones.map((zone) => {
                  return (
                    <MenuItem key={zone.idZone} value={zone}>
                      {zone.nomZone}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid> */}
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
    </>
  );
}
