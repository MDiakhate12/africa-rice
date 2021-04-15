import React from "react";
import { Grid, Paper, Tab, Tabs } from "@material-ui/core";

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

export default function Rapports() {
  // const colors = [
  //   { riz: "rgba(255, 99, 132, 0.2)" },
  //   { sorgho: "rgba(54, 162, 235, 0.2)" },
  //   { mil: "rgba(148, 0, 0, 0.5)" },
  //   { mais: "rgba(75, 192, 192, 0.2)" },
  //   { arachide: "rgba(153, 102, 255, 0.2)" },
  //   { niebe: "rgba(255, 159, 64, 0.2)" },
  //   { oignon: "rgba(231, 51, 255, 0.2)" },
  //   { tomate: "rgba(190, 255, 51, 0.2)" },
  //   { piment: "rgba(255, 51, 51, 0.2)" },
  //   { jaxatu: "rgba(26, 173, 0, 0.2)" },
  //   { pomme_de_terre: "rgba(194, 204, 0, 0.2)" },
  //   { patate_douce: "rgba(255, 244, 122, 0.2)" },
  //   { gombo: "rgba(3, 179, 0, 0.2)" },
  //   { aubergine: "rgba(102, 26, 168, 0.2)" },
  // ];

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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

      <TabPanel value={value} index={0}>
        <Grid container>
          <Grid item sm={6}>
            <ProductionBySpeculation />
          </Grid>

          <Grid item sm={6}>
            <CommandeBySpeculation />
          </Grid>

          <Grid item sm={6}>
            <ProductionCommandeBySpeculation />
          </Grid>

          <Grid item sm={6}>
            <CommandeLivraisonBySpeculation />
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid container>
          <Grid item sm={6}>
            <ProductionByVariete />
          </Grid>

          <Grid item sm={6}>
            <CommandeByVariete />
          </Grid>

          <Grid item sm={6}>
            <ProductionCommandeByVariete />
          </Grid>

          <Grid item sm={6}>
            <CommandeLivraisonByVariete />
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
