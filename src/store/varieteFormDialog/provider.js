import { useReducer } from "react";
import { reducer, initialState } from "./reducer";

export default function Provider() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openDialog = (payload) => {
    dispatch({ type: "ON_OPEN_VARIETE_FORM_DIALOG", payload });
  };

  const closeDialog = (payload) => {
    dispatch({ type: "ON_CLOSE_VARIETE_FORM_DIALOG" });
  };

  return [state, openDialog, closeDialog];
}
