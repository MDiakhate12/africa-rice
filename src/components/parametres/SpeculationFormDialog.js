import { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { GlobalContext } from "../../store/GlobalProvider";
import { Grid, Typography } from "@material-ui/core";
import CustomButton from "../common/CustomButton";
import { eventResponse, events } from "../../store/utils/events";

const { ipcRenderer } = window.require("electron");

export default function SpeculationFormDialog({ handleClose }) {

  const { isDev } = useContext(GlobalContext);

  const {
    speculationFormDialog: { open },
    closeSpeculationFormDialog,
  } = useContext(GlobalContext);

  const close = (response, dataFromOpen = null) => {
    closeSpeculationFormDialog();
    handleClose(response, dataFromOpen);
  };

  const [formState, setFormState] = useState({
    nomSpeculation: "",
    imageSpeculation: "",
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const showDialog = (e) => {
    console.log(process.env);
    ipcRenderer.send(events.imageDialog.open);

    ipcRenderer.on(eventResponse.imageDialog.closed, (event, data) => {
      if (data) {
        console.log(data);

        setFormState({
          ...formState,
          imageSpeculation: data,
        });
      }
    });
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
        <DialogTitle id="form-dialog-title">Nouvelle Speculation</DialogTitle>
        <DialogContent>
        <Grid container>
            <Grid item></Grid>
            <Grid item></Grid>
          </Grid>
          <TextField
            value={formState.nomSpeculation || ""}
            onChange={handleChange}
            autoFocus
            margin="dense"
            id="nomSpeculation"
            name="nomSpeculation"
            label="Nom"
            type="text"
            style={{
              width: "25ch",
            }}
            fullWidth
          />
          <CustomButton
            image={{
              url:
                formState.imageSpeculation ||
                `${isDev ? "" : global.__dirname}/assets/images/photo.svg`,
              title: "Image",
              width: "20%",
              height: "20%",
            }}
            onClick={showDialog}
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
