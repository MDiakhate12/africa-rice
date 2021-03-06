import { useContext, useState, useEffect, useCallback } from "react";
import DataTable from "../common/DataTable";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import { Button } from "@material-ui/core";
import CommandeFormDialog from "./CommandeFormDialog";
import { GlobalContext } from "../../store/GlobalProvider";
import ContextMenu from "../common/ContextMenu";
import CommandeUpdateFormDialog from "./CommandeUpdateFormDialog";
import ConfirmDialog from "../common/ConfirmDialog";
// import ConfirmDialog from "../common/ConfirmDialog";

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
  InsuffisantBadge: {
    backgroundColor: "#FF0077",
  },
}));

function ListCommandes({
  getAllCommandes,
  createCommande,
  setCreated,
  created,
  commandes,
}) {
  const classes = useStyles();
  const {
    openCommandeFormDialog,
    openCommandeUpdateFormDialog,
    institution,
    deleteCommandeById,
    openConfirmDialog,
  } = useContext(GlobalContext);

  const getEtat = (params) => {
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
  };

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
          params.getValue("VarieteInstitution")?.SpeculationInstitution
            ?.Speculation.nomSpeculation
        }`,
      valueGetter: (params) =>
        `${
          params.getValue("VarieteInstitution")?.SpeculationInstitution
            ?.Speculation.nomSpeculation
        }`,
    },

    {
      type: "string",
      field: "productionId",
      headerName: "Variété",
      width: 160,
      renderCell: (params) =>
        `${params.getValue("VarieteInstitution")?.Variete?.nomVariete}`,
      valueGetter: (params) =>
        `${params.getValue("VarieteInstitution")?.Variete?.nomVariete}`,
    },
    {
      type: "string",
      field: "localisation",
      headerName: "Localité",
      width: 210,
      hide: true,
      renderCell: (params) =>
        `${params.getValue("Production")?.Localisation?.village}`,
      valueGetter: (params) =>
        `${params.getValue("Production")?.Localisation?.village}`,
    },
    {
      type: "number",
      field: "quantite",
      headerName: "Quantité (KG)",
      width: 160,
      // hide: true,
      // renderCell: (params) => `${params.getValue("quantite")} KG`,
      // valueGetter: (params) => params.getValue("quantite"),
    },
    {
      type: "number",
      field: "montant",
      headerName: "montant",
      width: 130,
      hide: true,
      renderCell: (params) => `${params.getValue("montant")} FCFA`,
      // valueGetter: (params) => params.getValue("montant"),
    },

    {
      type: "string",
      field: "etat",
      headerName: "Etat",
      renderCell: getEtat,
      valueGetter: (params) => params.getValue("EtatCommande").etat,
      width: 120,
      hide: true,
    },
    {
      type: "string",
      field: "dateExpressionBesoinClient",
      headerName: "Date de commande",
      width: 180,
      renderCell: (params) =>
        `${params
          .getValue("dateExpressionBesoinClient")
          .toLocaleString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`,
    },
    {
      type: "string",
      field: "dateEnlevementSouhaitee",
      headerName: "Date d'enlèvement souhaitée",
      width: 220,
      renderCell: (params) =>
        `${params.getValue("dateEnlevementSouhaitee").toLocaleString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`,
    },
    {
      type: "string",
      field: "dateEnlevementReelle",
      headerName: "Enlevé le",
      valueFormatter: (params) =>
        params.value?.toLocaleString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }) || "Pas encore enlevee",
      width: 180,
      hide: true,
    },
    {
      type: "string",
      field: "clientId",
      headerName: "Client",
      renderCell: (params) =>
        params.getValue("Client").nomCompletStructure ||
        `${params.getValue("Client").prenom} ${params.getValue("Client").nom}`,
      valueGetter: (params) =>
        params.getValue("Client").nomCompletStructure ||
        `${params.getValue("Client").prenom} ${params.getValue("Client").nom}`,
      width: 130,
    },
    {
      type: "string",
      field: "action",
      headerName: "Traitement de la commande",
      width: 280,
      hide: true,
      renderCell: (params) => {
        const etat = params.getValue("EtatCommande").etat;
        let etatSuivants = [];
        switch (params.getValue("EtatCommande").etat) {
          case "Acceptable":
            etatSuivants.push("Accepte");
            etatSuivants.push("Rejete");
            break;
          case "Accepte":
            etatSuivants.push("Enleve");
            etatSuivants.push("Annule");
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
          case "Insuffisant":
            etatSuivants.push("Rejete");
            break;
          default:
            break;
        }
        return (
          <div>
            {etatSuivants.map((etatSuivant) => (
              <Button
                onClick={
                  (evt) => onClick(evt, params, etatSuivant)
                  // openConfirmDialog({
                  //   title: "Traitement de la commande",
                  //   content: `Faire passer la commande à l'état <${etat}> ?`,
                  //   data: {evt, params, etatSuivant},
                  // })
                }
              >
                {etatSuivant}
              </Button>
            ))}
          </div>
        );
      },
    },
  ];

  // const handleDialogClose = (res, data) => {
  //   console.log(data)
  //   if (res === "yes") {
  //     return onClick(data.evt, data.params, data.etatSuivant);
  //   }
  //   return;
  // };

  const onClick = (evt, params, etat) => {
    const { row, id } = params;
    const data = {};
    data.data = {};
    data.id = id;
    console.log(etat);
    ipcRenderer.send("getEtatCommandeByKey", { etat });
    ipcRenderer.once("gotEtatCommandeByKey", (ev, response) => {
      if (etat === "Accepte") {
        const { Production } = row;
        const payload = {
          id: Production.idProduction,
          data: {
            idProduction: Production.idProduction,
            quantiteDisponible: Production.quantiteDisponible - row.quantite,
          },
        };
        ipcRenderer.send(events.production.update, payload);
      } else if (etat === "Enleve") {
        data.data.dateEnlevementReelle = new Date();
      }

      data.data.idCommande = row.id;
      data.data.etatId = response.idEtat;
      console.log(data);
      ipcRenderer.send(events.commande.update, data);
      getAllCommandes();
    });
  };

  // OnSubmit de la creation de commande
  const handleCommandeFormDialogClose = (res, data) => {
    if (res === "yes") {
      console.log(data);
      const { clientId } = data;
      data.articles.map((article) => {
        const commande = {};
        commande.clientId = clientId;
        commande.productionId = article?.production?.idProduction;
        commande.varieteInstitutionId = article.idVarieteInstitution;
        commande.quantite = article.quantite;
        commande.dateExpressionBesoinClient =
          article.dateExpressionBesoinClient;
        commande.dateEnlevementSouhaitee = article.dateEnlevementSouhaitee;
        commande.montant = article.quantite * article.production.prixUnitaire;
        ipcRenderer.send(events.etatCommande.getAll);
        ipcRenderer.once(eventResponse.etatCommande.gotAll, (ev, etats) => {
          console.log(etats);
          if (!article?.production?.idProduction) {
            commande.etatId = etats.filter(
              (etat) => etat.etat === "Indisponible"
            )[0].idEtat;
          } else if (
            commande.quantite > article.production.quantiteDisponible
          ) {
            commande.etatId = etats.filter(
              (etat) => etat.etat === "Insuffisant"
            )[0].idEtat;
          } else {
            commande.etatId = etats.filter(
              (etat) => etat.etat === "Acceptable"
            )[0].idEtat;
          }
          console.log(commande);
          createCommande(commande);
        });
        // commande.etatId = 1
        // createCommande(commande)
      });
      return;
    }
    return;
  };

  const handleCommandeUpdateFormDialogClose = (res, data) => {
    if (res === "yes") {
      console.log("UPDATE COMMANDE:", data);
      ipcRenderer.send(events.commande.update, {
        id: data.idCommande,
        data: data,
      });

      ipcRenderer.once(eventResponse.commande.updated, (event, data) => {
        console.log(data);
        setCreated(!created);
        return data;
      });
    }
    return;
  };

  const [contextMenuState, setContextMenuState] = useState(initialState);

  const [selectedRow, setSelectedRow] = useState();

  const handleClick = (event) => {
    event.preventDefault();

    let targetRow =
      commandes[parseInt(event.target.getAttribute("data-rowindex"))];
    if (!targetRow) return;

    setContextMenuState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });

    setSelectedRow(targetRow);

    console.log(event);
  };

  const handleClose = () => {
    setContextMenuState(initialState);
  };

  const handleUpdate = (e) => {
    handleClose();

    if (selectedRow) {
      console.log(selectedRow);

      openCommandeUpdateFormDialog({
        data: selectedRow,
      });
    }
  };

  const handleDeleteConfirmDialogClose = (res, data) => {
    console.log(data);
    if (res === "yes") {
      console.log("DELETE COMMANDE:", data);
      ipcRenderer.send(events.commande.delete, data);

      ipcRenderer.once(eventResponse.commande.deleted, (event, data) => {
        console.log(data);
        setCreated(!created);
        return data;
      });
    }
    return;
  };

  const removeAssociations = (obj) => {
    let result = {};
    for (let [key, value] of Object.entries(obj)) {
      if (typeof value !== "object") {
        result[key] = value;
      }
    }
    return result;
  };

  const handleDelete = (e) => {
    e.preventDefault();
    handleClose();

    if (selectedRow) {
      console.log(selectedRow);

      openConfirmDialog({
        title: "Suppression",
        content: `Supprimer la commande de 
        ${
          selectedRow.Production.VarieteInstitution.Variete.nomVariete
        } du client 
        ${
          selectedRow.Client.nomCompletStructure ||
          selectedRow.Client.prenom + " " + setSelectedRow.Client.nom
        } ?`,
        data: removeAssociations(selectedRow),
      });
    }
  };

  return (
    <div>
      <ContextMenu
        state={contextMenuState}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />

      <CommandeFormDialog
        className={classes.formDialog}
        handleClose={handleCommandeFormDialogClose}
      />

      <CommandeUpdateFormDialog
        className={classes.formDialog}
        handleClose={handleCommandeUpdateFormDialogClose}
      />

      <Button
        color="primary"
        variant="contained"
        style={{ marginBottom: "7px" }}
        onClick={() =>
          openCommandeFormDialog({
            title: "Nouvelle Commande",
          })
        }
      >
        Ajouter une commande
      </Button>
      <div onContextMenu={handleClick} style={{ cursor: "context-menu" }}>
        <ConfirmDialog handleClose={handleDeleteConfirmDialogClose} />

        <DataTable
          columns={columns}
          rows={commandes?.map((m) => ({ id: m.idCommande, ...m }))}
          pageSize={12}
          height="470px"
          disableColumnSelector
          // autoHeight={true}
        />
      </div>
    </div>
  );
}

export default ListCommandes;

const initialState = {
  mouseX: null,
  mouseY: null,
};
