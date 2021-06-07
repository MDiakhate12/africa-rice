import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridColumnsToolbarButton,
  GridFilterToolbarButton,
} from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";

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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(rows.length === 0)
  }, [rows])

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
        loading={loading}
        components={{
          Toolbar: CustomToolbar,
          // Toolbar: GridToolbar,
        }}
        selecte
      />
    </div>
  );
}
