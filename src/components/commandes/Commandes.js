import { red } from "@material-ui/core/colors";

import React, { useContext } from "react";
import DataTable from "../common/DataTable";
import { makeStyles } from "@material-ui/core/styles";

import CommandeFormDialog from "./CommandeFormDialog";
import { Button } from "@material-ui/core";
import { GlobalContext } from "../../store/GlobalProvider";

const useStyles = makeStyles((theme) => ({
  formDialog: {
    width: 300,
  },
}));

export default function Commandes() {
  const columns = [
    {
      type: "string",
      field: "id",
      headerName: "idCommade",
      hide: true,
      width: 130,
    },
    { type: "string", field: "quantite", headerName: "quantite", width: 130 },
    { type: "string", field: "montant", headerName: "montant", width: 130 },
    {
      type: "string",
      field: "etat",
      // headerName: "Etat",
      // renderCell: (params) => {
      //   if(params.getValue("estTraite"))
      // }
      width: 130,
    },
    {
      type: "string",
      field: "estEnlevee",
      headerName: "estEnlevee",
      width: 130,
    },
    { type: "string", field: "estValide", headerName: "estValide", width: 130 },
    {
      type: "string",
      field: "estRejetee",
      headerName: "estRejetee",
      width: 130,
    },
    { type: "string", field: "estTraite", headerName: "estTraite", width: 130 },
    {
      type: "string",
      field: "estAnnulee",
      headerName: "estAnnulee",
      width: 130,
    },
    {
      type: "string",
      field: "dateEnlevementSouhaitee",
      headerName: "dateEnlevementSouhaitee",
      width: 130,
    },
    {
      type: "string",
      field: "dateEnlevementReelle",
      headerName: "dateEnlevementReelle",
      width: 130,
    },
    {
      type: "string",
      field: "dateCreation",
      headerName: "dateCreation",
      width: 130,
    },
    {
      type: "string",
      field: "dateDerniereModification",
      headerName: "dateDerniereModification",
      width: 130,
    },
    {
      type: "string",
      field: "dateExpressionBesoinClient",
      headerName: "dateExpressionBesoinClient",
      width: 130,
    },
    {
      type: "string",
      field: "magasinId",
      headerName: "magasinId    ",
      width: 130,
    },
    { type: "string", field: "clientId", headerName: "clientId", width: 130 },
    {
      type: "string",
      field: "productionId",
      headerName: "productionId",
      width: 130,
    },
  ];

  let MAX = 10;

  let commandes = [];

  for (let i = 0; i < MAX; i++) {
    commandes.push({
      idCommande: `${i}`,
      quantite: `${i * 100}`,
      montant: `${i * 1000}`,
      estEnlevee: `${i % 2 === 0}`,
      estValide: `${i % 2 === 0}`,
      estRejetee: `${i % 2 === 0}`,
      estTraite: `${i % 2 === 0}`,
      estAnnulee: `${i % 2 === 0}`,
      dateEnlevementSouhaitee: Date.now(),
      dateEnlevementReelle: Date.now(),
      dateCreation: Date.now(),
      dateDerniereModification: Date.now(),
      dateExpressionBesoinClient: Date.now(),
      magasinId: 1,
      clientId: 1,
      productionId: 1,
    });
  }
  const handleCommandeFormDialogClose = (res, data) => {
    if (res === "yes") {
      console.log(data);
      return;
    }
    return;
  };

  const { openCommandeFormDialog } = useContext(GlobalContext);

  const classes = useStyles();

  return (
    <div>
      <CommandeFormDialog className={classes.formDialog} handleClose={handleCommandeFormDialogClose} />
      <Button color="primary" onClick={() => openCommandeFormDialog()}>
        Ajouter une commande
      </Button>
      <DataTable
        columns={columns}
        rows={commandes?.map((m) => ({ id: m.idCommande, ...m }))}
      />
    </div>
  );
}
