import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { GlobalContext } from "../../store/GlobalProvider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core";

export default function ClientFormDialog({ handleClose }) {
  const {
    clientFormDialog: { open },
    closeClientFormDialog,
    institution,
  } = useContext(GlobalContext);

  const close = (response, dataFromOpen = null) => {
    closeClientFormDialog();
    handleClose(response, dataFromOpen);
  };

  const [formState, setFormState] = useState({
    nomCompletStructure: null,
    acronyme: null,
    prenom: null,
    nom: null,
    telephone: "",
    email: "",
    estParticulier: "false",
    institutionId: institution?.idInstitution,
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title">Nouveau client</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Type de client</FormLabel>
            <RadioGroup
              aria-label="estParculier"
              name="estParticulier"
              value={formState.estParticulier}
              onChange={handleChange}
            >
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="Entreprise"
              />
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Particulier"
              />
            </RadioGroup>
          </FormControl>
          {formState.estParticulier === "false" ? (
            <>
              <TextField
                value={formState.nomCompletStructure || ""}
                onChange={handleChange}
                autoFocus
                margin="dense"
                id="nomCompletStructure"
                name="nomCompletStructure"
                label="Nom complet structure"
                type="text"
                fullWidth
              />{" "}
              <TextField
                value={formState.acronyme || ""}
                onChange={handleChange}
                autoFocus
                margin="dense"
                id="acronyme"
                name="acronyme"
                label="Acronyme"
                type="text"
                fullWidth
              />{" "}
            </>
          ) : (
            <>
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
            </>
          )}
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
