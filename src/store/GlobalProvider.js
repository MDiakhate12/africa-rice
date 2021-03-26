import { createContext } from "react";
import SpeculationProvider from "./speculation/provider";
import SpeculationInstitutionProvider from "./speculation/provider";
import VarieteProvider from "./variete/provider";
import VarieteInstitutionProvider from "./varieteInstitution/provider";
import ZoneProvider from "./zone/provider";

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
    speculationsInstitution,
    addSpeculationInstitution,
    getOneSpeculationInstitution,
    getAllSpeculationInstitution,
    updateSpeculationInstitution,
    deleteByIdSpeculationInstitution,
  ] = SpeculationInstitutionProvider();

  const [
    varietes,
    addVariete,
    getOneVariete,
    getAllVariete,
    updateVariete,
    deleteByIdVariete,
  ] = VarieteProvider();

  const [
    varietesInstitution,
    addVarieteInstitution,
    getOneVarieteInstitution,
    getAllVarieteInstitution,
    updateVarieteInstitution,
    deleteByIdVarieteInstitution,
  ] = VarieteInstitutionProvider();

  const [
    zones,
    addZone,
    getOneZone,
    getAllZone,
    updateZone,
    deleteByIdZone,
  ] = ZoneProvider();

  return (
    <GlobalContext.Provider
      value={{
        speculations,
        addSpeculation,
        getOneSpeculation,
        getAllSpeculation,
        updateSpeculation,
        deleteByIdSpeculation,
        speculationsInstitution,
        addSpeculationInstitution,
        getOneSpeculationInstitution,
        getAllSpeculationInstitution,
        updateSpeculationInstitution,
        deleteByIdSpeculationInstitution,
        varietes,
        addVariete,
        getOneVariete,
        getAllVariete,
        updateVariete,
        deleteByIdVariete,
        varietesInstitution,
        addVarieteInstitution,
        getOneVarieteInstitution,
        getAllVarieteInstitution,
        updateVarieteInstitution,
        deleteByIdVarieteInstitution,
        zones,
        addZone,
        getOneZone,
        getAllZone,
        updateZone,
        deleteByIdZone,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
