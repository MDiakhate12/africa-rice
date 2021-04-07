import React, { useContext, useEffect, useState } from "react";
import DataTable from "../common/DataTable";
import StockCard from "./StockCard";
import riz from "../../components/images/riz.jpg";
import mil from "../../components/images/mil.jpg";
import defaultImage from "../../components/images/default.jpg";
import { Grid } from "@material-ui/core";
import { GlobalContext } from "../../store/GlobalProvider";
import CommonDialog from "../common/CommonDialog";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

const varieteColumn = {
  type: "string",
  field: "variete",
  headerName: "Variete",
  width: 180,
  renderCell: (params) =>
    params.getValue("VarieteInstitution")?.Variete.nomVariete,
};

const speculationColumn = {
  type: "string",
  field: "speculation",
  headerName: "Speculation",
  width: 180,
};

const columns = [
  { type: "string", field: "id", headerName: "idProduction", hide: true },
  varieteColumn,
  {
    type: "number",
    field: "totalQuantiteProduite",
    headerName: "Quantite Total Produite",
    width: 200,
  },
  {
    type: "number",
    field: "totalQuantiteDisponible",
    headerName: "Quantite Total Disponible",
    width: 200,
  },
  {
    type: "number",
    field: "totalPrix",
    headerName: "Prix Total",
    width: 160,
  },
];

function Stock() {
  const [productions, setProductions] = useState([]);

  const getAllProductions = () => {
    ipcRenderer.send("getByVarietes");
    ipcRenderer.on("gotByVarietes", (event, data) => {
      console.log(data);
      // updateColumn(false)
      setProductions(data);
      // setTimeout(() => {
      //   updateColumn(true)
      //   setProductions(groupBySpeculation(data))
      // }, 3000)
      //   setSpeculations(data.productions.map(production => produc))
    });
  };

  useEffect(() => {
    getAllProductions();
    console.log(productions);
  }, []);

  // PRODUCTIONS GROUPED BY SPECULATION 
  const [speculations, setSpeculations] = useState([
    {
      nomSpeculation: "Riz",
      dateDerniereProduction: "12 Décembre 2013",
      imageSpeculation: riz,
      quantiteProduite: 2000,
    },
    {
      nomSpeculation: "Mil",
      dateDerniereProduction: "29 Octobre 2012",
      imageSpeculation: mil,
      quantiteProduite: 3000,
    },
    {
      nomSpeculation: "Total",
      dateDerniereProduction: "14 Février 2014",
      imageSpeculation: defaultImage,
      quantiteProduite: 5000,
    },
  ]);

  const { openDialog, dialog } = useContext(GlobalContext);

  const handleDialogClose = (response, data) => {
    if (response === "yes") {
      console.log(data);
      return;
    }
    return;
  };

  return (
    <div>
      <CommonDialog handleClose={handleDialogClose} />
      <Grid container spacing={3}>
        {speculations.map((speculation) => (
          <Grid item sm={4}>
            <StockCard
              data={speculation}
              handleOpenDialog={() =>
                openDialog({
                  title: `Stock des variétés de ${speculation.nomSpeculation}`,
                  content: (
                    <DataTable
                      columns={columns}
                      rows={productions.map((v) => ({
                        id: v.varieteInstitutionId,
                        ...v,
                      }))}
                    />
                  ),
                })
              }
            >
              <DataTable
                columns={columns}
                rows={productions.map((v) => ({
                  id: v.varieteInstitutionId,
                  ...v,
                }))}
              />
            </StockCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Stock;
