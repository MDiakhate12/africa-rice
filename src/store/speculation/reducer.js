import { actions } from "../actions";

export const initialState = [];

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.ON_ADD:
      return [action.payload, ...state];

    case actions.ON_GET_ONE:
      return state.find((value) => value.idSpeculation === action.payload);

    case actions.ON_GET_ALL:
      return action.payload;

    case actions.ON_UPDATE:
      return state.map((value) => {
        if (value.idSpeculation === action.payload.idSpeculation) {
          value = { idSpeculation: value.idSpeculation, ...action.payload };
        }
        return value;
      });

    case actions.ON_DELETE:
      return state.filter((value) => value === action.payload);

    default:
      break;
  }
};
