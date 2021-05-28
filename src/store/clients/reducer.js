import { actions } from "../actions";

export const initialState = [];

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.ON_ADD:
      return [action.payload, ...state];

    case actions.ON_GET_ONE:
      return state.find((value) => value.speculationId === action.payload);

    case actions.ON_GET_ALL:
      return state;

    case actions.ON_UPDATE:
      return state.map((value) => {
        if (value.speculationId === action.payload.speculationId) {
          value = { speculationId: value.speculationId, ...action.payload };
        }
        return value;
      });

    case actions.ON_DELETE:
      return state.filter((value) => value.idClient !== action.payload.idClient);

    default:
      break;
  }
};
