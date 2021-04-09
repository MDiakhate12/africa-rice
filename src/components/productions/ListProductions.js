import React, { useContext, useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import DataTable from "../common/DataTable";
import AddProduction from "./AddProduction";
import { GlobalContext } from "../../store/GlobalProvider";
const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

const columns = [
  { type: "string", field: "id", headerName: "idProduction", hide: true },
  {
    type: "string",
    field: "variete",
    headerName: "Variete",
    width: 120,
    renderCell: (params) =>
      params.getValue("VarieteInstitution").Variete.nomVariete,
  },
  {
    type: "string",
    field: "niveau",
    headerName: "Niveau de Semences",
    width: 120,
    renderCell: (params) =>
      params.getValue("NiveauInstitution").NiveauDeProduction.nomNiveau,
  },
  {
    type: "string",
    field: "magasin",
    headerName: "Magasin",
    width: 100,
    renderCell: (params) => params.getValue("Magasin").nomMagasin,
  },
  {
    type: "string",
    field: "localisation",
    headerName: "Localisation",
    width: 100,
    renderCell: (params) => params.getValue("Localisation").village,
  },
  {
    type: "number",
    field: "quantiteProduite",
    headerName: "Quantite Produite",
    width: 130,
  },
  {
    type: "number",
    field: "prixUnitaire",
    headerName: "Prix Unitaire",
    width: 100,
  },
  {
    type: "number",
    field: "quantiteDisponible",
    headerName: "Quantite Disponible",
    width: 100,
  },
  {
    type: "number",
    field: "stockDeSecurite",
    headerName: "Stock De Securite",
    width: 100,
  },
  {
    type: "date",
    field: "dateDeProduction",
    headerName: "Date De Production",
    width: 130,
  },
];

export default function Productions() {
  const [productions, setProductions] = useState([]);
  const handleOpen = () => {
    // setOpen(true);
    openProductionFormDialog({ title: "Nouvelle Production" });
  };

  const handleDialogClose = (response, data) => {
    if (response === "yes") {
      console.log(data);
      handleSubmitProduction(data);
      getAllProductions();
      return;
    }
    return;
  };

  const handleSubmitProduction = (formData) => {
    const data = { ...formData, institutionId: 1 };
    console.log(data);
    ipcRenderer.send(events.production.create, data);
  };

  const getAllProductions = () => {
    ipcRenderer.send(events.production.getAll);
    ipcRenderer.on(eventResponse.production.gotAll, (event, data) => {
      setProductions(data);
    });
  };

  useEffect(() => {
    getAllProductions();
    console.log(productions);
  }, []);

  const { openProductionFormDialog } = useContext(GlobalContext);

  return (
    <div>
      <Button color="primary" onClick={handleOpen}>
        Ajouter une Production
      </Button>
      <Box height={10}></Box>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <AddProduction handleClose={handleClose} />
      </Modal> */}
      <AddProduction handleClose={handleDialogClose} />
      <DataTable
        columns={columns}
        rows={productions.map((v) => ({ id: v.idProduction, ...v }))}
      />
    </div>
  );
}
