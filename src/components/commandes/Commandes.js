import React, { useContext, useState, useEffect } from 'react'
import { red } from '@material-ui/core/colors'
import DataTable from '../common/DataTable'
import { makeStyles } from '@material-ui/core/styles'

import CommandeFormDialog from './CommandeFormDialog'
import { Button } from '@material-ui/core'
import { GlobalContext } from '../../store/GlobalProvider'

const { ipcRenderer } = window.require('electron')
const { events, eventResponse } = require('../../store/utils/events')

const useStyles = makeStyles((theme) => ({
  formDialog: {
    width: 300,
  },
}))

const columns = [
  {
    type: 'string',
    field: 'id',
    headerName: 'idCommade',
    hide: true,
    width: 130,
  },
  { type: 'string', field: 'quantite', headerName: 'quantite', width: 130 },
  { type: 'string', field: 'montant', headerName: 'montant', width: 130 },
  {
    type: 'string',
    field: 'etat',
    headerName: 'Etat',
    renderCell: (params) => params.getValue('EtatCommande')?.etat,
    width: 130,
  },
  {
    type: 'string',
    field: 'dateEnlevementReelle',
    headerName: 'dateEnlevementReelle',
    width: 130,
  },
  {
    type: 'string',
    field: 'createdAt',
    headerName: 'date creation',
    width: 130,
  },
  {
    type: 'string',
    field: 'updatedAt',
    headerName: 'date Derniere Modification',
    width: 130,
  },
  {
    type: 'string',
    field: 'dateExpressionBesoinClient',
    headerName: 'dateExpressionBesoinClient',
    width: 130,
  },
  { type: 'string', field: 'clientId', headerName: 'clientId', width: 130 },
  {
    type: 'string',
    field: 'productionId',
    headerName: 'productionId',
    width: 130,
  },
]
function Commandes() {
  const [commandes, setCommandes] = useState([])
  const [created, setCreated] = useState(false)

  const getAllCommandes = () => {
    ipcRenderer.send(events.commande.getAll)
    ipcRenderer.on(eventResponse.commande.gotAll, (ev, data) => {
      console.log(data)
      setCommandes(data)
    })
  }

  // FORMDATA FOR MOR KAIRE

  useEffect(() => {
    getAllCommandes()
  }, [created])

  const createCommande = (data) => {
    ipcRenderer.send(events.commande.create, data)
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
        commande.montant = article.quantite * article.production.prixUnitaire
        commande.etatId = 1
        console.log(commande)
        createCommande(commande)
        setCreated(!created)
      })
      return
    }
    return
  }

  // FORMDATA FOR MOR KAIRE

  const { openCommandeFormDialog } = useContext(GlobalContext)

  const classes = useStyles()

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
  )
}

export default Commandes
