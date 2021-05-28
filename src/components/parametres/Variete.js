import React, { useContext, useEffect, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  ListItemSecondaryAction,
} from "@material-ui/core";
import DataTable from "../common/DataTable";
import { GlobalContext } from "../../store/GlobalProvider";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmDialog from "../common/ConfirmDialog";
import { VarieteInstitutionContext } from "../../store/varieteInstitution/provider";
import { SpeculationInstitutionContext } from "../../store/speculationInstitution/provider";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import VarieteFormDialog from "./VarieteFormDialog";

const { events, eventResponse } = require("../../store/utils/events");
const { ipcRenderer } = window.require("electron");

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
    width: "25ch",
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Variete() {
  const [created, setCreated] = React.useState(false);

  const {
    varietesInstitution,
    getAllVarieteInstitution,
    addVarieteInstitution,
    deleteByIdVarieteInstitution,
  } = useContext(VarieteInstitutionContext);

  const {
    varietes,
    institution,
    openConfirmDialog,
    getAllVariete,
    openVarieteFormDialog,
    addVariete,
    deleteByIdVariete,
    deleteByIdSpeculation,
  } = useContext(GlobalContext);

  useEffect(() => {
    getAllVariete();
    getAllVarieteInstitution({ institutionId: institution?.idInstitution });

    return () => {
      ipcRenderer.removeAllListeners([
        eventResponse.variete.gotAll,
        events.variete.getAll,
      ]);
    };
  }, [institution, created]);

  const columns = [
    { type: "string", field: "id", headerName: "idVariete", hide: true },
    {
      type: "string",
      field: "variete",
      headerName: "Variété",
      width: 170,
      renderCell: (params) => params.getValue("Variete").nomVariete,
      valueGetter: (params) => params.getValue("Variete").nomVariete,
    },
    {
      type: "string",
      field: "speculation",
      headerName: "Spéculation",
      width: 130,
      renderCell: (params) =>
        params.getValue("Variete").Speculation.nomSpeculation,
      valueGetter: (params) =>
        params.getValue("Variete").Speculation.nomSpeculation,
    },
    {
      type: "number",
      field: "longueurCycle",
      headerName: "Cycle",
      width: 100,
      renderCell: (params) => params.getValue("Variete").longueurCycle,
      valueGetter: (params) => params.getValue("Variete").longueurCycle,
    },
    {
      type: "string",
      field: "zone",
      headerName: "Zone",
      width: 180,
      renderCell: (params) =>
        params.getValue("Variete").ZoneAgroEcologique.nomZone,
      valueGetter: (params) =>
        params.getValue("Variete").ZoneAgroEcologique.nomZone,
    },
    {
      type: "string",
      field: "delete",
      headerName: "Supprimer",
      width: 120,
      sortable: false,
      // hide: true,
      renderCell: (params) => (
        <Tooltip
          title={
            params.api.getSelectedRows().length > 1
              ? `Supprimer les variétés sélectionnées`
              : `Supprimer ${params.getValue("Variete").nomVariete}`
          }
        >
          <IconButton
            onClick={(e) => {
              const removeIdAndAssociations = (idName, obj) => {
                let result = {};
                for (let [key, value] of Object.entries(obj)) {
                  if (key !== idName && typeof value !== "object") {
                    result[key] = value;
                  }
                }
                return result;
              };

              let selectedRows = params.api.getSelectedRows();
              let content = "";
              let data = "";
              let title = "";

              console.log(selectedRows);
              if (selectedRows.length > 1) {
                title = "Suppression multiple";

                data = selectedRows;

                if (!selectedRows.includes(params.row)) {
                  data.push(params.row);
                }

                content = `Souhaitez vous réellement toutes ces variétés:\n
                ${data.reduce((result, row, index) => {
                  if (index === 1) {
                    console.log("result:", result);
                    console.log("row:", row);
                    console.log("DIAAAAAF:", index);

                    return `${result?.Variete?.nomVariete}, ${row?.Variete?.nomVariete}`;
                  } else {
                    console.log("result:", result);
                    console.log("row:", row);
                    console.log("index:", index);
                    return `${result}, ${row?.Variete?.nomVariete}`;
                  }
                })} ?
                \nAttention! Vous devez d'abord supprimer tous les produits qui en dépendent.`;

                data = selectedRows.map((row) =>
                  removeIdAndAssociations("id", row)
                );
              } else {
                title = "Suppression";
                data = removeIdAndAssociations("id", params.row);

                content = `Souhaitez vous réellement supprimer la variété ${params?.row?.Variete?.nomVariete} ?\nAttention! Vous devez d'abord supprimer tous les produits qui en dépendent.`;
              }

              openConfirmDialog({
                title,
                content,
                data,
              });
            }}
          >
            <DeleteIcon color="secondary" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const classes = useStyles();

  const { speculationsInstitution, deleteByIdSpeculationInstitution } =
    useContext(SpeculationInstitutionContext);

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
    if (value === 0) {
      return openVarieteFormDialog({
        data: state.speculationInstitution.Speculation,
      });
    }
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
    addVarieteInstitution(newVarieteInstitution, {
      institutionId: institution?.idInstitution,
    });
  };

  const handleDeleteVarieteDialogClose = (res, data) => {
    if (res === "yes") {
      console.log(data);

      try {
        if (data?.idSpeculation) {
          return deleteByIdSpeculation(data);
        } else if (data?.idSpeculationInstitution) {
          return deleteByIdSpeculationInstitution(data);
        } else if (data?.idVariete) {
          return deleteByIdVariete(data);
        } else if (data?.idVarieteInstitution) {
          if (data.length > 1) {
            return data.map((d) => deleteByIdVarieteInstitution(d));
          }
          return deleteByIdVarieteInstitution(data);
        }
      } catch (error) {
        console.error(error);
      }
      
    }
    return;
  };

  let initialState = {
    speculationInstitution: "",
    variete: "",
    idInstitution: institution?.idInstitution,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleVarieteFormDialogClose = (res, data) => {
    if (res === "yes") {
      try {
        console.log(data);
        addVariete(data);
        setCreated(!created);
      } catch (error) {
        console.error(error);
      }
    }
    return;
  };

  const [displayDeleteIcon, setDisplayDeleteIcon] = React.useState({
    value: false,
    index: -1,
  });

  return (
    <>
      <ConfirmDialog handleClose={handleDeleteVarieteDialogClose} />
      <VarieteFormDialog handleClose={handleVarieteFormDialogClose} />
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
              <InputLabel id="speculation-label">Spéculation</InputLabel>
              <Select
                labelId="speculation-label"
                id="speculation-select"
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
              <InputLabel id="variete-label">Variétés</InputLabel>
              <Select
                labelId="variete-label"
                id="variete-select"
                value={state.variete || ""}
                name="variete"
                onChange={handleChange}
              >
                <MenuItem key={0} value={0}>
                  <Grid
                    container
                    align="center"
                    justify="space-between"
                    spacing={2}
                  >
                    <Grid item>
                      <Typography
                        variant="button"
                        style={{
                          fontSize: "0.6rem",
                          fontWeight: "bold",
                        }}
                      >
                        Ajouter une nouvelle
                      </Typography>
                    </Grid>
                    <Grid item>
                      <AddCircleIcon color="primary" fontSize="small" />
                    </Grid>
                  </Grid>
                </MenuItem>
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
                  .map((variete, index) => {
                    return (
                      <MenuItem key={variete.idVariete} value={variete}>
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          onMouseEnter={(e) => {
                            // console.log(e);
                            // e.preventDefault();
                            // e.stopPropagation();
                            setDisplayDeleteIcon({ value: true, index });
                          }}
                          onMouseLeave={(e) => {
                            // console.log(e);
                            // e.preventDefault();
                            // e.stopPropagation();
                            setDisplayDeleteIcon({ value: false, index: -1 });
                          }}  
                        >
                          {variete.nomVariete}
                          <ListItemSecondaryAction>
                            <Tooltip title="Supprimer">
                              <IconButton
                                style={{
                                  visibility:
                                    displayDeleteIcon.index === index &&
                                    displayDeleteIcon.value === true 
                                    // variete.nomVariete !==
                                    //   state.variete?.nomVariete
                                      ? "visible"
                                      : "hidden",
                                }}
                                edge="end"
                                aria-label="delete"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const removeAssociations = (obj) => {
                                    let result = {};
                                    for (let [key, value] of Object.entries(obj)) {
                                      if (typeof value !== "object") {
                                        result[key] = value;
                                      }
                                    }
                                    return result;
                                  };
                  
                                  console.log(removeAssociations(variete));

                                  openConfirmDialog({
                                    title: "Suppression",
                                    content: `Attention! Cette action supprimera définitivement la variété ${variete.nomVariete} de la base de données.`,
                                    data: removeAssociations(variete),
                                  });
                                }}
                              >
                                <DeleteIcon
                                  color="secondary"
                                  fontSize="small"
                                />
                              </IconButton>
                            </Tooltip>
                          </ListItemSecondaryAction>
                        </div>
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
