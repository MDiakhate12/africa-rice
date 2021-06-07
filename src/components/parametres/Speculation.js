import { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  Button,
  Grid,
  Typography,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { GlobalContext } from "../../store/GlobalProvider";
import SingleLineGridList from "../common/SingleLineGridList";
import ConfirmDialog from "../common/ConfirmDialog";
import { SpeculationInstitutionContext } from "../../store/speculationInstitution/provider";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SpeculationFormDialog from "./SpeculationFormDialog";
import DeleteIcon from "@material-ui/icons/Delete";
import { gridColumnsTotalWidthSelector } from "@material-ui/data-grid";
import ContextMenu from "../common/ContextMenu";
import { Tooltip } from "@material-ui/core";

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
  const [created, setCreated] = useState(false);

  const classes = useStyles();
  const {
    speculationsInstitution,
    getAllSpeculationInstitution,
    addSpeculationInstitution,
  } = useContext(SpeculationInstitutionContext);

  const {
    speculations,
    openConfirmDialog,
    institution,
    getAllSpeculation,
    getAllLocalisation,
    addSpeculation,
    openSpeculationFormDialog,
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
  }, [institution, created]);

  useEffect(() => {
    getAllSpeculationInstitution({ institutionId: institution?.idInstitution });
  }, [institution, created]);

  const [state, setState] = useState("");

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (value === 0) {
      return openSpeculationFormDialog();
    }
    setState(value);
    console.log("SPECULATION", { name, value });
  };

  const handleSubmit = (e) => {
    console.log("NEW SPECULATION", {
      speculationId: state.idSpeculation,
      institutionId: institution?.idInstitution,
      ...state,
    });
    addSpeculationInstitution({
      speculationId: state.idSpeculation,
      institutionId: institution?.idInstitution,
      ...state,
    });
    setCreated(!created);
  };

  // const handleDialogClose = (res, data) => {
  //   if (res === "yes") {
  //     try {
  //       if (data?.idSpeculation) {
  //         return deleteByIdSpeculation(data);
  //       } else if (data?.idSpeculationInstitution) {
  //         return deleteByIdSpeculationInstitution(data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   return;
  // };

  const handleSpeculationFormDialogClose = (res, data) => {
    if (res === "yes") {
      try {
        console.log(data);
        addSpeculation(data);
        setCreated(!created);
      } catch (error) {
        console.error(error);
      }
    }
    return;
  };

  const [displayDeleteIcon, setDisplayDeleteIcon] = useState({
    value: false,
    index: -1,
  });
  
  return (
    <>
      {/* <ConfirmDialog handleClose={handleDialogClose} /> */}
      <SpeculationFormDialog handleClose={handleSpeculationFormDialogClose} />
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

                console.log(removeAssociations(speculation));
                openConfirmDialog({
                  title: "Suppression",
                  content: `Souhaitez vous réellement supprimer la spéculation ${speculation.Speculation.nomSpeculation} ?\nAttention! Vous devez d'abord supprimer toutes les variétés qui en dépendent.`,
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
              {speculations
                .filter(
                  (s) =>
                    !speculationsInstitution
                      .map((si) => si.speculationId)
                      .includes(s.idSpeculation)
                )
                .map((speculation, index) => (
                  <MenuItem
                    key={speculation.idSpeculation}
                    value={speculation}
                    id="bro"
                  >
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
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   e.stopPropagation();
                      // }}
                    >
                      {speculation.nomSpeculation}
                      <ListItemSecondaryAction>
                        <Tooltip arrow title="Supprimer">
                          <IconButton
                            style={{
                              visibility:
                                displayDeleteIcon.index === index &&
                                displayDeleteIcon.value === true &&
                                speculation.nomSpeculation !==
                                  state.nomSpeculation
                                  ? "visible"
                                  : "hidden",
                            }}
                            edge="end"
                            aria-label="delete"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              openConfirmDialog({
                                title: "Suppression",
                                content: `Attention! Cette action supprimera définitivement la spéculation ${speculation.nomSpeculation} de la base de données.`,
                                data: speculation,
                              });
                            }}
                          >
                            <DeleteIcon color="secondary" fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </div>
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
