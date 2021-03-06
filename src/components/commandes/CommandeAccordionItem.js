import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
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
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  formControl: {
    marginBottom: theme.spacing(1),
  },
}));

function SimpleAccordion({
  index,
  handleDataChange,
  expandedFromDialog,
  setExpandedFromDialog,
  handleDeleteArticle,
}) {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    idNiveau: "",
    idSpeculation: "",
    idVarieteInstitution: "",
    production: "",
    quantite: "",
  });
  const [productions, setProductions] = useState([]);
  const [selectedProductions, setSelectedProductions] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [visibility, setVisibility] = useState(false);

  const [speculations, setSpeculation] = useState([]);
  const [varietes, setVarietes] = useState([]);
  const [niveaux, setNiveau] = useState([]);

  const getVarietesInstitution = useCallback(() => {
    ipcRenderer.send(events.varieteInstitution.getAll, {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once(eventResponse.varieteInstitution.gotAll, (event, data) => {
      setVarietes(data);
      console.log(data);
    });
  }, []);

  const getSpeculationsInstitution = () => {
    ipcRenderer.send(events.speculationInstitution.getAll, {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once(
      eventResponse.speculationInstitution.gotAll,
      (event, data) => {
        setSpeculation(data.map((d) => d.Speculation));
        console.log(data.map((d) => d.Speculation));
      }
    );
  };

  const getNiveau = () => {
    ipcRenderer.send(events.niveauInstitution.getAll, {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once(eventResponse.niveauInstitution.gotAll, (event, data) => {
      setNiveau(data.map((d) => d.NiveauDeProduction));
    });
  };

  const { openConfirmDialog, institution } = useContext(GlobalContext);

  const getAllProductions = () => {
    ipcRenderer.send(events.production.getAll, {
      institutionId: institution.idInstitution,
    });

    ipcRenderer.once(eventResponse.production.gotAll, (event, data) => {
      setProductions(data);

      console.log("PROD", data);
      // setSpeculations([
      //   ...new Set(
      //     data.map(
      //       (production) =>
      //         production.VarieteInstitution.SpeculationInstitution.Speculation
      //           .nomSpeculation
      //     )
      //   ),
      // ]);

      // setNiveauxInstitution([
      //   ...new Set(
      //     data.map(
      //       (production) =>
      //         production.niveauDeProduction.NiveauDeProduction.nomNiveau
      //     )
      //   ),
      // ]);
    });
  };

  useEffect(() => {
    getAllProductions();
    getSpeculationsInstitution();
    getVarietesInstitution();
    getNiveau();

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

    if (name === "idVariete") {
      let hasProductions = (production) =>
        production?.VarieteInstitution?.SpeculationInstitution
          ?.speculationId === formData.idSpeculation &&
        production?.VarieteInstitution?.varieteId === value &&
        production?.NiveauInstitution?.niveauId === formData.idNiveau;

      setSelectedProductions(productions.filter(hasProductions));
    }

    setFormData({ ...formData, [name]: value });
    handleDataChange(e, index);

    if (
      name === "idNiveau" ||
      name === "idSpeculation" ||
      name === "idVarieteInstitution"
    ) {
      let hasProductions = (production) =>
        production?.VarieteInstitution?.SpeculationInstitution
          ?.speculationId ===
          (name === "idSpeculation" ? value : formData.idSpeculation) &&
        production?.varieteInstitutionId ===
          (name === "idVarieteInstitution" ? value : formData.idVarieteInstitution) &&
        production?.NiveauInstitution?.niveauId ===
          (name === "idNiveau" ? value : formData.idNiveau);

      setFormData({ ...formData, [name]: value, production: "" });
      handleDataChange({ target: { name: "production", value: "" } }, index);
      setSelectedProductions(productions.filter(hasProductions));
      setVisibility(productions.some(hasProductions));
    }
  };

  const [tooltip, setTooltip] = useState(
    `Cliquer pour ${
      expanded === "panel-" + index || expandedFromDialog
        ? "r??duire"
        : "??tendre"
    }`
  );

  return (
    <>
      <Accordion
        expanded={expanded === `panel-${index}` || expandedFromDialog}
        onChange={handleToggle(`panel-${index}`)}
        expandIcon={<ExpandMoreIcon />}
      >
        <Tooltip
          className={classes.tooltip}
          arrow
          title={tooltip}
          placement={
            tooltip.includes("??tendre") || tooltip.includes("r??duire")
              ? "bottom-start"
              : "bottom-end"
          }
        >
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
                    ? "r??duire"
                    : "??tendre"
                }`
              );
            }}
            onMouseLeave={(e) => {
              console.log(e);
              // if (e.relatedTarget.className.includes("MuiAccordionSummary")) {
              //   setTooltip(
              //     `Cliquer pour ${
              //       expanded === "panel-" + index || expandedFromDialog
              //         ? "r??duire"
              //         : "??tendre"
              //     }`
              //   );
              // } else {
              setTooltip("");
              // }
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Typography className={classes.heading}>
              {formData?.production?.VarieteInstitution?.Variete?.nomVariete
                ? `${formData?.production?.VarieteInstitution?.Variete?.nomVariete} - ${formData?.production?.Localisation?.village}`
                : `Semence N??${index + 1}`}
            </Typography>

            <Typography className={classes.secondaryHeading}>
              {formData?.production?.prixUnitaire && formData?.quantite
                ? `${
                    formData?.production?.prixUnitaire * formData?.quantite
                  } FCFA`
                : `Prix ${index}`}
            </Typography>
            {/* 
            <Tooltip arrow              title="Supprimer l'article"
              onMouseEnter={(e) => {
                console.log("B:", e.target.localName);
                e.preventDefault();
                e.stopPropagation();
              }}
            > */}
            <IconButton
              onMouseEnter={(e) => {
                console.log(e);
                setTooltip("Retirer cette semence");
                e.preventDefault();
                e.stopPropagation();
              }}
              onMouseLeave={(e) => {
                console.log(e);
                setTooltip("");
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
                    "L'article contient des informations. Souhaitez vous r??ellement le supprimer ? Cette action est irr??versible.",
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
                // className={classes.formControl}
              >
                <InputLabel id="Niveau-label">Niveau</InputLabel>
                <Select
                  labelId="Niveau-label"
                  id="Niveau-select"
                  value={formData?.idNiveau || ""}
                  name="idNiveau"
                  onChange={handleChange}
                  fullWidth
                >
                  {niveaux.map((niveau) => (
                    <MenuItem key={niveau.idNiveau} value={niveau.idNiveau}>
                      {niveau.nomNiveau}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <FormControl
                fullWidth
                margin="dense"
                variant="filled"
                // className={classes.formControl}
              >
                <InputLabel id="Sp??culation-label">Sp??culation</InputLabel>
                <Select
                  labelId="Sp??culation-label"
                  id="Sp??culation-select"
                  value={formData?.idSpeculation || ""}
                  name="idSpeculation"
                  onChange={handleChange}
                >
                  {speculations.map((speculation) => (
                    <MenuItem
                      key={speculation.idSpeculation}
                      value={speculation.idSpeculation}
                    >
                      {speculation.nomSpeculation}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <FormControl
                fullWidth
                margin="dense"
                variant="filled"
                className={classes.formControl}
              >
                <InputLabel id="Production-label">Vari??t??</InputLabel>
                <Select
                  labelId="Variete-label"
                  id="Variete-select"
                  value={formData.idVarieteInstitution || ""}
                  name="idVarieteInstitution"
                  onChange={handleChange}
                >
                  {varietes
                    ?.filter(
                      ({ Variete }) =>
                        Variete?.speculationId === formData.idSpeculation
                    )
                    .map((variete) => (
                      <MenuItem
                        key={variete?.idVarieteInstitution}
                        value={variete.idVarieteInstitution}
                      >
                        {variete?.Variete?.nomVariete}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            {visibility ? (
              <Grid item sm={12}>
                <FormControl
                  fullWidth
                  margin="dense"
                  variant="filled"
                  className={classes.formControl}
                >
                  <InputLabel id="Production-label">
                    Productions disponible pour cette vari??t??
                  </InputLabel>
                  <Select
                    labelId="Production-label"
                    id="Production-select"
                    value={formData.production || 0}
                    name="production"
                    onChange={handleChange}
                  >
                    {selectedProductions.map((production) => (
                      <MenuItem
                        key={production?.idProduction}
                        value={production}
                      >
                        {`${production?.VarieteInstitution?.Variete?.nomVariete} (cultiv?? ?? ${production?.Localisation?.village})`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ) : (
              ""
            )}
            <Grid item sm={12}>
              <FormControl variant="filled" fullWidth required>
                <InputLabel id="Quantit??-label" color="secondary">
                  Quantit??
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
                label="Date d'enl??vement souhait?? par le client"
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
