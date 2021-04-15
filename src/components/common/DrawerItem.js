import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link, useLocation } from "react-router-dom";
import { makeStyles, MenuItem, useTheme } from "@material-ui/core";

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

export default function DrawerItem({ children, text, to, isActive, index }) {
  const classes = useStyles();

  ///////////////////////////

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const location = useLocation();

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //////////////////////////

  return (
    <>
      <Link to={to} className={classes.default}>
        {/* <ListItem
          button
          classes={{
            root: classes.root,
            isActive: isActive ? classes.isActive : "",
          }}
        >
          <ListItemIcon>{children}</ListItemIcon>
          <ListItemText primary={text} className={classes.itemText} />
        </ListItem> */}
        <MenuItem
          key={text}
          selected={index === selectedIndex}
          onClick={(event) => {
            handleMenuItemClick(event, index);
            handleClickListItem(event);
          }}
        >
          <ListItemIcon>{children}</ListItemIcon>
          <ListItemText primary={text} className={classes.itemText} />
        </MenuItem>
      </Link>
    </>
  );
}
