import { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { GlobalContext } from "../../store/GlobalProvider";
import { makeStyles } from "@material-ui/core";

export default function ContactFormDialog({ handleClose }) {
  const {
    contactFormDialog: { open },
    closeContactFormDialog,
  } = useContext(GlobalContext);

  const close = (response, dataFromOpen = null) => {
    closeContactFormDialog();
    handleClose(response, dataFromOpen);
  };

  const [formState, setFormState] = useState({
    prenom: "",
    nom: "",
    telephone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };


  return (
    <div>
      <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nouveau contact</DialogTitle>
        <DialogContent>
          <TextField
            value={formState.prenom || ""}
            onChange={handleChange}
            autoFocus
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
            autoFocus
            margin="dense"
            id="nom"
            name="nom"
            label="Nom"
            type="text"
            fullWidth
          />{" "}
          <TextField
            value={formState.telephone || ""}
            onChange={handleChange}
            autoFocus
            margin="dense"
            id="telephone"
            name="telephone"
            label="Téléphone"
            type="phone"
            fullWidth
          />{" "}
          <TextField
            value={formState.email || ""}
            onChange={handleChange}
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
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
