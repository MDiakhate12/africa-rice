import React, { useContext, useReducer } from "react";
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
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import DataTable from "../common/DataTable";
import { GlobalContext } from "../../store/GlobalProvider";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmDialog from "../common/ConfirmDialog";
import { MagasinContext } from "../../store/magasin/provider";




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

export default function Magasin() {
  const columns = [
    { type: "string", field: "id", headerName: "idMagasin", hide: true },
    {
      type: "string",
      field: "nomMagasin",
      headerName: "Magasin",
      width: 170,
    },
    {
      type: "string",
      field: "region",
      headerName: "Region",
      width: 120,
      renderCell: (params) => params.getValue("Localisation").region,
    },
    {
      type: "string",
      field: "commune",
      headerName: "Commune",
      width: 130,
      renderCell: (params) => params.getValue("Localisation").commune,
    },
    {
      type: "string",
      field: "village",
      headerName: "Addresse",
      width: 130,
      renderCell: (params) => params.getValue("Localisation").village,
    },
    {
      type: "string",
      field: "delete",
      headerName: "Supprimer",
      width: 120,
      hide: true,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            const removeIdAndAssociations = (idName, obj) => {
              let result = {};
              for (let [key, value] of Object.entries(obj)) {
                if (key !== idName && typeof value !== "object") {
                  result[key] = value;
                }
              }
              return result;
            };
            openConfirmDialog({
              title: "Suppression",
              content: `Souhaitez vous réellement supprimer le magasin ${
                params.getValue("nomMagasin")
              } ?\nAttention! Vous devez d'abord supprimer tous les produits qui en dépendent.`,
              data: removeIdAndAssociations("id", params.row),
            });
            // console.log(removeIdAndAssociations("id", params.row))
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const classes = useStyles();

  const {
    magasins,
    addMagasin,
    deleteByIdMagasin,
  } = useContext(MagasinContext);

  const {
    localisations,
    openConfirmDialog,
    institution
  } = useContext(GlobalContext);

  
  let initialState = {
    nomMagasin: "",
    region: "",
    departement: "",
    commune: "",
    village: "",
    idInstitution: 1,
  };

  const reducer = (state, action) => {
    let { name, value } = action.payload;
    let localisation;

    switch (action.type) {
      case "ON_REGION_CHANGE":
        localisation = localisations.find((l) => l[name] === value);

        return {
          ...state,
          [name]: value,
          departement: localisation.departement,
          commune: localisation.commune,
          village: localisation.village,
        };

      case "ON_DEPARTEMENT_CHANGE":
        localisation = localisations.find((l) => l[name] === value);

        return {
          ...state,
          [name]: value,
          commune: localisation.commune,
          village: localisation.village,
        };

      case "ON_COMMUNE_CHANGE":
        localisation = localisations.find((l) => l[name] === value);
        console.log(localisation)
        return {
          ...state,
          [name]: value,
          village: localisation.idLocalisation,
        };

      case "ON_VILLAGE_CHANGE":
        return {
          ...state,
          [name]: value,
        };

      case "ON_NOMMAGASIN_CHANGE":
        return {
          ...state,
          [name]: value,
        };
      default:
        break;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    let { name, value } = e.target;

    console.log(name, value);
    dispatch({
      type: `ON_${name.toUpperCase()}_CHANGE`,
      payload: { name, value },
    });
  };

  const handleSubmit = (e) => {
    if (
      !state.nomMagasin ||
      !state.region ||
      !state.departement ||
      !state.commune ||
      !state.village ||
      !state.idInstitution
    )
      return;

    let magasin = {
      nomMagasin: state.nomMagasin,
      localisationId: state.village,
      institutionId: state.idInstitution,
    };

    addMagasin(magasin);
    // console.log(state);
  };

    const handleDialogClose = (res, data) => {
      if (res === "yes") {
        try {
          return deleteByIdMagasin(data);
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
        <Grid item sm={9}>
          <Typography variant="button">Nos Magasins</Typography>
          <DataTable
            columns={columns}
            rows={magasins?.map((m) => ({ id: m.idMagasin, ...m }))}
          />
        </Grid>

        <Grid item sm={3}>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography variant="button">Ajouter Un Magasin</Typography>
          </Box>
          <Grid>
            <Grid item className={classes.gridContainer}>
              <TextField
                label="Nom Magasin"
                id="state.fillongueurCycle-star || ''t -adornment"
                name="nomMagasin"
                value={state.nomMagasin || ""}
                className={clsx(classes.margin, classes.textField)}
                variant="filled"
                onChange={handleChange}
              />
            </Grid>{" "}
            <Grid item className={classes.gridContainer}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel color="secondary">Région</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={state.region || ""}
                  name="region"
                  color="secondary"
                  onChange={handleChange}
                >
                  {localisations
                    .map((l) => l.region.toLowerCase())
                    .map((r, i, s) => {
                      if (r && s.indexOf(r) === i)
                        return (
                          <MenuItem key={r} value={r}>  
                            {r}
                          </MenuItem>
                        );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item className={classes.gridContainer}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel color="secondary">Département</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={state.departement || ""}
                  name="departement"
                  color="secondary"
                  onChange={handleChange}
                >
                  {localisations
                    .map((l) => {
                      if (
                        l.region.toLowerCase() ===
                        state.region.toLowerCase()
                      )
                        return l.departement;
                    })
                    .map((d, i, s) => {
                      if (d && s.indexOf(d) === i)
                        return (
                          <MenuItem key={d} value={d}>
                            {d}
                          </MenuItem>
                        );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item className={classes.gridContainer}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel color="secondary">Commune</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={state.commune || ""}
                  name="commune"
                  color="secondary"
                  onChange={handleChange}
                >
                  {localisations
                    .map((l) => {
                      if (
                        l?.departement?.toLowerCase() ===
                        state?.departement?.toLowerCase()
                      )
                        return l.commune;
                    })
                    .map((c, i, s) => {
                      if (c && s.indexOf(c) === i)
                        return (
                          <MenuItem key={c} value={c}>
                            {c}
                          </MenuItem>
                        );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item className={classes.gridContainer}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel color="secondary">Localité</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={state.village || ""}
                  name="village"
                  color="secondary"
                  onChange={handleChange}
                >
                  {localisations.map((l) => {
                    if (
                      l?.commune?.toLowerCase() ===
                      state?.commune?.toLowerCase()
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
    </>
  );
}
