import { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, IconButton, Tooltip, Typography } from "@material-ui/core";
import DataTable from "../common/DataTable";
import { GlobalContext } from "../../store/GlobalProvider";
import DeleteIcon from "@material-ui/icons/Delete";
// import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ContactsIcon from "@material-ui/icons/Contacts";
import ConfirmDialog from "../common/ConfirmDialog";
import ClientFormDialog from "../common/ClientFormDialog";
import { PersonAdd } from "@material-ui/icons";
import ContactFormDialog from "../common/ContactFormDialog";
import CommonDialog from "../common/CommonDialog";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(1),
    width: "25ch",
  },
  margin: {
    marginBottom: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  addButton: {
    width: "25ch",
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Client() {
  const {
    institution,
    openDialog,
    openConfirmDialog,
    openClientFormDialog,
    openContactFormDialog,
  } = useContext(GlobalContext);

  const contactColumns = [
    {
      type: "string",
      field: "prenom",
      headerName: "Prénom",
      width: 170,
    },
    {
      type: "string",
      field: "nom",
      headerName: "Nom",
      width: 170,
    },
    {
      type: "string",
      field: "telephone",
      headerName: "Téléphone",
      width: 170,
    },
    {
      type: "string",
      field: "email",
      headerName: "Email",
      width: 170,
    },
    {
      type: "string",
      field: "addresse",
      headerName: "Addresse",
      width: 170,
    },
  ];

  const columns = [
    { type: "string", field: "id", headerName: "idClient", hide: true },
    {
      type: "string",
      field: "nomCompletStructure",
      headerName: "Client",
      width: 170,
      renderCell: (params) =>
        params.getValue("estParticulier") === "true"
          ? `${params.getValue("prenom")} ${params.getValue("nom")}`
          : params.getValue("nomCompletStructure"),
      // valueGetter: (params) =>
      //   params.getValue("estParticulier") === "true"
      //     ? `${params.getValue("prenom")} ${params.getValue("nom")}`
      //     : params.getValue("nomCompletStructure"),
    },
    {
      type: "string",
      field: "acronyme",
      headerName: "Acronyme",
      width: 120,
      renderCell: (params) =>
        params.getValue("estParticulier") === "true"
          ? "-"
          : params.getValue("acronyme"),
      // valueGetter: (params) =>
      //   params.getValue("estParticulier") === "true"
      //     ? "-"
      //     : params.getValue("acronyme"),
    },
    {
      type: "string",
      field: "estParticulier",
      headerName: "Type",
      width: 120,
      renderCell: (params) =>
        params.getValue("estParticulier") === "true"
          ? "Particulier"
          : "Entreprise",
      // valueGetter: (params) =>
      //   params.getValue("estParticulier") === "true"
      //     ? "Particulier"
      //     : "Entreprise",
    },
    {
      type: "string",
      field: "telephone",
      headerName: "Telephone",
      width: 130,
    },
    {
      type: "string",
      field: "email",
      headerName: "Email",
      width: 130,
    },
    {
      type: "string",
      field: "viewContact",
      headerName: "Contacts",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Voir les contacts de ce client">
          <IconButton
            onClick={() => {
              console.log(params.row.idClient);
              ipcRenderer.send(events.contact.getAll, {
                clientId: params.row.idClient,
              });
              ipcRenderer.once(eventResponse.contact.gotAll, (ev, data) => {
                console.log(data);
                openDialog({
                  title: `Contacts du client ${
                    params.row.estParticulier === "true"
                      ? `${params.row.prenom} ${params.row.nom}`
                      : params.row.nomCompletStructure
                  }`,
                  content: (
                    <DataTable
                      columns={contactColumns}
                      rows={data.map((v) => ({ id: v.idContact, ...v }))}
                    />
                  ),
                });
              });
            }}
          >
            <ContactsIcon color="primary" />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      type: "string",
      field: "delete",
      headerName: "Supprimer",
      width: 120,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            const removeIdAndAssociations = (idName, obj) => {
              let result = {};
              for (let [key, value] of Object.entries(obj)) {
                if (key !== idName && typeof value !== "object") {
                  result[key] = value;
                }
              }
              return result;
            };
            openConfirmDialog({
              title: "Suppression",
              content: `Souhaitez vous réellement supprimer le Client ${params.getValue(
                "nomCompletStructure"
              )} ?\nAttention! Vous risquez de perdre toutes les commandes qui en dépendent.`,
              data: removeIdAndAssociations("id", params.row),
            });
            console.log(removeIdAndAssociations("id", params.row));
          }}
        >
          <DeleteIcon color="secondary" />
        </IconButton>
      ),
    },
  ];

  const [clients, setClients] = useState([]);

  const getClients = () => {
    ipcRenderer.send(events.client.getAll, {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once(eventResponse.client.gotAll, (ev, data) => {
      setClients(data);
    });
  };

  useEffect(() => {
    getClients();
  }, []);

  const handleDialogClose = (res, data) => {
    if (res === "yes") {
      console.log(data);
      try {
        ipcRenderer.send(events.client.delete, data);

        ipcRenderer.once(eventResponse.client.deleted, (event, data) => {
          setClients(
            clients.filter((client) => client.idClient !== data.idClient)
          );
        });
      } catch (error) {
        console.error(error);
      }
    }
    return;
  };
  const handleContactFormDialogClose = (res, data) => {
    if (res === "yes") {
      try {
        console.log(data);
        ipcRenderer.send(events.contact.create, data);
        ipcRenderer.on(eventResponse.contact.created, (ev, data) => {});
      } catch (error) {
        console.error(error);
      }
    }
    return;
  };

  const createClient = (data) => {
    ipcRenderer.send(events.client.create, data);
    ipcRenderer.on(eventResponse.client.created, (ev, data) => {
      getClients();
    });
  };

  const handleClientFormDialogClose = (res, data) => {
    if (res === "yes") {
      console.log(data);
      createClient(data);
      return;
    }
    return;
  };

  return (
    <>
      <ConfirmDialog handleClose={handleDialogClose} />
      <ClientFormDialog handleClose={handleClientFormDialogClose} />
      <CommonDialog handleClose={() => {}} />
      <ContactFormDialog handleClose={handleContactFormDialogClose} />

      <Button
        color="primary"
        variant="contained"
        style={{ marginBottom: "7px", marginRight: "4px" }}
        onClick={() => openClientFormDialog()}
      >
        Ajouter un client
      </Button>
      <Button
        color="primary"
        variant="contained"
        style={{ marginBottom: "7px" }}
        onClick={() => openContactFormDialog()}
      >
        Ajouter un contact
      </Button>
      <DataTable
        columns={columns}
        rows={clients?.map((m) => ({ id: m.idClient, ...m }))}
      />
    </>
  );
}
