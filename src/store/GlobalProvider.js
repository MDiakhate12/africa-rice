import { createContext } from 'react'
import SpeculationProvider from './speculation/provider'
import SpeculationInstitutionProvider from './speculationInstitution/provider'
import VarieteProvider from './variete/provider'
import VarieteInstitutionProvider from './varieteInstitution/provider'
import ZoneProvider from './zone/provider'
import ProductionProvider from './production/provider'
import MagasinProvider from './magasin/provider'
import NiveuInstitutionProvider from './niveauInstitution/provider'
import LocalisationProvider from './localisation/provider'

export const GlobalContext = createContext()

export default function GlobalProvider({ children }) {
  const [
    speculations,
    addSpeculation,
    getOneSpeculation,
    getAllSpeculation,
    updateSpeculation,
    deleteByIdSpeculation,
  ] = SpeculationProvider()

  const [
    speculationsInstitution,
    addSpeculationInstitution,
    getOneSpeculationInstitution,
    getAllSpeculationInstitution,
    updateSpeculationInstitution,
    deleteByIdSpeculationInstitution,
  ] = SpeculationInstitutionProvider()

  const [
    varietes,
    addVariete,
    getOneVariete,
    getAllVariete,
    updateVariete,
    deleteByIdVariete,
  ] = VarieteProvider()

  const [
    varietesInstitution,
    addVarieteInstitution,
    getOneVarieteInstitution,
    getAllVarieteInstitution,
    updateVarieteInstitution,
    deleteByIdVarieteInstitution,
  ] = VarieteInstitutionProvider()

  const [
    zones,
    addZone,
    getOneZone,
    getAllZone,
    updateZone,
    deleteByIdZone,
  ] = ZoneProvider()

  const [
    productions,
    addProduction,
    getOneProduction,
    getAllProduction,
    updateProduction,
    deleteByIdProduction,
  ] = ProductionProvider()

  const [
    magasins,
    addMagasin,
    getOneMagasin,
    getAllMagasin,
    updateMagasin,
    deleteByIdMagasin,
  ] = MagasinProvider()

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

        productions,
        addProduction,
        getOneProduction,
        getAllProduction,
        updateProduction,
        deleteByIdProduction,

        magasins,
        addMagasin,
        getOneMagasin,
        getAllMagasin,
        updateMagasin,
        deleteByIdMagasin,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
