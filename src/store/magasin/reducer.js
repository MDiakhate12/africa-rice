import { actions } from "../actions";

export const initialState = [];

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.ON_ADD:
      return [action.payload, ...state];

    case actions.ON_GET_ONE:
      return state.find((value) => value.idMagasin === action.payload);

    case actions.ON_GET_ALL:
      return action.payload;

    case actions.ON_UPDATE:
      return state.map((value) => {
        if (value.idMagasin === action.payload.idMagasin) {
          value = { idMagasin: value.idMagasin, ...action.payload };
        }
        return value;
      });

      case actions.ON_DELETE:
        return state.filter((value) => value.idMagasin !== action.payload.idMagasin);
  

    default:
      break;
  }
};
