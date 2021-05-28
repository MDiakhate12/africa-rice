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
import DatePicker from "../common/DatePicker";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightRegular,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(12),
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
  // formControl: {
  //   marginBottom: theme.spacing(1),
  // },
}));

function SimpleAccordion({
  index,
  handleDataChange,
  expandedFromDialog,
  setExpandedFromDialog,
  handleDeleteArticle,
}) {
  const classes = useStyles();
  const [formData, setFormData] = useState({});
  const [productions, setProductions] = useState([]);
  const [speculations, setSpeculations] = useState([]);
  const [niveauxInstitution, setNiveauxInstitution] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const { openConfirmDialog, institution } = useContext(GlobalContext);

  const getAllProductions = () => {
    ipcRenderer.send(events.production.getAll, {
      institutionId: institution.idInstitution,
    });

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

    // console.log("productions:", productions);
    // console.log("niveaux:", niveauxInstitution);
    // console.log("speculations:", speculations);
  }, []);

  const handleToggle = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    setExpandedFromDialog(index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormData({ ...formData, [name]: value });
    handleDataChange(e, index);
  };

  const [tooltip, setTooltip] = useState(
    `Cliquer pour ${
      expanded === "panel-" + index || expandedFromDialog
        ? "réduire"
        : "étendre"
    }`
  );

  return (
    <>
      <Accordion
        expanded={expanded === `panel-${index}` || expandedFromDialog}
        onChange={handleToggle(`panel-${index}`)}
        expandIcon={<ExpandMoreIcon />}
      >
        <Tooltip title={tooltip}>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            classes={{
              content: classes.accordionSummaryContent,
            }}
            onMouseEnter={(e) => {
              console.log(e.target.localName);
              e.preventDefault();
              e.stopPropagation();
              setTooltip(
                `Cliquer pour ${
                  expanded === "panel-" + index || expandedFromDialog
                    ? "réduire"
                    : "étendre"
                }`
              );
            }}
          >
            <Typography className={classes.heading}>
              {formData?.production?.VarieteInstitution?.Variete?.nomVariete
                ? `${formData?.production?.VarieteInstitution?.Variete?.nomVariete} - ${formData?.production?.Localisation?.village}`
                : `Article ${index}`}
            </Typography>

            <Typography className={classes.secondaryHeading}>
              {formData?.production?.prixUnitaire && formData?.quantite
                ? `${
                    formData?.production?.prixUnitaire * formData?.quantite
                  } FCFA`
                : `Prix ${index}`}
            </Typography>
            {/* 
            <Tooltip
              title="Supprimer l'article"
              onMouseEnter={(e) => {
                console.log("B:", e.target.localName);
                e.preventDefault();
                e.stopPropagation();
              }}
            > */}
            <IconButton
              onMouseEnter={(e) => {
                console.log(e);
                setTooltip("Supprimer l'article");
                e.preventDefault();
                e.stopPropagation();
              }}
              onMouseLeave={(e) => {
                console.log(e);
                setTooltip(
                  `Cliquer pour ${
                    expanded === "panel-" + index || expandedFromDialog
                      ? "réduire"
                      : "étendre"
                  }`
                );
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={(event) => {
                event.stopPropagation();
                if (Object.keys(formData).length === 0)
                  return handleDeleteArticle(index);

                openConfirmDialog({
                  title: "Suppression",
                  content:
                    "L'article contient des informations. Souhaitez vous réellement le supprimer ? Cette action est irréversible.",
                  data: index,
                });
              }}
            >
              <DeleteIcon color="secondary" />
            </IconButton>
            {/* </Tooltip> */}
          </AccordionSummary>
        </Tooltip>

        <AccordionDetails>
          <Grid container>
            <Grid item sm={12}>
              <FormControl
                fullWidth
                margin="dense"
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
                margin="dense"
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
                margin="dense"
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
                        ?.Speculation?.nomSpeculation ===
                        formData.speculation &&
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
                  inputProps={{
                    min: 0,
                    step: 100,
                  }}
                  endAdornment={
                    <InputAdornment position="end">Kg</InputAdornment>
                  }
                />
                <FormHelperText>
                  Quantité désirée pour cette production
                </FormHelperText>
              </FormControl>{" "}
            </Grid>
            <Grid item sm={12}>
              <DatePicker
                variant="filled"
                label="Date d'expression du besoin par le client"
                disableFuture={true}
                fullWidth={true}
                selectedDate={formData.dateExpressionBesoinClient}
                handleChange={handleChange}
                format="d MMMM yyyy"
                name="dateExpressionBesoinClient"
              />
            </Grid>
            <Grid item sm={12}>
              <DatePicker
                variant="filled"
                label="Date d'enlèvement souhaité par le client"
                disablePast={true}
                fullWidth={true}
                selectedDate={formData.dateEnlevementSouhaitee}
                handleChange={handleChange}
                format="d MMMM yyyy"
                name="dateEnlevementSouhaitee"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default SimpleAccordion;
