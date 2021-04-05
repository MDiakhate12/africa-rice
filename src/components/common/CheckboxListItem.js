import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";

export default function CheckboxListItem({
  value,
  text,
  icon,
  wasChecked,
  onChecked,
}) {
  const [checked, setChecked] = React.useState(wasChecked);

  const handleChange = (e) => {
    if (wasChecked === false) {
      setChecked(e.target.checked);
    //   onChecked(e.target);
    }
  };

  return (
    <ListItem
      key={value}
      role={undefined}
      dense
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
