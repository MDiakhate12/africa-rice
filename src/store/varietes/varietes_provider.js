import { useReducer } from "react";
import { varietesReducer, varietesInitialState, allVarietesReducer, allVarietesInitialState } from "./varietes_reducers";

export default function VarieteProvider() {
  const [varietes, varietesDispatch] = useReducer(
    varietesReducer,
    varietesInitialState
  );
  const [allVarietes, allVarietesDispatch] = useReducer(
    allVarietesReducer,
    allVarietesInitialState
  );

  const addVariete = (payload) => {
      console.log("PAYLOAD:", payload)
      console.log("VARIETE:",varietes)
    varietesDispatch({ type: "ON_ADD_VARIETE", payload });
    return;
  };

  return [varietes, allVarietes, addVariete];
}
