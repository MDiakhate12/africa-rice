import { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import CommentIcon from "@material-ui/icons/Comment";
import CheckboxListItem from "./CheckboxListItem";
import { Button, Grid, Tooltip, Typography } from "@material-ui/core";
import { GlobalContext } from "../../store/GlobalProvider";
import ConfirmDialog from "./ConfirmDialog";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import DoneAllIcon from "@material-ui/icons/DoneAll";

const { events, eventResponse } = require("../../store/utils/events");
const { ipcRenderer } = window.require("electron");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  addButton: {
    width: "100%",
  },
}));

export default function CheckboxList() {
  const {
    institution,
    niveaux,
    niveauxInstitution,
    getAllNiveauInstitution,
    addNiveauInstitution,
    openConfirmDialog,
    getAllNiveau,
  } = useContext(GlobalContext);

  useEffect(() => {
    getAllNiveau();
    getAllNiveauInstitution({ institutionId: institution?.idInstitution });
    console.log(niveauxInstitution);
    return () => {
      ipcRenderer.removeAllListeners([
        eventResponse.niveauDeProduction.gotAll,
        events.niveauDeProduction.getAll,
      ]);
    };
  }, [institution]);

  const classes = useStyles();
  let wasChecked = false;

  const [selected, setSelected] = useState(niveauxInstitution);

  const onChecked = (value, checked) => {
    console.log(value);
    if (checked) {
      if (!selected.includes(value)) setSelected([...selected, value]);
    } else {
      if (selected.includes(value))
        setSelected(selected.filter((s) => s !== value));
    }
  };

  const onSave = () => {
    console.log("values:", niveaux);
    console.log("selectedValues:", niveauxInstitution);
    console.log("selected:", selected);

    openConfirmDialog({
      title: "Ajout niveau de production",
      content: `Une fois ajouté, les niveaux de production ne peuvent plus être supprimés. Voulez-vous confirmer ?`,
    });
  };

  const handleDialogClose = (res, data) => {
    console.log(institution);
    if (res === "yes") {
      try {
        return selected.forEach((s) => {
          if (!s.idNiveauInstitution) {
            //   console.log(s)
            addNiveauInstitution({
              niveauId: s.idNiveau,
              institutionId: institution.idInstitution,
            });
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
    return;
  };

  return (
    <>
      {" "}
      <ConfirmDialog handleClose={handleDialogClose} />
      <Grid container justify="center" alignItem="center">
        <Grid item sm={11}>
          <Typography align="center" variant="button">
            Niveaux de production
          </Typography>
        </Grid>
        <Grid item sm={12}>
          {" "}
          <List className={classes.root}>
            {niveaux.map((niveau) => {
              wasChecked = niveauxInstitution
                .map((ni) => ni.NiveauDeProduction.nomNiveau)
                .includes(niveau.nomNiveau);
              return (
                <CheckboxListItem
                  value={niveau}
                  text={niveau.nomNiveau}
                  onChecked={onChecked}
                  wasChecked={wasChecked}
                  disabled={wasChecked}
                  icon={
                    wasChecked ? (
                      <Tooltip arrow title="Niveau pris en charge">
                        <DoneAllIcon color="primary" />
                      </Tooltip>
                    ) : (
                      <Tooltip arrow title="Niveau non pris en charge">
                        <RemoveCircleOutlineIcon />
                      </Tooltip>
                    )
                  }
                />
              );
            })}
          </List>
        </Grid>
        <Grid item sm={11}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            className={classes.addButton}
            onClick={onSave}
          >
            Enregistrer
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
