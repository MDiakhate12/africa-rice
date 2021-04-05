import React, { useContext, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { GlobalContext } from "../../store/GlobalProvider";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();

  const varietes = [];
  const speculations = [];

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

  const { institution } = useContext(GlobalContext);

  let initialState = {
    speculationInstitution: {},
    variete: {},
    idInstitution: institution?.idInstitution,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Article Commande</Typography>
      </AccordionSummary>
      <AccordionDetails>
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
                  {speculations.map((s) => (
                    <MenuItem key={s.idSpeculation} value={s.idSpeculation}>
                      {s.nomSpeculation}
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
                  {}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
