import React, { useContext, useEffect, useReducer, useState } from "react";
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
import DataTable from "../common/DataTable";
import { GlobalContext } from "../../store/GlobalProvider";
import SingleLineGridList from "../common/SingleLineGridList";
import riz from "../images/riz.jpg";

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

const columns = [
  { type: "string", field: "id", headerName: "idVariete", hide: true },
  { type: "string", field: "nomVariete", headerName: "Variété", width: 170 },
  {
    type: "string",
    field: "speculation",
    headerName: "Spéculation",
    width: 130,
    renderCell: (params) => params.getValue("speculation").nomSpeculation,
  },
  { type: "number", field: "longueurCycle", headerName: "Cycle", width: 100 },
  {
    type: "number",
    field: "stockDeSecurite",
    headerName: "Stock De Sécurite",
    width: 170,
  },
  {
    type: "string",
    field: "zone",
    headerName: "Zone",
    width: 100,
    renderCell: (params) => params.getValue("zone").nomZone,
  },
];

export default function Parametres() {
  const classes = useStyles();

  const {
    varietes,
    speculations,
    zones,
    varietesInstitution,
    speculationsInstitution,
    addVariete,
    addSpeculation,
  } = useContext(GlobalContext);

  const reducer = (state, action) => {
    let variete;
    switch (action.type) {
      case "ON_SPECULATION_CHANGE":
        variete = varietes.find(
          (v) => v.speculation.idSpeculation === action.payload.idSpeculation
        );
        console.log("VARIETE ZONE", variete.zone);
        console.log("STATE ZONE", state.zone);
        console.log(
          "CORRESPONDING V:",
          varietes.find(
            (v) => v.speculation.idSpeculation === action.payload.idSpeculation
          )
        );
        return {
          ...state,
          speculation: action.payload,
          variete,
          longueurCycle: variete.longueurCycle,
          zone: variete.zone,
        };
      case "ON_VARIETE_CHANGE":
        variete = varietes.find(
          (v) => v.idVariete === action.payload.idVariete
        );
        console.log("VARIETE ZONE", variete.zone);
        console.log("STATE ZONE", state.zone);
        return {
          ...state,
          variete,
          longueurCycle: variete.longueurCycle,
          zone: variete.zone,
        };
      case "ON_STOCK_CHANGE":
        return {
          ...state,
          stockDeSecurite: action.payload,
        };
      default:
        break;
    }
  };

  const initialStateVariete = {
    variete: {
      idVariete: 1,
      nomVariete: "Sahel 108",
    },
    speculation: {
      idSpeculation: 1,
      nomSpeculation: "riz",
      imageSpeculation: riz,
    },
    zone: {
      nomZone: "Vallée du Fleuve Sénégal",
      idZone: 1,
    },
    stockDeSecurite: 200,
  };

  const initialStateSpeculation = {
    idSpeculation: 1,
    nomSpeculation: "riz",
    imageSpeculation: riz,
  };

  const [stateVariete, dispatchVariete] = useReducer(
    reducer,
    initialStateVariete
  );
  const [stateSpeculation, setStateSpeculation] = useState(
    initialStateSpeculation
  );

  const handleChangeVariete = (e) => {
    let { name, value } = e.target;
    dispatchVariete({ type: `ON_${name}_CHANGE`, payload: value });
  };

  const handleChangeSpeculation = (e) => {
    let { name, value } = e.target;
    setStateSpeculation(value);
    console.log("SPECULATION", { name, value });
  };

  const handleSubmitVariete = () => {
    for (let [, value] of Object.entries(stateVariete)) {
      if (value === "") return;
    }

    let newVariete = {
      ...stateVariete.variete,
      ...stateVariete,
      id: stateVariete.variete.idVariete + Math.round(Math.random() * 100),
    };

    addVariete(newVariete)
  };

  const handleSubmitSpeculation = (e) => {
    console.log("NEW SPECULATION", stateSpeculation);
    addSpeculation(stateSpeculation);
  };

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
                  })
                )}
              />
            </Grid>
            <Grid
              item
              sm={3}
              className={classes.gridContainer}
              justifyContent=""
            >
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel color="secondary">Spéculations</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={stateSpeculation || ""}
                  name="ALL_SPECULATION"
                  color="secondary"
                  onChange={handleChangeSpeculation}
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
              <Button
                color="secondary"
                variant="contained"
                className={classes.addButton}
                onClick={handleSubmitSpeculation}
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
                  value={stateVariete.speculation || ""}
                  name="SPECULATION"
                  onChange={handleChangeVariete}
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
                  value={stateVariete.variete || ""}
                  name="VARIETE"
                  onChange={handleChangeVariete}
                >
                  {varietes
                    .filter(
                      (variete) =>
                        variete.speculation.idSpeculation ===
                        stateVariete.speculation.idSpeculation
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
                value={stateVariete.stockDeSecurite || ""}
                className={clsx(classes.margin, classes.textField)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Kg</InputAdornment>
                  ),
                }}
                variant="filled"
                onChange={handleChangeVariete}
              />
            </Grid>
            <Grid item className={classes.gridContainer}>
              <TextField
                label="Longueur cycle"
                id="state.fillongueurCycle-star || ''t -adornment"
                name="CYCLE"
                value={stateVariete.longueurCycle || ""}
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
                  value={stateVariete.zone || ""}
                  name="ZONE"
                  disabled
                >
                  {zones.map((zone) => (
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
                onClick={handleSubmitVariete}
              >
                Ajouter
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
