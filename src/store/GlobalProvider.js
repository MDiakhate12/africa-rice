import { useReducer, createContext } from "react";
import * as speculationActions from "./speculation/speculation_actions";
import {
  speculationReducer,
  speculationInitialState,
} from "./speculation/speculation_reducers";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [speculationState, speculationDispatch] = useReducer(
    speculationReducer,
    speculationInitialState
  );

  const getAllSpeculation = (e) => {
    speculationDispatch(speculationActions.getAllSpeculation);
  };

  return (
    <GlobalContext.Provider value={{ speculationState, getAllSpeculation }}>
      {children}
    </GlobalContext.Provider>
  );
}
