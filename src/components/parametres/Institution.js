import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UploadImageButton from "../common/UploadImageButton";
import CustomButton from "../common/CustomButton";
import photoImage from "../images/photo.svg";
import { eventResponse, events } from "../../store/utils/events";
import { GlobalContext } from "../../store/GlobalProvider";
import CheckboxList from "../common/CheckboxList";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import FloatingActionButton from "../common/FloatingActionButton";
import ContactsIcon from "@material-ui/icons/Contacts";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ContactFormDialog from "../common/ContactFormDialog";

const { ipcRenderer } = window.require("electron");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  margin: {
    marginBottom: theme.spacing(1),
  },
  textField: {
    width: "25ch",
  },
  addButton: {
    width: "88%",
  },
  gridContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  fab: {
    position: "sticky",
  },
  formDialog: {
    maxWidth: "30%"
  }
}));

export default function Institution() {
  const classes = useStyles();

  const {
    institutions,
    institution,
    getOneInstitution,
    addInstitution,
    updateInstitution,
    niveauxInstitution,
    niveaux,
    openContactFormDialog,
  } = useContext(GlobalContext);

  const [formState, setFormState] = useState({});

  useEffect(() => {
    console.log("INSTITUTION", institution);
    setFormState(institution);
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
    let { name, value } = e.target;
    setFormState((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    console.log(formState);
    console.log(institution);
    updateInstitution({ id: formState.idInstitution, data: formState });
  };

  const showDialog = (e) => {
    ipcRenderer.send(events.imageDialog.openImageDialog);

    ipcRenderer.on(eventResponse.imageDialog.openImageDialog, (event, path) => {
      console.log(path);
    });
  };

  const onSubmitChecklist = (e) => {};

  const handleContactFormDialogClose = (res, data) => {
    if (res === "yes") {
      console.log(data);
      return;
    }
    return;
  };

  return (
    <div>
      <ContactFormDialog className={classes.formDialog} handleClose={handleContactFormDialogClose} />
      <Grid container>
        <Grid item container justify="center" className={classes.root} sm={6}>
          <Grid item sm={6}>
            <Grid>
              <Grid item sm={12}>
                <TextField
                  label="Nom complet"
                  name="nomComplet"
                  value={formState?.nomComplet || ""}
                  className={clsx(classes.margin, classes.textField)}
                  variant="filled"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  label="Sigle"
                  name="sigle"
                  value={formState?.sigle || ""}
                  className={clsx(classes.margin, classes.textField)}
                  variant="filled"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  label="Addresse"
                  name="addresse"
                  value={formState?.addresse || ""}
                  className={clsx(classes.margin, classes.textField)}
                  variant="filled"
                  onChange={handleChange}
                />
                <Grid item sm={12} className={classes.gridContainer}>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.addButton}
                    size="large"
                    onClick={handleSubmit}
                  >
                    Enregistrer
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <CustomButton
              images={[
                {
                  url: photoImage,
                  title: "Ajouter un logo",
                  width: "65%",
                  onClick: () => showDialog(),
                },
              ]}
            />
          </Grid>
        </Grid>
        <Grid item sm={3}>
          <CheckboxList onSubmitChecklist={onSubmitChecklist} />
        </Grid>
        {/* 
        <Grid item sm={3}>
          <Tooltip title="Ajouter un contact">
            <IconButton>
              <PersonAddIcon />
            </IconButton>
          </Tooltip>
        </Grid> */}
      </Grid>
      <FloatingActionButton
        className={classes.fab}
        actions={[
          {
            icon: <PersonAddIcon />,
            name: "Ajouter Contact",
            onClick: () => openContactFormDialog(),
          },
          { icon: <ContactsIcon />, name: "Voir Contacts" },
          { icon: <GroupAddIcon />, name: "Ajouter Client" },
          { icon: <PeopleAltIcon />, name: "Voir Clients" },
        ]}
      />
    </div>
  );
}
