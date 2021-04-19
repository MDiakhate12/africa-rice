import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ListItemIcon, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export default function ContextMenu({
  state,
  handleUpdate,
  handleDelete,
  handleClose,
}) {
  return (
    <div>
      <Menu
        // id="simple-menu"
        // anchorEl={anchorEl}
        // keepMounted
        // open={Boolean(anchorEl)}
        // onClose={handleClose}

        keepMounted
        open={state.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null
            ? { top: state.mouseY, left: state.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleUpdate}>
          <ListItemIcon>
            <EditIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="button">Modifier</Typography>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography variant="button">Supprimer</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
