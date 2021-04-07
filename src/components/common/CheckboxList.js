import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import CommentIcon from "@material-ui/icons/Comment";
import CheckboxListItem from "./CheckboxListItem";
import { Button } from "@material-ui/core";
import { GlobalContext } from "../../store/GlobalProvider";
import ConfirmDialog from "./ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxList() {
  const {
    institution,
    niveaux,
    niveauxInstitution,
    addNiveauInstitution,
    openConfirmDialog,
  } = useContext(GlobalContext);

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
              icon={<CommentIcon />}
            />
          );
        })}
      </List>
      <Button color="primary" variant="contained" size="large" onClick={onSave}>
        Enregistrer Niveaux
      </Button>
    </>
  );
}
