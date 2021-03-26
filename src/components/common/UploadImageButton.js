import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const { ipcRenderer } = window.require("electron");

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export default function UploadImageButton({ file }) {
  const classes = useStyles();

  const [state, setState] = useState(file);

  const handleChange = (e) => {
    console.log(e);
    setState(e.target.value);
  };

  const showDialog = (e) => {
    ipcRenderer.send("open-file-dialog");

    ipcRenderer.on("selected-directory", (event, path) => {
      console.log(path);
    });
  };

  return (
    <div className={classes.root}>
      <img src={state} alt={state} />
      {/* <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        value={state}
        onChange={handleChange}
      /> */}
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          size="large"
          onClick={showDialog}
        >
          <PhotoCamera fontSize="large" />
        </IconButton>
      </label>
    </div>
  );
}
