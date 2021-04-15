import React, { useContext, useState, useEffect } from "react";
import DataTable from "../common/DataTable";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import { Button } from "@material-ui/core";
import CommandeFormDialog from "./CommandeFormDialog";
import { GlobalContext } from "../../store/GlobalProvider";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

const useStyles = makeStyles((theme) => ({
  formDialog: {
    width: 300,
  },
  AcceptableBadge: {
    backgroundColor: "#00AFD7",
  },
  EnleveBadge: {
    backgroundColor: "#00FB0B",
  },
  RejeteBadge: {
    backgroundColor: "#F30A0B",
  },
  AnnuleBadge: {
    backgroundColor: "#AA9999",
  },
  AccepteBadge: {
    backgroundColor: "#00C677",
  },
}));

function Commandes() {
  const classes = useStyles();
  const columns = [
    {
      type: "string",
      field: "id",
      headerName: "idCommade",
      hide: true,
      width: 130,
    },
    {
      type: "string",
      field: "nomSpeculation",
      headerName: "Spéculation",
      width: 140,
      renderCell: (params) =>
        `${
          params.getValue("Production")?.VarieteInstitution
            ?.SpeculationInstitution?.Speculation.nomSpeculation
        }`,
    },

    {
      type: "string",
      field: "productionId",
      headerName: "Production",
      width: 160,
      renderCell: (params) =>
        `${
          params.getValue("Production")?.VarieteInstitution?.Variete?.nomVariete
        }`,
    },
    {
      type: "string",
      field: "localisation",
      headerName: "Localité",
      width: 210,
      renderCell: (params) =>
        `${params.getValue("Production")?.Localisation?.village}`,
    },
    { type: "string", field: "quantite", headerName: "quantite", width: 130 },
    { type: "string", field: "montant", headerName: "montant", width: 130 },

    {
      type: "string",
      field: "etat",
      headerName: "Etat",
      renderCell: (params) => {
        const etat = params.getValue("EtatCommande").etat;
        return (
          <Badge
            classes={{ badge: classes[`${etat}Badge`] }}
            style={{ marginLeft: 30 }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            badgeContent={etat}
          />
        );
      },
      width: 120,
    },
    {
      type: "string",
      field: "dateExpressionBesoinClient",
      headerName: "Commandé le",
      width: 130,
    },
    {
      type: "string",
      field: "dateEnlevementSouhaitee",
      headerName: "Enlevement souhaite",
      width: 130,
    },
    {
      type: "string",
      field: "dateEnlevementReelle",
      headerName: "Enlevé le",
      valueFormatter: (params) =>
        params.value?.toDateString() || "Pas encore enlevee",
      width: 180,
    },
    {
      type: "string",
      field: "clientId",
      headerName: "clientId",
      renderCell: (params) =>
        params.getValue("Client").nomCompletStructure ||
        params.getValue("Client").prenom,
      width: 130,
    },
    {
      type: "string",
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        const etat = params.getValue("EtatCommande").etat;
        let etatSuivant;
        switch (params.getValue("EtatCommande").etat) {
          case "Acceptable":
            etatSuivant = "Accepte";
            break;
          case "Accepte":
            etatSuivant = "Enleve";
            break;
          case "Enleve":
            // etatSuivant = 'primary'
            break;
          case "Annule":
            // etatSuivant = 'primary'
            break;
          case "Rejete":
            // etatSuivant = 'primary'
            break;
          default:
            break;
        }
        return (
          <div>
            {etatSuivant ? (
              <Button onClick={(evt) => onClick(evt, params, etatSuivant)}>
                {etatSuivant}
              </Button>
            ) : (
              ""
            )}
          </div>
        );
      },
    },
  ];
  const [commandes, setCommandes] = useState([]);
  // const [created, setCreated] = useState(false)
  // const [updated, setUpdated] = useState(false)

  const getAllCommandes = () => {
    ipcRenderer.send(events.commande.getAll);
    ipcRenderer.once(eventResponse.commande.gotAll, (ev, data) => {
      console.log(data);
      setCommandes(data);
    });
  };

  const onClick = (evt, params, etat) => {
    const { row, id } = params;
    const data = {};
    data.data = {};
    data.id = id;
    ipcRenderer.send(events.etatCommande.getOne, { etat });
    ipcRenderer.once(eventResponse.etatCommande.gotOne, (ev, response) => {
      if (etat === "Accepte") {
        const { Production } = row;
        const payload = {
          id: Production.idProduction,
          data: {
            idProduction: Production.idProduction,
            quantiteDisponible: Production.quantiteDisponible - row.quantite,
          },
        };
        console.log(payload);
        ipcRenderer.send(events.production.update, payload);
      }
      data.data.idCommande = row.id;
      data.data.etatId = response.idEtat;
      console.log(data);
      ipcRenderer.send(events.commande.update, data);
      getAllCommandes();
    });
  };

  useEffect(() => {
    getAllCommandes();
  }, []);

  const createCommande = (data) => {
    ipcRenderer.send(events.commande.create, data);
    getAllCommandes();
  };

  // OnSubmit de la creation de commande
  const handleCommandeFormDialogClose = (res, data) => {
    if (res === "yes") {
      console.log(data);
      const { clientId } = data;
      data.articles.map((article) => {
        const commande = {};
        commande.clientId = clientId;
        commande.productionId = article.production.idProduction;
        commande.quantite = article.quantite;
        commande.dateExpressionBesoinClient =
          article.dateExpressionBesoinClient;
        commande.dateEnlevementSouhaitee = article.dateEnlevementSouhaitee;
        commande.montant = article.quantite * article.production.prixUnitaire;
        commande.etatId = 1;
        console.log(commande);
        createCommande(commande);
        // setCreated(!created)
      });
      return;
    }
    return;
  };

  // FORMDATA FOR MOR KAIRE

  const { openCommandeFormDialog } = useContext(GlobalContext);
  return (
    <div>
      <CommandeFormDialog
        className={classes.formDialog}
        handleClose={handleCommandeFormDialogClose}
      />
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

export default Commandes;
