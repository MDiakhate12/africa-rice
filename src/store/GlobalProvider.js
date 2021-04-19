import InstitutionProvider from './institution/provider'
import { createContext } from 'react'
import SpeculationProvider from './speculation/provider'
import VarieteProvider from './variete/provider'
import ZoneProvider from './zone/provider'
import ConfirmDialogProvider from './confirmDialog/provider'
import ContactFormDialogProvider from './contactFormDialog/provider'
import ClientFormDialogProvider from './clientFormDialog/provider'
import CommandeFormDialogProvider from './commandeFormDialog/provider'
import LocalisationProvider from './localisation/provider'
import NiveauProvider from './niveau/provider'
import NiveauInstitutionProvider from './niveauInstitution/provider'
import CommonDialogProvider from './commonDialog/provider'
import ProductionFormDialogProvider from './productionFormDialog/provider'

import riz from '../components/images/riz.jpg'
import sorgho from '../components/images/sorgho.jpg'
import mil from '../components/images/mil.jpg'
import mais from '../components/images/mais.jpg'
import arachide from '../components/images/arachide.jpg'
import niebe from '../components/images/niebe.jpg'
import oignon from '../components/images/oignon.jpg'
import tomate from '../components/images/tomate.jpg'
import piment from '../components/images/piment.jpg'
import jaxatu from '../components/images/jaxatu.jpg'
import pomme_de_terre from '../components/images/pomme_de_terre.jpg'
import patate_douce from '../components/images/patate_douce.jpg'
import gombo from '../components/images/gombo.jpg'
import aubergine from '../components/images/aubergine.jpg'

// import './institution/institution'
// import './speculation/speculation'
// import './zone/zones'
// import './variete/varietes'
// import './niveau/niveau'
// import './niveau/etatCommande'

export const GlobalContext = createContext()

export default function GlobalProvider({ children }) {
  const [
    institutions,
    institution,
    addInstitution,
    getOneInstitution,
    getAllInstitution,
    updateInstitution,
    deleteByIdInstitution,
    login,
    logout,
    checkAuth,
  ] = InstitutionProvider()

  const [
    speculations,
    addSpeculation,
    getOneSpeculation,
    getAllSpeculation,
    updateSpeculation,
    deleteByIdSpeculation,
  ] = SpeculationProvider()

  const [
    varietes,
    addVariete,
    getOneVariete,
    getAllVariete,
    updateVariete,
    deleteByIdVariete,
  ] = VarieteProvider()

  const [
    zones,
    addZone,
    getOneZone,
    getAllZone,
    updateZone,
    deleteByIdZone,
  ] = ZoneProvider()

  const [
    localisations,
    addLocalisation,
    getOneLocalisation,
    getAllLocalisation,
    updateLocalisation,
    deleteByIdLocalisation,
  ] = LocalisationProvider()

  const [
    niveaux,
    addNiveau,
    getOneNiveau,
    getAllNiveau,
    updateNiveau,
    deleteByIdNiveau,
  ] = NiveauProvider()

  const [
    niveauxInstitution,
    addNiveauInstitution,
    getOneNiveauInstitution,
    getAllNiveauInstitution,
    updateNiveauInstitution,
    deleteByIdNiveauInstitution,
  ] = NiveauInstitutionProvider()

  const [
    confirmDialog,
    openConfirmDialog,
    closeConfirmDialog,
  ] = ConfirmDialogProvider()

  const [
    productionFormDialog,
    openProductionFormDialog,
    closeProductionFormDialog,
  ] = ProductionFormDialogProvider()

  const [
    contactFormDialog,
    openContactFormDialog,
    closeContactFormDialog,
  ] = ContactFormDialogProvider()

  const [
    clientFormDialog,
    openClientFormDialog,
    closeClientFormDialog,
  ] = ClientFormDialogProvider()

  const [
    commandeFormDialog,
    openCommandeFormDialog,
    closeCommandeFormDialog,
  ] = CommandeFormDialogProvider()

  const [dialog, openDialog, closeDialog] = CommonDialogProvider()

  return (
    <GlobalContext.Provider
      value={{
        institutions,
        institution,
        addInstitution,
        getOneInstitution,
        getAllInstitution,
        updateInstitution,
        deleteByIdInstitution,
        login,
        logout,
        checkAuth,

        speculations,
        addSpeculation,
        getOneSpeculation,
        getAllSpeculation,
        updateSpeculation,
        deleteByIdSpeculation,

        zones,
        addZone,
        getOneZone,
        getAllZone,
        updateZone,
        deleteByIdZone,

        confirmDialog,
        openConfirmDialog,
        closeConfirmDialog,

        localisations,
        addLocalisation,
        getOneLocalisation,
        getAllLocalisation,
        updateLocalisation,
        deleteByIdLocalisation,

        niveaux,
        addNiveau,
        getOneNiveau,
        getAllNiveau,
        updateNiveau,
        deleteByIdNiveau,

        niveauxInstitution,
        addNiveauInstitution,
        getOneNiveauInstitution,
        getAllNiveauInstitution,
        updateNiveauInstitution,
        deleteByIdNiveauInstitution,

        varietes,
        addVariete,
        getOneVariete,
        getAllVariete,
        updateVariete,
        deleteByIdVariete,

        contactFormDialog,
        openContactFormDialog,
        closeContactFormDialog,

        clientFormDialog,
        openClientFormDialog,
        closeClientFormDialog,

        commandeFormDialog,
        openCommandeFormDialog,
        closeCommandeFormDialog,

        dialog,
        openDialog,
        closeDialog,

        productionFormDialog,
        openProductionFormDialog,
        closeProductionFormDialog,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
