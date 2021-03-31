import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UploadImageButton from "../common/UploadImageButton";
import CustomButton from "../common/CustomButton";
import photoImage from "../images/photo.svg";
import { eventResponse, events } from "../../store/utils/events";
import { GlobalContext } from "../../store/GlobalProvider";
const { ipcRenderer } = window.require("electron");

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
  margin: {
    marginBottom: theme.spacing(1),
  },
  textField: {
    width: "25ch",
  },
  addButton: {
    width: "90%",
  },
  gridContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
}));

export default function Institution() {
  const classes = useStyles();

  const {
    institution,
    getOneInstitution,
    addInstitution,
    updateInstitution,
  } = useContext(GlobalContext);

  const [formState, setFormState] = useState({
    nomComplet: "",
    sigle: "",
    logo: "",
    addresse: "",
  });

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
    // updateInstitution({ id: institution.id, data: formState });
  };

  const showDialog = (e) => {
    ipcRenderer.send(events.imageDialog.openImageDialog);

    ipcRenderer.on(eventResponse.imageDialog.openImageDialog, (event, path) => {
      console.log(path);
    });
  };

  return (
    <div>
      <Grid container justify="center" className={classes.root}>
        <Grid item sm={6}>
          <Grid>
            <Grid item sm={12}>
              <TextField
                label="Nom complet"
                name="nomComplet"
                value={institution?.nomComplet || formState.nomComplet || ""}
                className={clsx(classes.margin, classes.textField)}
                variant="filled"
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label="Sigle"
                name="sigle"
                value={institution?.sigle || formState.sigle || ""}
                className={clsx(classes.margin, classes.textField)}
                variant="filled"
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label="Addresse"
                name="addresse"
                value={institution?.addresse || formState.addresse || ""}
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
    </div>
  );
}
