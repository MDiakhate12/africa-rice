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
  FilledInput,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
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
  formControl: {
    marginBottom: theme.spacing(1),
  },
}));

export default function SimpleAccordion({
  index,
  handleDataChange,
}) {
  const classes = useStyles();

  const [formData, setFormData] = useState({});

  const [productions, setProductions] = useState([]);
  const [varietes, setVarietes] = useState([]);
  const [speculations, setSpeculations] = useState([]);
  const [niveauxInstitution, setNiveauxInstitution] = useState([]);

  const { openConfirmDialog } = useContext(GlobalContext);

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
    <>
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

              openConfirmDialog({
                title: "Suppression",
                content:
                  "Souhaitez vous réellement supprimer l'article ? Cette action est irréversible.",
                data: index,
              });
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
              variant="filled"
              className={classes.formControl}
            >
              <InputLabel id="Niveau-label">Niveau</InputLabel>
              <Select
                labelId="Niveau-label"
                id="Niveau-select"
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
              <FormHelperText>Niveau de production</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <FormControl
              fullWidth
              variant="filled"
              className={classes.formControl}
            >
              <InputLabel id="Spéculation-label">Spéculation</InputLabel>
              <Select
                labelId="Spéculation-label"
                id="Spéculation-select"
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
              <FormHelperText>Spéculation désirée</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item sm={12}>
            <FormControl
              fullWidth
              variant="filled"
              className={classes.formControl}
            >
              <InputLabel id="Production-label">Production</InputLabel>
              <Select
                labelId="Production-label"
                id="Production-select"
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
              <FormHelperText>
                Production commandée{" "}
                {formData?.production?.VarieteInstitution?.Variete?.nomVariete
                  ? ` - ${formData?.production?.prixUnitaire} FCFA`
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
                value={formData.quantite || ""}
                onChange={handleChange}
                autoFocus
                margin="dense"
                id="quantite"
                name="quantite"
                type="number"
                color="secondary"
                endAdornment={
                  <InputAdornment position="end">Kg</InputAdornment>
                }
              />
              <FormHelperText>
                Quantité désirée pour cette production
              </FormHelperText>
            </FormControl>{" "}
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
    </>
  );
}
