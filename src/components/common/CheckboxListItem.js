import { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: "3 2",
    height: "4ch",
  },
}));

export default function CheckboxListItem({
  value,
  text,
  icon,
  wasChecked,
  onChecked,
}) {
  const [checked, setChecked] = useState(wasChecked);

  useEffect(() => {
    setChecked(wasChecked);
  }, []);

  const handleChange = (e) => {
    if (wasChecked === false) {
      setChecked(e.target.checked);
      //   onChecked(e.target);
    }
  };

  const classes = useStyles();
  const theme = useTheme();

  return (
    <ListItem
      key={value}
      role={undefined}
      dense
      className={classes.listItem}
      button
      onClick={() => {
        if (wasChecked === false) {
          setChecked(!checked);
          onChecked(value, !checked);
        }
      }}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={checked}
          disabled={wasChecked}
          tabIndex={-1}
          onChange={handleChange}
          disableRipple
        />
      </ListItemIcon>
      <ListItemText primary={text} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="comments">
          {icon}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
