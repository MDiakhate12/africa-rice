import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Box, Button } from '@material-ui/core'
import DataTable from '../common/DataTable'
import AddProduction from './AddProduction'
import ContextMenu from '../common/ContextMenu'
import { GlobalContext } from '../../store/GlobalProvider'
const { ipcRenderer } = window.require('electron')
const { events, eventResponse } = require('../../store/utils/events')

const columns = [
  { type: 'string', field: 'id', headerName: 'idProduction', hide: true },
  {
    type: 'string',
    field: 'speculation',
    headerName: 'Speculation',
    width: 120,
    renderCell: (params) =>
      params.getValue('VarieteInstitution').SpeculationInstitution.Speculation
        .nomSpeculation,
    valueGetter: (params) =>
      params.getValue('VarieteInstitution').SpeculationInstitution.Speculation
        .nomSpeculation,
  },
  {
    type: 'string',
    field: 'variete',
    headerName: 'Variete',
    width: 120,
    renderCell: (params) =>
      params.getValue('VarieteInstitution').Variete.nomVariete,
    valueGetter: (params) =>
      params.getValue('VarieteInstitution').Variete.nomVariete,
  },
  {
    type: 'string',
    field: 'niveau',
    headerName: 'Niveau de Semences',
    width: 120,
    renderCell: (params) =>
      params.getValue('NiveauInstitution').NiveauDeProduction.nomNiveau,
    valueGetter: (params) =>
      params.getValue('NiveauInstitution').NiveauDeProduction.nomNiveau,
  },
  {
    type: 'string',
    field: 'magasin',
    headerName: 'Magasin',
    width: 100,
    renderCell: (params) => params.getValue('Magasin').nomMagasin,
    valueGetter: (params) => params.getValue('Magasin').nomMagasin,
  },
  {
    type: 'string',
    field: 'region',
    headerName: 'Région',
    width: 170,
    renderCell: (params) => params.getValue('Localisation').region,
    valueGetter: (params) => params.getValue('Localisation').region,
  },
  {
    type: 'string',
    field: 'localisation',
    headerName: 'Localité',
    width: 210,
    renderCell: (params) => params.getValue('Localisation').village,
    valueGetter: (params) => params.getValue('Localisation').village,
  },
  {
    type: 'number',
    field: 'quantiteProduite',
    headerName: 'Quantite Produite',
    width: 160,
    renderCell: (params) => `${params.getValue('quantiteProduite')} KG`,
  },
  {
    type: 'number',
    field: 'prixUnitaire',
    headerName: 'Prix Unitaire',
    width: 100,
    renderCell: (params) => `${params.getValue('prixUnitaire')} FCFA`,
  },
  {
    type: 'number',
    field: 'quantiteDisponible',
    headerName: 'Quantite Disponible',
    width: 100,
    renderCell: (params) => `${params.getValue('quantiteDisponible')} KG`,
  },
  {
    type: 'number',
    field: 'stockDeSecurite',
    headerName: 'Stock De Securite',
    width: 100,
    renderCell: (params) => `${params.getValue('stockDeSecurite')} KG`,
  },
  {
    type: 'date',
    field: 'dateDeProduction',
    headerName: 'Date De Production',
    width: 160,
  },
]

export default function Productions() {
  const [productions, setProductions] = useState([])
  const [created, setCreated] = useState(false)
  const { openProductionFormDialog, institution } = useContext(GlobalContext)
  const handleOpen = () => {
    // setOpen(true);
    openProductionFormDialog({ title: 'Nouvelle Production' })
  }

  const handleDialogClose = (response, data) => {
    if (response === 'yes') {
      console.log(data)
      handleSubmitProduction(data)
      // getAllProductions();
      setCreated(!created)
      return
    }
    return
  }

  const handleSubmitProduction = (formData) => {
    const data = { ...formData, institutionId: institution?.idInstitution }
    data.quantiteDisponible = data.quantiteProduite
    console.log(data)
    ipcRenderer.send(events.production.create, data)
  }

  const getAllProductions = () => {
    ipcRenderer.send(events.production.getAll, {
      institutionId: institution?.idInstitution,
    })
    ipcRenderer.once(eventResponse.production.gotAll, (event, data) => {
      setProductions(data)
    })
  }

  // const openContextMenu = useCallback((e) => {
  //   e.preventDefault();
  //   console.log(e);
  //   console.log(productions[parseInt(e.target.getAttribute("data-rowindex"))]);
  //   let targetRow = productions[parseInt(e.target.getAttribute("data-rowindex"))]
  //   targetRow && handleRightClick(e)
  //   e.target.click()

  // }, []);

  useEffect(() => {
    getAllProductions()

    // document.addEventListener("contextmenu", openContextMenu);

    // return () => {
    //   document.removeEventListener("contextmenu", openContextMenu);
    // };
  }, [created])

  const [contextMenuState, setContextMenuState] = useState(initialState)

  const [selectedRow, setSelectedRow] = useState()

  const handleClick = (event) => {
    event.preventDefault()

    let targetRow =
      productions[parseInt(event.target.getAttribute('data-rowindex'))]
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

      openProductionFormDialog({
        title: 'Modifier Production',
        data: selectedRow,
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
      {/* <div onContextMenu={handleClick} style={{ cursor: "context-menu" }}> */}
      <DataTable
        columns={columns}
        rows={productions.map((v) => ({ id: v.idProduction, ...v }))}
      />
      {/* </div> */}
    </div>
  )
}

const initialState = {
  mouseX: null,
  mouseY: null,
}
