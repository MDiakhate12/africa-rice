import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  default: {
    textDecoration: "none",
    color: "inherit",
  },
  isActive: {
    backgroundColor: theme.palette.primary.main,
    // color: "white"
  },
  root: {
    color: theme.palette.primary.main,
  },
  itemText: {
    color: "initial",
  },
}));

export default function DrawerItem({ children, text, to, isActive }) {
  const classes = useStyles();
  return (
    <>
      <Link to={to} className={classes.default}>
        <ListItem
          button
          classes={{
            root: classes.root,
            isActive: isActive ? classes.isActive : "",
          }}
        >
          <ListItemIcon>{children}</ListItemIcon>
          <ListItemText primary={text} className={classes.itemText} />
        </ListItem>
      </Link>
    </>
  );
}
