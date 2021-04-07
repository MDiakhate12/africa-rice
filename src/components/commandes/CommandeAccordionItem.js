import React, { useContext, useEffect, useReducer, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import "./style.css";

import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@material-ui/core";

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
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  accordionSummaryContent: {
    margin: "0px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export default function SimpleAccordion({
  index,
  data,
  handleChange: handleDataChange,
  handleDeleteArticle,
}) {
  const classes = useStyles();

  const [formData, setFormData] = useState({});

  const [productions, setProductions] = useState([]);
  const [varietes, setVarietes] = useState([]);
  const [speculations, setSpeculations] = useState([]);
  const [niveauxInstitution, setNiveauxInstitution] = useState([]);

  // const groupByKey = (key, array) => [
  //   ...new Map(array.map((item) => [item[key], item])).values(),
  // ];

  const getAllProductions = () => {
    ipcRenderer.send(events.production.getAll);
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

    console.log("productions:", productions);
    console.log("niveaux:", niveauxInstitution);
    console.log("speculations:", speculations);
  }, []);

  const [expanded, setExpanded] = useState(false);

  const handleToggle = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormData({ ...formData, [name]: value });
    handleDataChange(e, index);
  };
  return (
    <Accordion
      expanded={expanded === `panel-${index}`}
      onChange={handleToggle(`panel-${index}`)}
      expandIcon={<ExpandMoreIcon />}
    >
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        classes={{
          content: classes.accordionSummaryContent,
        }}
      >
        <Typography className={classes.heading}>
          {formData?.production?.VarieteInstitution?.Variete?.nomVariete
            ? `${formData?.production?.VarieteInstitution?.Variete?.nomVariete} - ${formData?.production?.Localisation?.village}`
            : `Article ${index}`}
        </Typography>

        <Typography className={classes.secondaryHeading}>
          {formData?.production?.prixUnitaire && formData?.quantite
            ? `${formData?.production?.prixUnitaire * formData?.quantite} FCFA`
            : `Prix ${index}`}
        </Typography>

        <Tooltip title="Supprimer l'article">
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              handleDeleteArticle(index);
            }}
          >
            <DeleteIcon color="secondary" />
          </IconButton>
        </Tooltip>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item sm={12}>
            <FormControl
              fullWidth
              variant="standard"
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Niveau
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={formData?.niveau || ""}
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
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <FormControl
              fullWidth
              variant="standard"
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Spéculation
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={formData?.speculation || ""}
                name="speculation"
                onChange={handleChange}
              >
                {speculations.map((speculation) => (
                  <MenuItem key={speculation} value={speculation}>
                    {speculation}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <FormControl
              fullWidth
              variant="standard"
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Production
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={formData.production || ""}
                name="production"
                onChange={handleChange}
              >
                {productions?.map((production) => {
                  if (
                    production?.VarieteInstitution?.SpeculationInstitution
                      ?.Speculation?.nomSpeculation === formData.speculation &&
                    production?.NiveauInstitution?.NiveauDeProduction
                      .nomNiveau === formData.niveau
                  ) {
                    return (
                      <MenuItem
                        key={production?.idProduction}
                        value={production}
                      >
                        {`${production?.VarieteInstitution?.Variete?.nomVariete} - ${production?.Localisation?.village}`}
                      </MenuItem>
                    );
                  }
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <TextField
              value={formData.quantite || ""}
              onChange={handleChange}
              autoFocus
              margin="dense"
              id="quantite"
              name="quantite"
              label="Quantité"
              type="number"
              fullWidth
              // endAdornment=
            />{" "}
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
