import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { GlobalContext } from "../../store/GlobalProvider";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@material-ui/core";
import ClientFormDialog from "../common/ClientFormDialog";
import Accordions from "../common/Accordions";
import CommandeAccordionItem from "./CommandeAccordionItem";
import ConfirmDialog from "../common/ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(1),
    // width: "25ch",
  },
  formDialog: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
}));

export default function CommandeFormDialog({ handleClose }) {
  const {
    commandeFormDialog: { open },
    closeCommandeFormDialog,
    openClientFormDialog,
  } = useContext(GlobalContext);

  const close = (response, dataFromOpen = null) => {
    closeCommandeFormDialog();
    handleClose(response, dataFromOpen);
  };

  const [formState, setFormState] = useState({
    client: {},
    articles: [{}],
  });

  // const handleChange = (e) => {
  //   setFormState({ ...formState, [e.target.name]: e.target.value });
  // };

  const [max, setMax] = useState(10);

  const [clients, setClients] = useState(() => {
    let cls = [];
    for (let i = 0; i < max - 5; i++) {
      cls.push({
        idClient: `${i}`,
        nomCompletStructure: `Client Numero ${i}`,
        acronyme: `CLNT${i}`,
        estParticulier: `${i % 2 === 0}`,
        prenom: "Client",
        nom: `Numero ${i}`,
        telephone: `${i}${i} ${i}${i}${i} ${i}${i} ${i}${i}`,
        email: `client@numero${i}.com`,
      });
    }
    return cls;
  });

  const [state, setState] = useState("");

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState(value);
    console.log(formState);
    console.log("client", { name, value });
  };

  const handleArticleChange = (e, idx) => {
    let { name, value } = e.target;
    console.log(name, value);
    setState({
      ...formState,
      articles: [
        ...formState.articles,
        formState.articles.map((article, index) => {
          if (index === idx) {
            article[name] = value;
          }
          return article;
        }),
      ],
    });
    console.log(formState);
  };

  const handleClientFormDialogClose = (res, data) => {
    if (res === "yes") {
      console.log(data);
      setMax(max + 1);
      setClients([
        ...clients,
        {
          idClient: max,
          ...data,
        },
      ]);
      setState(max);
      return;
    }
    return;
  };

  const handleDeleteArticle = (index) => {
    setFormState({
      ...formState,
      articles: formState.articles.filter((_, idx) => idx !== index),
    });
  };
  const addCommandeArtcile = () => {
    setFormState({
      ...formState,
      articles: [...formState.articles, {}],
    });
  };
  const classes = useStyles();

  const handleDeleteDialogClose = (res, data) => {
    if (res === "yes") {
      try {
        // console.log(data)
        return handleDeleteArticle(data);
      } catch (error) {
        console.error(error);
      }
    }
    return;
  };

  return (
    <div>
      <ClientFormDialog handleClose={handleClientFormDialogClose} />
      <ConfirmDialog handleClose={handleDeleteDialogClose} />

      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Nouvelle commande</DialogTitle>
        <DialogContent className={classes.formDialog}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item sm={10}>
              <FormControl
                fullWidth
                variant="standard"
                className={classes.formControl}
              >
                <InputLabel id="client-label" color="secondary">
                  Clients
                </InputLabel>
                <Select
                  labelId="client-label"
                  id="client-select"
                  value={state || ""}
                  name="client"
                  color="secondary"
                  fullWidth
                  onChange={handleChange}
                >
                  {clients.map((client) => (
                    <MenuItem key={client.idCommande} value={client.idClient}>
                      {client.nomCompletStructure}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={2}>
              {" "}
              <Tooltip title="Ajouter un nouveau client">
                <IconButton
                  onClick={() => openClientFormDialog()}
                  color="secondary"
                >
                  <GroupAddIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>

          <Grid container justify="space-between" alignItems="flex-end">
            <Grid item sm={10}>
              <Accordions>
                {formState.articles.map((data, index) => (
                  <CommandeAccordionItem
                    key={index}
                    index={index}
                    handleDataChange={handleArticleChange}
                    handleDeleteArticle={handleDeleteArticle}
                  />
                ))}
              </Accordions>
            </Grid>
            <Grid item sm={2}>
              <Tooltip title="Ajouter un nouvel article">
                <IconButton
                  onClick={() => addCommandeArtcile()}
                  color="secondary"
                  variant="outlined"
                >
                  <AddShoppingCartIcon fontSize="large" />
                </IconButton>
              </Tooltip>{" "}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => close("no", formState)} color="secondary">
            Annuler
          </Button>
          <Button onClick={() => close("yes", formState)} color="primary">
            Entregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
