import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDataGrid-window": {
      overflowY: "hidden",
    }
  },
}));

export default function DataTable({ columns, rows }) {
  const classes = useStyles();
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        className={classes.root}
        rows={rows}
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
