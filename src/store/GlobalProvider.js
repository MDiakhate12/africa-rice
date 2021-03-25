import { createContext } from "react";
import SpeculationProvider from "./speculation/provider";


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

  return <GlobalContext.Provider value={{
    speculations,
    addSpeculation,
    getOneSpeculation,
    getAllSpeculation,
    updateSpeculation,
    deleteByIdSpeculation,
  }}>{children}</GlobalContext.Provider>;
}
