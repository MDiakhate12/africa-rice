import React, { useContext, useState, useEffect } from 'react'
import DataTable from '../common/DataTable'
import { makeStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'
import { Button } from '@material-ui/core'
import CommandeFormDialog from './CommandeFormDialog'
import { GlobalContext } from '../../store/GlobalProvider'
import ContextMenu from '../common/ContextMenu'

const { ipcRenderer } = window.require('electron')
const { events, eventResponse } = require('../../store/utils/events')

const useStyles = makeStyles((theme) => ({
  formDialog: {
    width: 300,
  },
  AcceptableBadge: {
    backgroundColor: '#00AFD7',
  },
  EnleveBadge: {
    backgroundColor: '#00FB0B',
  },
  RejeteBadge: {
    backgroundColor: '#F30A0B',
  },
  AnnuleBadge: {
    backgroundColor: '#AA9999',
  },
  AccepteBadge: {
    backgroundColor: '#00C677',
  },
  InsuffisantBadge: {
    backgroundColor: '#FF0077',
  },
}))

function Commandes() {
  const classes = useStyles()
  const { openCommandeFormDialog, institution } = useContext(GlobalContext)
  const getEtat = (params) => {
    const etat = params.getValue('EtatCommande').etat
    return (
      <Badge
        classes={{ badge: classes[`${etat}Badge`] }}
        style={{ marginLeft: 30 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        badgeContent={etat}
      />
    )
  }

  const columns = [
    {
      type: 'string',
      field: 'id',
      headerName: 'idCommade',
      hide: true,
      width: 130,
    },
    {
      type: 'string',
      field: 'nomSpeculation',
      headerName: 'Spéculation',
      width: 140,
      renderCell: (params) =>
        `${
          params.getValue('Production')?.VarieteInstitution
            ?.SpeculationInstitution?.Speculation.nomSpeculation
        }`,
      valueGetter: (params) =>
        `${
          params.getValue('Production')?.VarieteInstitution
            ?.SpeculationInstitution?.Speculation.nomSpeculation
        }`,
    },

    {
      type: 'string',
      field: 'productionId',
      headerName: 'Production',
      width: 160,
      renderCell: (params) =>
        `${
          params.getValue('Production')?.VarieteInstitution?.Variete?.nomVariete
        }`,
      valueGetter: (params) =>
        `${
          params.getValue('Production')?.VarieteInstitution?.Variete?.nomVariete
        }`,
    },
    {
      type: 'string',
      field: 'localisation',
      headerName: 'Localité',
      width: 210,
      renderCell: (params) =>
        `${params.getValue('Production')?.Localisation?.village}`,
      valueGetter: (params) =>
        `${params.getValue('Production')?.Localisation?.village}`,
    },
    {
      type: 'number',
      field: 'quantite',
      headerName: 'quantite',
      width: 130,
      renderCell: (params) => `${params.getValue('quantite')} KG`,
      // valueGetter: (params) => params.getValue("quantite"),
    },
    {
      type: 'number',
      field: 'montant',
      headerName: 'montant',
      width: 130,
      renderCell: (params) => `${params.getValue('montant')} FCFA`,
      // valueGetter: (params) => params.getValue("montant"),
    },

    {
      type: 'string',
      field: 'etat',
      headerName: 'Etat',
      renderCell: getEtat,
      valueGetter: (params) => params.getValue('EtatCommande').etat,
      width: 120,
    },
    {
      type: 'string',
      field: 'dateExpressionBesoinClient',
      headerName: 'Commandé le',
      width: 130,
    },
    {
      type: 'string',
      field: 'dateEnlevementSouhaitee',
      headerName: 'Enlevement souhaite',
      width: 130,
    },
    {
      type: 'string',
      field: 'dateEnlevementReelle',
      headerName: 'Enlevé le',
      valueFormatter: (params) =>
        params.value?.toDateString() || 'Pas encore enlevee',
      width: 180,
    },
    {
      type: 'string',
      field: 'clientId',
      headerName: 'Client',
      renderCell: (params) =>
        params.getValue('Client').nomCompletStructure ||
        params.getValue('Client').prenom,
      valueGetter: (params) =>
        params.getValue('Client').nomCompletStructure ||
        params.getValue('Client').prenom,
      width: 130,
    },
    {
      type: 'string',
      field: 'action',
      headerName: 'Action',
      width: 240,
      renderCell: (params) => {
        const etat = params.getValue('EtatCommande').etat
        let etatSuivants = []
        switch (params.getValue('EtatCommande').etat) {
          case 'Acceptable':
            etatSuivants.push('Accepte')
            etatSuivants.push('Rejete')
            break
          case 'Accepte':
            etatSuivants.push('Enleve')
            etatSuivants.push('Annule')
            break
          case 'Enleve':
            // etatSuivant = 'primary'
            break
          case 'Annule':
            // etatSuivant = 'primary'
            break
          case 'Rejete':
            // etatSuivant = 'primary'
            break
          case 'Insuffisant':
            etatSuivants.push('Rejete')
            break
          default:
            break
        }
        return (
          <div>
            {etatSuivants.map((etatSuivant) => (
              <Button onClick={(evt) => onClick(evt, params, etatSuivant)}>
                {etatSuivant}
              </Button>
            ))}
          </div>
        )
      },
    },
  ]
  const [commandes, setCommandes] = useState([])

  const getAllCommandes = () => {
    ipcRenderer.send(events.commande.getAll, {
      institutionId: institution?.idInstitution,
    })
    ipcRenderer.once(eventResponse.commande.gotAll, (ev, data) => {
      console.log(data)
      setCommandes(data)
    })
  }

  const onClick = (evt, params, etat) => {
    const { row, id } = params
    const data = {}
    data.data = {}
    data.id = id
    ipcRenderer.send(events.etatCommande.getOne, { etat })
    ipcRenderer.once(eventResponse.etatCommande.gotOne, (ev, response) => {
      if (etat === 'Accepte') {
        const { Production } = row
        const payload = {
          id: Production.idProduction,
          data: {
            idProduction: Production.idProduction,
            quantiteDisponible: Production.quantiteDisponible - row.quantite,
          },
        }
        ipcRenderer.send(events.production.update, payload)
      } else if (etat === 'Enleve') {
        data.data.dateEnlevementReelle = new Date()
      }

      data.data.idCommande = row.id
      data.data.etatId = response.idEtat
      console.log(data)
      ipcRenderer.send(events.commande.update, data)
      getAllCommandes()
    })
  }

  useEffect(() => {
    getAllCommandes()
  }, [institution])

  const createCommande = (data) => {
    ipcRenderer.send(events.commande.create, data)
    getAllCommandes()
  }

  // OnSubmit de la creation de commande
  const handleCommandeFormDialogClose = (res, data) => {
    if (res === 'yes') {
      console.log(data)
      const { clientId } = data
      data.articles.map((article) => {
        const commande = {}
        commande.clientId = clientId
        commande.productionId = article.production.idProduction
        commande.quantite = article.quantite
        commande.dateExpressionBesoinClient = article.dateExpressionBesoinClient
        commande.dateEnlevementSouhaitee = article.dateEnlevementSouhaitee
        commande.montant = article.quantite * article.production.prixUnitaire
        ipcRenderer.send(events.etatCommande.getAll)
        ipcRenderer.once(eventResponse.etatCommande.gotAll, (ev, etats) => {
          console.log(etats)
          if (commande.quantite > article.production.quantiteDisponible) {
            commande.etatId = etats.filter(
              (etat) => etat.etat === 'Insuffisant',
            )[0].idEtat
          } else {
            commande.etatId = etats.filter(
              (etat) => etat.etat === 'Acceptable',
            )[0].idEtat
          }
          console.log(commande)
          createCommande(commande)
        })
        // commande.etatId = 1
        // createCommande(commande)
      })
      return
    }
    return
  }

  // FORMDATA FOR MOR KAIRE

  const [contextMenuState, setContextMenuState] = useState(initialState)

  const [selectedRow, setSelectedRow] = useState()

  const handleClick = (event) => {
    event.preventDefault()

    let targetRow =
      commandes[parseInt(event.target.getAttribute('data-rowindex'))]
    if (!targetRow) return

    setContextMenuState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    })

    setSelectedRow(targetRow)

    console.log(event)
  }

  const handleClose = () => {
    setContextMenuState(initialState)
    setSelectedRow(null)
  }

  const handleUpdate = (e) => {
    handleClose()

    if (selectedRow) {
      console.log(selectedRow)

      openCommandeFormDialog({
        title: 'Modifier Commande',
        data: {
          idCommande: selectedRow.idCommande,
          Client: selectedRow.Client,
          articles: [
            {
              niveau:
                selectedRow.NiveauInstitution.NiveeauDeProduction.nomNiveau,
              speculation:
                selectedRow.Production.VarieteInstitution.SpeculationInstitution
                  .Speculation.nomSpeculation,
              production: selectedRow.Production,
              quantite: selectedRow.quantite,
              dateExpressionBesoinClient:
                selectedRow.dateExpressionBesoinClient,
              dateEnlevementSouhaitee: selectedRow.dateEnlevementSouhaitee,
            },
          ],
        },
      })
    }
  }

  const handleDelete = (e) => {}

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
      <Button
        color="primary"
        onClick={() =>
          openCommandeFormDialog({
            title: 'Nouvelle Commande',
          })
        }
      >
        Ajouter une commande
      </Button>
      {/* <div onContextMenu={handleClick} style={{ cursor: "context-menu" }}> */}
      <DataTable
        columns={columns}
        rows={commandes?.map((m) => ({ id: m.idCommande, ...m }))}
        pageSize={12}
        height="500px"
        // autoHeight={true}
      />
      {/* </div> */}
    </div>
  )
}

export default Commandes

const initialState = {
  mouseX: null,
  mouseY: null,
}
