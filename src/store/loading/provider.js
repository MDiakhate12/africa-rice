import React, { useReducer } from "react";
import { reducer, initialState } from "./reducer";

export default function Provider() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = (payload) => {
      payload 
      ? dispatch({ type: "ON_LOADING_START", payload })
      : dispatch({ type: "ON_LOADING_END", payload })
    
  };

  return [state, setLoading];
}
