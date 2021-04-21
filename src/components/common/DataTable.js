import * as React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridColumnsToolbarButton,
  GridFilterToolbarButton,
} from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDataGrid-window": {
      overflowY: "hidden",
    },
  },
}));

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridColumnsToolbarButton />
      <GridToolbarExport />
      <GridFilterToolbarButton />
    </GridToolbarContainer>
  );
}

export default function DataTable({
  columns,
  rows,
  height,
  pageSize,
  disableColumnSelector,
  checkboxSelection,
  autoHeight,
}) {
  const classes = useStyles();
  return (
    <div elevation={1} style={{ height: height || 420, width: "100%" }}>
      <DataGrid
        className={classes.root}
        rows={rows}
        columns={columns}
        pageSize={pageSize || 8}
        checkboxSelection={checkboxSelection || false}
        disableColumnSelector={disableColumnSelector || false}
        rowHeight={35}
        autoHeight={autoHeight || false}
        hideFooterSelectedRowCount
        components={{
          Toolbar: CustomToolbar,
          // Toolbar: GridToolbar,
        }}
        selecte
      />
    </div>
  );
}
