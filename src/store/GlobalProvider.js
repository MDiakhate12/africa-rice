import { createContext } from "react";
import SpeculationProvider from "./speculations/speculations_provider";

import VarieteProvider from "./varietes/varietes_provider";
import ZoneProvider from "./zones/zones_provider";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {

  const [varietes, allVarietes, addVariete] = VarieteProvider()
  const [speculations, allSpeculations] = SpeculationProvider()
  const [zones, allZones] = ZoneProvider()
  
  return (
    <GlobalContext.Provider value={{ 
      varietes,
      speculations,
      addVariete,
      allVarietes,
      allSpeculations,
      zones, 
      allZones,
      // getAllVarietes,
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
