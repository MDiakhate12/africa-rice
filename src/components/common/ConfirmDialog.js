import { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { GlobalContext } from "../../store/GlobalProvider";

export default function ConfirmDialog({ handleClose, maxWidth }) {
  const {
    confirmDialog: { open, title, content, data },
    closeConfirmDialog,
  } = useContext(GlobalContext);

  const close = (response, dataFromOpen = null) => {
    closeConfirmDialog();
    handleClose(response, dataFromOpen);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth={maxWidth || "xs"}
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              close("no", data);
            }}
            color="secondary"
          >
            Non
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              close("yes", data);
            }}
            color="primary"
          >
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
