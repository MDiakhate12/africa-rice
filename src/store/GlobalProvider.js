import InstitutionProvider from "./institution/provider";
import { createContext } from "react";
import SpeculationProvider from "./speculation/provider";
import VarieteProvider from "./variete/provider";
import ZoneProvider from "./zone/provider";
import ConfirmDialogProvider from "./confirmDialog/provider";
import ContactFormDialogProvider from "./contactFormDialog/provider";
import ClientFormDialogProvider from "./clientFormDialog/provider";
import CommandeFormDialogProvider from "./commandeFormDialog/provider";
import LocalisationProvider from "./localisation/provider";
import NiveauProvider from "./niveau/provider";
import NiveauInstitutionProvider from "./niveauInstitution/provider";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [
    institutions,
    institution,
    addInstitution,
    getOneInstitution,
    getAllInstitution,
    updateInstitution,
    deleteByIdInstitution,
  ] = InstitutionProvider();

  const [
    speculations,
    addSpeculation,
    getOneSpeculation,
    getAllSpeculation,
    updateSpeculation,
    deleteByIdSpeculation,
  ] = SpeculationProvider();

  const [
    varietes,
    addVariete,
    getOneVariete,
    getAllVariete,
    updateVariete,
    deleteByIdVariete,
  ] = VarieteProvider();

  const [
    zones,
    addZone,
    getOneZone,
    getAllZone,
    updateZone,
    deleteByIdZone,
  ] = ZoneProvider();

  const [
    localisations,
    addLocalisation,
    getOneLocalisation,
    getAllLocalisation,
    updateLocalisation,
    deleteByIdLocalisation,
  ] = LocalisationProvider();

  const [
    niveaux,
    addNiveau,
    getOneNiveau,
    getAllNiveau,
    updateNiveau,
    deleteByIdNiveau,
  ] = NiveauProvider();

  const [
    niveauxInstitution,
    addNiveauInstitution,
    getOneNiveauInstitution,
    getAllNiveauInstitution,
    updateNiveauInstitution,
    deleteByIdNiveauInstitution,
  ] = NiveauInstitutionProvider();

  const [confirmDialog, openDialog, closeDialog] = ConfirmDialogProvider();
  const [
    contactFormDialog,
    openContactFormDialog,
    closeContactFormDialog,
  ] = ContactFormDialogProvider();

  const [
    clientFormDialog,
    openClientFormDialog,
    closeClientFormDialog,
  ] = ClientFormDialogProvider();

  const [
    commandeFormDialog,
    openCommandeFormDialog,
    closeCommandeFormDialog,
  ] = CommandeFormDialogProvider();

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
        openDialog,
        closeDialog,

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
