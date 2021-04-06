import React, { useContext, useEffect, useReducer, useState } from "react";
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
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@material-ui/core";

import { GlobalContext } from "../../store/GlobalProvider";
const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");
const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  formControl: {
    marginBottom: theme.spacing(1),
    width: "25ch",
  },
  margin: {
    marginBottom: theme.spacing(1),
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
  deleteBtn: {
    float: "right",
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();

  const [productions, setProductions] = useState([]);
  const [varietes, setVarietes] = useState([]);
  const [speculations, setSpeculations] = useState([]);
  const [formData, setFormData] = useState({});

  const getAllProductions = () => {
    ipcRenderer.send(events.production.getAll);
    ipcRenderer.once(eventResponse.production.gotAll, (event, data) => {
      setProductions(data);
      setVarietes([
        ...new Set(data.map((production) => production.VarieteInstitution)),
      ]);
      setSpeculations([
        ...new Set(
          data.map(
            (production) => production.VarieteInstitution.SpeculationInstitution
          )
        ),
      ]);
    });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    console.log(name, value);
    setFormData({
      [name]: value,
      ...formData,
    });
  };

  useEffect(() => {
    getAllProductions();
    console.log(productions);
    console.log(varietes);
    console.log(speculations);
  }, []);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>Article Commande</Typography>
        <Typography className={classes.secondaryHeading}>
          {formData?.speculationInstitution?.Speculation?.nomSpeculation}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid>
          <Grid>
            <Grid item className={classes.gridContainer}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">
                  Spéculation
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={formData?.speculationInstitution || ""}
                  name="speculationInstitution"
                  onChange={handleChange}
                >
                  {speculations.map((speculation) => (
                    <MenuItem
                      key={speculation.idSpeculationInstitution}
                      value={speculation}
                    >
                      {speculation.Speculation.nomSpeculation}
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
                  value={formData.varieteInstitutionId || ""}
                  name="variete"
                  onChange={handleChange}
                >
                  {varietes?.map((v) => (
                    <MenuItem
                      key={v?.idVarieteInstitution}
                      value={v?.idVarieteInstitution}
                    >
                      {v?.Variete.nomVariete}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
