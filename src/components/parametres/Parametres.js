import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Magasin from "./Magasin";
import Institution from "./Institution";
import { Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import SpeculationVariete from "./SpeculationVariete";
import MagasinProvider from "../../store/magasin/provider";
import VarieteInstitutionProvider from "../../store/varieteInstitution/provider";
import SpeculationInstitutionProvider from "../../store/speculationInstitution/provider";
import { useLocation } from "react-router";
import Client from "./Client";
import Zone from "./Zone";

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
  },
}));

export default function Parametres() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const tab = parseInt(useQuery().get("tab"));

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    tab && setValue(tab);
  }, [tab]);

  return (
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
          <Tab label="Spéculations et Variétés" />
          <Tab label="Magasins" />
          <Tab label="Zones" />
          <Tab label="Clients" />
          <Tab label="Institution" />
        </Tabs>
      </Paper>

      <VarieteInstitutionProvider>
        <SpeculationInstitutionProvider>
          <TabPanel value={value} index={0}>
            <SpeculationVariete />
          </TabPanel>
        </SpeculationInstitutionProvider>
      </VarieteInstitutionProvider>

      <MagasinProvider>
        <TabPanel value={value} index={1}>
          <Magasin />
        </TabPanel>
      </MagasinProvider>

      <TabPanel value={value} index={2}>
        <Zone />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Client />
      </TabPanel>

      <TabPanel value={value} index={4}>
        <Institution />
      </TabPanel>
    </div>
  );
}
