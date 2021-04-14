import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";  
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { GlobalContext } from "../../store/GlobalProvider";

export default function CommonDialog({ handleClose, maxWidth }) {
  const {
    dialog: { open, title, content },
    closeDialog,
  } = useContext(GlobalContext);

  const close = (response, dataFromOpen = null) => {
    closeDialog();
    handleClose(response, dataFromOpen);
  };

  const [data, setData] = useState();

  return (
    <div>
      <Dialog
        maxWidth={maxWidth || "md"}
        fullWidth
        open={open}
        onClose={close}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={() => close("no", data)} color="primary">
            Annuler
          </Button>
          <Button onClick={() => close("yes", data)} color="primary">
            Entregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
