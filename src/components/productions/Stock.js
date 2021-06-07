import { useContext, useEffect, useState } from "react";
import DataTable from "../common/DataTable";
import StockCard from "./StockCard";
import { Grid } from "@material-ui/core";
import { GlobalContext } from "../../store/GlobalProvider";
import CommonDialog from "../common/CommonDialog";

const { ipcRenderer } = window.require("electron");
const path = window.require("path");

const columns = [
  { type: "string", field: "id", headerName: "idProduction", hide: true },
  {
    type: "string",
    field: "variete",
    headerName: "Variete",
    width: 180,
    renderCell: (params) =>
      params.getValue("VarieteInstitution")?.Variete.nomVariete,
  },
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
    field: "totalStock",
    headerName: "Total Stock ",
    width: 160,
  },
  {
    type: "number",
    field: "totalPrix",
    headerName: "Prix Total",
    width: 160,
  },
];

function Stock() {
  const { openDialog, institution, isDev } = useContext(GlobalContext);

  const [productionsBySpeculation, setProductionsBySpeculation] = useState([]);
  const [productionsByVariete, setProductionsByVariete] = useState([]);

  const getProductionsSumBySpeculation = () => {
    ipcRenderer.send("getProductionsSumBySpeculation", {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once("gotProductionsSumBySpeculation", (event, data) => {
      console.log("sum by speculation:", data);

      setProductionsBySpeculation([
        ...data.map((production) => ({
          varieteInstitutionId:
            production.VarieteInstitution.speculationInstitutionId,
          nomSpeculation:
            production.VarieteInstitution.SpeculationInstitution.Speculation
              .nomSpeculation,
          imageSpeculation:
            production.VarieteInstitution.SpeculationInstitution.Speculation
              .imageSpeculation,
          totalQuantiteDisponible: production.totalQuantiteDisponible,
        })),
      ]);
    });
  };

  const getProductionsSumByVarietes = () => {
    ipcRenderer.send("getByVarietes", {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once("gotByVarietes", (event, data) => {
      console.log("sum by variete:", data);
      setProductionsByVariete(data);
    });
  };

  const getProductionsSumBySpeculationTotal = () => {
    ipcRenderer.send("getProductionsSumBySpeculationTotal", {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once("gotProductionsSumBySpeculationTotal", (event, data) => {
      console.log("total by speculation:", data);

      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      setProductionsBySpeculation((p) => [
        ...p,
        {
          varieteInstitutionId: 0,
          nomSpeculation: "Total",
          dateDerniereProduction: new Date().toLocaleDateString(
            "fr-FR",
            options
          ),
          imageSpeculation: `${isDev ? "" : global.__dirname}/assets/images/default.jpg`,
          totalQuantiteDisponible: data.totalQuantiteDisponible,
        },
      ]);
    });
  };

  useEffect(() => {
    getProductionsSumBySpeculation();
    getProductionsSumByVarietes();
    // getProductionsSumBySpeculationTotal();
  }, [institution]);

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
        {productionsBySpeculation.map((speculation) => (
          <Grid key={speculation.nomSpeculation} item sm={3}>
            <StockCard
              data={speculation}
              handleOpenDialog={() =>
                openDialog({
                  title: `Stock des variétés de ${speculation.nomSpeculation}`,
                  content: (
                    <DataTable
                      columns={columns}
                      rows={productionsByVariete
                        .filter(
                          (v) =>
                            v.VarieteInstitution.speculationInstitutionId ===
                              speculation.varieteInstitutionId ||
                            speculation.varieteInstitutionId === 0
                        )
                        .map((v) => ({
                          id: v.varieteInstitutionId,
                          ...v,
                        }))}
                    />
                  ),
                })
              }
            >
              {/* <DataTable
                columns={columns}
                rows={productionsByVariete
                  .filter(
                    (v) =>
                      v.VarieteInstitution.speculationInstitutionId ===
                      speculation.varieteInstitutionId
                  )
                  .map((v) => ({
                    id: v.varieteInstitutionId,
                    ...v,
                  }))}
              /> */}
            </StockCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Stock;
