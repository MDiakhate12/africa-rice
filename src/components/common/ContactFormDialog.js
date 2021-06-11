import { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { GlobalContext } from "../../store/GlobalProvider";
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import MuiPhoneInput from "material-ui-phone-number";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

export default function ContactFormDialog({ handleClose }) {
  const {
    contactFormDialog: { open, data },
    closeContactFormDialog,
    institution,
  } = useContext(GlobalContext);

  const close = (response, dataFromOpen = null) => {
    closeContactFormDialog();
    handleClose(response, dataFromOpen);
    setFormState({
      prenom: "",
      nom: "",
      telephone: "",
      email: "",
      clientId: "",
    });
  };

  const [formState, setFormState] = useState({
    prenom: "",
    nom: "",
    telephone: "",
    email: "",
    addresse: "",
    clientId: "",
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    console.log(value);
    if (value.length < 9) {
      setFormState((state) => {
        return {
          ...state,
          telephone: value,
        };
      });
    } else {
      return;
    }
  };

  const [clients, setClients] = useState([]);

  const getClients = () => {
    ipcRenderer.send(events.client.getAll, {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.on(eventResponse.client.gotAll, (ev, data) => {
      setClients(data);
    });
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          close("yes", formState);
        }
      }}
    >
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title">Nouveau contact client</DialogTitle>
        <DialogContent>
          <FormControl
            fullWidth
            // className={classes.formControl}
          >
            <InputLabel id="client-label" color="secondary">
              Client
            </InputLabel>
            <Select
              labelId="client-label"
              id="client-select"
              value={formState.clientId || ""}
              name="clientId"
              color="secondary"
              fullWidth
              onChange={handleChange}
            >
              {clients.map((client) => (
                <MenuItem key={client.idClient} value={client.idClient}>
                  {client.nomCompletStructure ||
                    `${client.prenom} ${client.nom} (${
                      !client.estParticulier ? "Entreprise" : "Particulier"
                    })`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            value={formState.prenom || ""}
            onChange={handleChange}
            margin="dense"
            id="prenom"
            name="prenom"
            label="Prénom"
            type="text"
            fullWidth
          />{" "}
          <TextField
            value={formState.nom || ""}
            onChange={handleChange}
            margin="dense"
            id="nom"
            name="nom"
            label="Nom"
            type="text"
            fullWidth
          />{" "}
          <MuiPhoneInput
            defaultCountry="sn"
            regions={"africa"}
            countryCodeEditable={false}
            fullWidth
            label="Téléphone"
            name="telephone"
            format="## ### ## ##"
            margin="dense"
            value={formState?.telephone || ""}
            // variant="filled"
            onChange={handlePhoneChange}
          />
          <TextField
            value={formState.email || ""}
            onChange={handleChange}
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
          />
          <TextField
            value={formState.addresse || ""}
            onChange={handleChange}
            margin="dense"
            id="addresse"
            name="addresse"
            label="Addresse"
            placeholder="Ex. Liberté 6 Dakar, Sénégal"
            type="address"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => close("no", formState)} color="primary">
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
