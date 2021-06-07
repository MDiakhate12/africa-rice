import { useEffect, useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { GlobalContext } from "../../store/GlobalProvider";
import { eventResponse, events } from "../../store/utils/events";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@material-ui/core";

const { ipcRenderer } = window.require("electron");

export default function VarieteFormDialog({ handleClose }) {
  const {
    varieteFormDialog: { open, data },
    closeVarieteFormDialog,
    institution,
  } = useContext(GlobalContext);

  const close = (response, dataFromOpen = null) => {
    closeVarieteFormDialog();
    handleClose(response, dataFromOpen);
    setFormState({
      nomVariete: "",
      longueurCycle: "",
      zoneId: "",
    });
  };

  const [formState, setFormState] = useState({
    nomVariete: "",
    longueurCycle: "",
    zoneId: "",
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const [zones, setZones] = useState([]);

  const getZones = () => {
    ipcRenderer.send(events.zoneAgro.getAll, {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once(eventResponse.zoneAgro.gotAll, (event, data) => {
      setZones(data);
    });
  };

  useEffect(() => {
    getZones();
  }, [institution]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title">Nouvelle Variété</DialogTitle>
        <DialogContent>
          <TextField
            value={data?.nomSpeculation || ""}
            onChange={handleChange}
            autoFocus
            margin="dense"
            id="nomSpeculation"
            name="nomSpeculation"
            label="Spéculation"
            type="text"
            disabled
            fullWidth
          />
          <TextField
            value={formState.nomVariete || ""}
            onChange={handleChange}
            autoFocus
            margin="dense"
            id="nomVariete"
            name="nomVariete"
            label="Nom de la variété"
            type="text"
            fullWidth
          />
          <TextField
            value={formState.longueurCycle || ""}
            onChange={handleChange}
            margin="dense"
            id="longueurCycle"
            name="longueurCycle"
            label="Longueur Cycle"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Jours</InputAdornment>
              ),
            }}
            fullWidth
          />
          <FormControl variant="standard" fullWidth>
            <InputLabel id="zone-label">Zone Agro Ecologique</InputLabel>
            <Select
              labelId="zone-label"
              id="zoneId"
              value={formState.zoneId || ""}
              name="zoneId"
              onChange={handleChange}
            >
              {zones.map((zone) => {
                return (
                  <MenuItem key={zone.idZone} value={zone.idZone}>
                    {zone.nomZone}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              close("no", { speculationId: data.idSpeculation, ...formState })
            }
            color="primary"
          >
            Annuler
          </Button>
          <Button
            onClick={() =>
              close("yes", { speculationId: data.idSpeculation, ...formState })
            }
            color="primary"
          >
            Entregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
