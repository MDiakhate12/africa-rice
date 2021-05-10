import InstitutionProvider from "./institution/provider";
import React, { createContext } from "react";
import SpeculationProvider from "./speculation/provider";
import VarieteProvider from "./variete/provider";
import ZoneProvider from "./zone/provider";
import ConfirmDialogProvider from "./confirmDialog/provider";
import ContactFormDialogProvider from "./contactFormDialog/provider";
import ClientFormDialogProvider from "./clientFormDialog/provider";
import CommandeFormDialogProvider from "./commandeFormDialog/provider";
import CommandeUpdateFormDialogProvider from "./commandeUpdateFormDialog/provider";
import LocalisationProvider from "./localisation/provider";
import NiveauProvider from "./niveau/provider";
import NiveauInstitutionProvider from "./niveauInstitution/provider";
import CommonDialogProvider from "./commonDialog/provider";
import ProductionFormDialogProvider from "./productionFormDialog/provider";
import LoadingProvider from "./loading/provider";

const path = require("path");

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
    login,
    logout,
    checkAuth,
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

  const [
    confirmDialog,
    openConfirmDialog,
    closeConfirmDialog,
  ] = ConfirmDialogProvider();

  const [
    productionFormDialog,
    openProductionFormDialog,
    closeProductionFormDialog,
  ] = ProductionFormDialogProvider();

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

  const [
    commandeUpdateFormDialog,
    openCommandeUpdateFormDialog,
    closeCommandeUpdateFormDialog,
  ] = CommandeUpdateFormDialogProvider();

  const [dialog, openDialog, closeDialog] = CommonDialogProvider();
  const [loading, setLoading] = LoadingProvider();

  const [isDev, _] = React.useState(global.__filename.includes("init.js"));

  React.useEffect(() => {
    console.log("APP_IMAGE:", path.resolve("assets/images/africa-rice.webp"));
    console.log("APP_DIRNAME:", global.__dirname);
    console.log("APP_FILENAME:", global.__filename);
    console.log("APP_ORIGIN:", global.origin);
    console.log("APP_GLOBAL:", global);
    console.log("APP_IS_DEV", isDev);
  }, []);

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

        commandeUpdateFormDialog,
        openCommandeUpdateFormDialog,
        closeCommandeUpdateFormDialog,

        isDev,

        loading,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
