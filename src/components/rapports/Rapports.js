import React, { useState } from "react";
import { Grid, Paper, Switch, Tab, Tabs } from "@material-ui/core";

import ProductionBySpeculation from "./ProductionBySpeculation";
import ProductionByVariete from "./ProductionByVariete";
import CommandeBySpeculation from "./CommandeBySpeculation";
import CommandeByVariete from "./CommandeByVariete";
import ProductionCommandeBySpeculation from "./ProductionCommandeBySpeculation";
import ProductionCommandeByVariete from "./ProductionCommandeByVariete";
import CommandeLivraisonBySpeculation from "./CommandeLivraisonBySpeculation";
import CommandeLivraisonByVariete from "./CommandeLivraisonByVariete";
import { Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Map from "./Map";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function Rapports() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [display, setDisplay] = useState("chart");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
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
            <ProductionBySpeculation display={display} />
          </Grid>

          <Grid item sm={6}>
            <CommandeBySpeculation display={display} />
          </Grid>

          <Grid item sm={6}>
            <ProductionCommandeBySpeculation display={display} />
          </Grid>

          <Grid item sm={6}>
            <CommandeLivraisonBySpeculation display={display} />
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <ProductionByVariete display={display} />
          </Grid>

          <Grid item sm={6}>
            <CommandeByVariete display={display} />
          </Grid>

          <Grid item sm={6}>
            <ProductionCommandeByVariete display={display} />
          </Grid>

          <Grid item sm={6}>
            <CommandeLivraisonByVariete display={display} />
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Map />
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
