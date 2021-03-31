import { createContext } from "react";
import SpeculationProvider from "./speculation/provider";
import VarieteProvider from "./variete/provider";
import ZoneProvider from "./zone/provider";
import InstitutionProvider from "./institution/provider";
import ConfirmDialogProvider from "./confirmDialog/provider";
import LocalisationProvider from "./localisation/provider";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
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
    institutions,
    institution,
    addInstitution,
    getOneInstitution,
    getAllInstitution,
    updateInstitution,
    deleteByIdInstitution,
  ] = InstitutionProvider();

  const [
    localisations,
    addLocalisation,
    getOneLocalisation,
    getAllLocalisation,
    updateLocalisation,
    deleteByIdLocalisation,
  ] = LocalisationProvider();

  const [confirmDialog, openDialog, closeDialog] = ConfirmDialogProvider();

  return (
    <GlobalContext.Provider
      value={{
        speculations,
        addSpeculation,
        getOneSpeculation,
        getAllSpeculation,
        updateSpeculation,
        deleteByIdSpeculation,
       
        varietes,
        addVariete,
        getOneVariete,
        getAllVariete,
        updateVariete,
        deleteByIdVariete,

        zones,
        addZone,
        getOneZone,
        getAllZone,
        updateZone,
        deleteByIdZone,

        institutions,
        institution,
        addInstitution,
        getOneInstitution,
        getAllInstitution,
        updateInstitution,
        deleteByIdInstitution,

        confirmDialog,
        openDialog,
        closeDialog,

        localisations,
        addLocalisation,
        getOneLocalisation,
        getAllLocalisation,
        updateLocalisation,
        deleteByIdLocalisation,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
