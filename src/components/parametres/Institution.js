import React, { useState } from "react";
import clsx from "clsx";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UploadImageButton from "../common/UploadImageButton";
import CustomButton from "../common/CustomButton";
import photoImage from "../images/photo.svg";

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
    width: "90%"
  },
  gridContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
}));

export default function Institution() {
  const classes = useStyles();

  const [formState, setFormState] = useState({
    nomComplet: "",
    sigle: "",
    logo: "",
    addresse: "",
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormState((state) => {
      let newState = state;
      newState[e.target.name] = e.target.value;
      return newState;
    });
  };

  const handleSubmit = (e) => {
    console.log(formState);
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
                value={formState.nomComplet || ""}
                className={clsx(classes.margin, classes.textField)}
                variant="filled"
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label="Sigle"
                name="sigle"
                value={formState.sigle || ""}
                className={clsx(classes.margin, classes.textField)}
                variant="filled"
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label="Addresse"
                name="addresse"
                value={formState.addresse || ""}
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
              },
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
}
