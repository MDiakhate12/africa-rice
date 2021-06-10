import { useCallback, useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import ListCommandes from "./ListCommandes";
import TraitementCommandes from "./TraitementCommandes";
import EnlevementCommandes from "./EnlevementCommandes";
import { GlobalContext } from "../../store/GlobalProvider";

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
    marginTop: -5,
  },
}));

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

export default function Commandes() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { institution } = useContext(GlobalContext);

  const [commandes, setCommandes] = useState([]);

  const getAllCommandes = useCallback(() => {
    ipcRenderer.send(events.commande.getAll, {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once(eventResponse.commande.gotAll, (ev, data) => {
      console.log(data);
      setCommandes(data);
    });
  }, []);

  const [created, setCreated] = useState(false);

  useEffect(() => {
    getAllCommandes();
    console.log("INSTITUTION FROM COMMANDE", institution);
  }, [created]);

  const createCommande = (data) => {
    ipcRenderer.send(events.commande.create, data);
    getAllCommandes();
  };

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
          <Tab label="Commandes" />
          <Tab label="Traitement des commandes" />
          <Tab label="Enlèvements" />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <ListCommandes
          getAllCommandes={getAllCommandes}
          createCommande={createCommande}
          setCreated={setCreated}
          created={created}
          commandes={commandes}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TraitementCommandes
          getAllCommandes={getAllCommandes}
          setCreated={setCreated}
          created={created}
          commandes={commandes}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EnlevementCommandes
          getAllCommandes={getAllCommandes}
          setCreated={setCreated}
          created={created}
          commandes={commandes}
        />
      </TabPanel>
    </div>
  );
}
