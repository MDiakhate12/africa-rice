import { useCallback, useContext, useEffect, useState } from "react";
import ProductionBySpeculation from "./ProductionBySpeculation";
import ProductionByVariete from "./ProductionByVariete";
import CommandeBySpeculation from "./CommandeBySpeculation";
import CommandeByVariete from "./CommandeByVariete";
import ProductionCommandeBySpeculation from "./ProductionCommandeBySpeculation";
import ProductionCommandeByVariete from "./ProductionCommandeByVariete";
import CommandeLivraisonBySpeculation from "./CommandeLivraisonBySpeculation";
import CommandeLivraisonByVariete from "./CommandeLivraisonByVariete";
import {
  Box,
  Typography,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Map from "./Map";

import { GlobalContext } from "../../store/GlobalProvider";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

export default function Rapports() {
  const classes = useStyles();

  const { institution } = useContext(GlobalContext);

  const [value, setValue] = useState(0);
  const [display, setDisplay] = useState("chart");
  const [state, setState] = useState({ idSpeculation: 1 });

  const [speculations, setSpeculation] = useState([]);

  const [commandesByVariete, setCommandesByVariete] = useState([]);
  const [productionsByVariete, setProductionsByVariete] = useState([]);
  const [commandesBySpeculation, setCommandesBySpeculation] = useState([]);
  const [productionsBySpeculation, setProductionsBySpeculation] = useState([]);
  const [commandeByVarieteByState, setCommandeByVarieteByState] = useState([]);
  const [commandeBySpeculationByState, setCommandeBySpeculationByState] =
    useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

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

  const getCommandeSumByVarietes = useCallback(() => {
    ipcRenderer.send("getCommandeSumByVarietes", {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once("gotCommandeSumByVarietes", (event, data) => {
      setCommandesByVariete(
        data.filter(
          (v) =>
            v.VarieteInstitution.Variete.speculationId === state.idSpeculation
        )
      );
      console.log("DIIAAAAF", data);
    });
  }, [state.idSpeculation]);

  const getProductionsSumByVarietes = useCallback(() => {
    ipcRenderer.send("getByVarietes", {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once("gotByVarietes", (event, data) => {
      console.log(data);
      setProductionsByVariete(
        data.filter(
          (v) =>
            v.VarieteInstitution.Variete.speculationId === state.idSpeculation
        )
      );
    });
  }, [state.idSpeculation]);

  const getCommandeSumBySpeculation = useCallback(() => {
    ipcRenderer.send("getCommandeSumBySpeculation", {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once("gotCommandeSumBySpeculation", (event, data) => {
      setCommandesBySpeculation(data);
      console.log("DIIAAAAF", data);
    });
  }, []);

  const getProductionsSumBySpeculation = useCallback(() => {
    ipcRenderer.send("getProductionsSumBySpeculation", {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once("gotProductionsSumBySpeculation", (event, data) => {
      console.log(data);
      setProductionsBySpeculation(data);
      // setMax(Math.max(...data.map((p) => p.totalQuantiteDisponible)));
      // setMax(Math.min(...data.map((p) => p.totalQuantiteDisponible)));
    });
  }, []);

  const getCommandeSumByVarieteByState = useCallback(() => {
    ipcRenderer.send("getCommandeSumByVarieteByState", {
      "$Production.institutionId$": institution?.idInstitution,
    });
    ipcRenderer.once("gotCommandeSumByVarieteByState", (event, data) => {
      setCommandeByVarieteByState(
        data.filter(
          (v) =>
            v.VarieteInstitution.Variete.speculationId === state.idSpeculation
        )
      );
      console.log("BY STATE: ", data);
    });
  }, [state.idSpeculation]);

  const getCommandeSumBySpeculationByState = useCallback(() => {
    ipcRenderer.send("getCommandeSumBySpeculationByState", {
      "$Production.institutionId$": institution?.idInstitution,
    });
    ipcRenderer.once("gotCommandeSumBySpeculationByState", (event, data) => {
      setCommandeBySpeculationByState(data);
      console.log("BY STATE: ", data);
    });
  }, []);

  useEffect(() => {
    getSpeculationsInstitution();
  }, []);

  useEffect(() => {
    getProductionsSumBySpeculation();
    getCommandeSumBySpeculation();
    getCommandeSumBySpeculationByState();
  }, []);

  useEffect(() => {
    getProductionsSumByVarietes();
    getCommandeSumByVarietes();
    getCommandeSumByVarieteByState();
  }, [state.idSpeculation]);

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <Paper>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            color="primary"
            // centered
            variant="fullWidth"
          >
            <Tab label="Statistiques spéculations" />
            <Tab label="Statistiques variétés" />
            <Tab label="Cartographie" />
          </Tabs>
        </Paper>
      </div>

      {value < 2 && (
        <Grid id="ddd" container justify="space-between" alignItems="center">
          <Grid item>
            <Box marginTop={3}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Affichage</FormLabel>
                <RadioGroup
                  aria-label="display"
                  name="display"
                  value={display}
                  onChange={(e) => setDisplay(e.target.value)}
                >
                  <FormControlLabel
                    value="chart"
                    control={<Radio />}
                    label="Graphique"
                  />
                  <FormControlLabel
                    value="table"
                    control={<Radio />}
                    label="Tableau"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>

          {value === 1 ? (
            <Grid item id="dh">
              <Box marginTop={3}>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel color="secondary">Spéculations</InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={state.idSpeculation || ""}
                    name="idSpeculation"
                    color="secondary"
                    onChange={handleFilterChange}
                  >
                    {speculations.map((speculation, index) => (
                      <MenuItem
                        key={speculation.idSpeculation}
                        value={speculation.idSpeculation}
                      >
                        {speculation.nomSpeculation}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      )}
      {/* <FormControlLabel
        control={
          <Switch
            checked={display === "chart"}
            // onChange={handleChange}
            name="display"
          />
        }
        label="Graphiques"
      /> */}

      <TabPanel value={value} index={0}>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <ProductionBySpeculation
              productionsBySpeculation={productionsBySpeculation}
              display={display}
            />
          </Grid>

          <Grid item sm={6}>
            <CommandeBySpeculation
              commandesBySpeculation={commandesBySpeculation}
              display={display}
            />
          </Grid>

          <Grid item sm={6}>
            <ProductionCommandeBySpeculation
              commandesBySpeculation={commandesBySpeculation}
              productionsBySpeculation={productionsBySpeculation}
              display={display}
            />
          </Grid>

          <Grid item sm={6}>
            <CommandeLivraisonBySpeculation
              commandesBySpeculation={commandesBySpeculation}
              commandeBySpeculationByState={commandeBySpeculationByState}
              display={display}
            />
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <ProductionByVariete
              productionsByVariete={productionsByVariete}
              filter={state}
              display={display}
            />
          </Grid>

          <Grid item sm={6}>
            <CommandeByVariete
              commandesByVariete={commandesByVariete}
              filter={state}
              display={display}
            />
          </Grid>

          <Grid item sm={6}>
            <ProductionCommandeByVariete
              commandesByVariete={commandesByVariete}
              productionsByVariete={productionsByVariete}
              filter={state}
              display={display}
            />
          </Grid>

          <Grid item sm={6}>
            <CommandeLivraisonByVariete
              commandesByVariete={commandesByVariete}
              commandeByVarieteByState={commandeByVarieteByState}
              filter={state}
              display={display}
            />
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Map />
        {/* <Map2 /> */}
      </TabPanel>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: "max-content",
  },
  container: {
    flexGrow: 1,
    height: "max-content",
  },
  formControl: {
    marginBottom: theme.spacing(1),
    width: "25ch",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
