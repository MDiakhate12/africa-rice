import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomButton from "../common/CustomButton";
import photoImage from "../images/photo.svg";
import { eventResponse, events } from "../../store/utils/events";
import { GlobalContext } from "../../store/GlobalProvider";
import CheckboxList from "../common/CheckboxList";

const { ipcRenderer } = window.require("electron");
const fs = window.require("fs");
const path = window.require("path");

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  margin: {
    marginBottom: theme.spacing(1),
  },
  addButton: {
    width: '100%',
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  fab: {
    position: 'sticky',
  },
  formDialog: {
    maxWidth: '30%',
  },
}))

export default function Institution() {
  const classes = useStyles()

  const { institution, updateInstitution } = useContext(GlobalContext);

  const [formState, setFormState] = useState({})

  useEffect(() => {
    console.log('INSTITUTION', institution)
    setFormState(institution)
  }, [institution])

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormState((state) => {
      return {
        ...state,
        [name]: value,
      }
    })
  }

  const handleSubmit = (e) => {
    console.log(formState)
    console.log(institution)
    updateInstitution({ id: formState.idInstitution, data: formState })
  }

  const showDialog = (e) => {
    ipcRenderer.send(events.imageDialog.open);

    ipcRenderer.once(eventResponse.imageDialog.closed, (event, data) => {
      if (!data.cancelled) {
        let file = data.filePaths[0];
        let basename = path.basename(file);
        // let filepath = path.join(__dirname, `../images/${basename}`)
        let filepath = `../images/${basename}`;

        console.log("file", file);
        console.log("filepath", filepath);
        fs.copyFile(file, `src/components/images/${basename}`, (err) => {
          if (err) throw err;
        });
        setTimeout(() => {
          setFormState({
            ...formState,
            logo: filepath,
          });
          console.log("File was copied to destination");
          console.log("STATE", formState);
        }, 2000);
      }
    });
  };

  const onSubmitChecklist = (e) => {}

  // const handleContactFormDialogClose = (res, data) => {
  //   if (res === "yes") {
  //     console.log(data);
  //     return;
  //   }
  //   return;
  // };

  return (
    <div>
      {/* <ContactFormDialog
        className={classes.formDialog}
        handleClose={handleContactFormDialogClose}
      /> */}
      <Grid container spacing={0}>
        <Grid
          item
          container
          justify="center"
          className={classes.root}
          sm={6}
          spacing={2}
        >
          <Grid item sm={6}>
            <Grid>
              <Grid item sm={12}>
                <Typography variant="button">Nos informations</Typography>

                <TextField
                  fullWidth
                  label="Nom complet"
                  name="nomComplet"
                  value={formState?.nomComplet || ''}
                  className={clsx(classes.margin, classes.textField)}
                  variant="filled"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Sigle"
                  name="sigle"
                  value={formState?.sigle || ''}
                  className={clsx(classes.margin, classes.textField)}
                  variant="filled"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Addresse"
                  name="addresse"
                  value={formState?.addresse || ''}
                  className={clsx(classes.margin, classes.textField)}
                  variant="filled"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Téléphone"
                  name="telephone"
                  value={formState?.telephone || ''}
                  className={clsx(classes.margin, classes.textField)}
                  variant="filled"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formState?.email || ''}
                  className={clsx(classes.margin, classes.textField)}
                  variant="filled"
                  onChange={handleChange}
                />
              </Grid>

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
          <Grid item sm={6}>
            <Typography variant="button">Ajouter un logo</Typography>
            <CustomButton
              image={{
                url: formState?.logo || photoImage,
                title: "Ajouter un logo",
                width: "65%",
              }}
              onClick={showDialog}
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
      {/* <FloatingActionButton
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
      /> */}
    </div>
  )
}
