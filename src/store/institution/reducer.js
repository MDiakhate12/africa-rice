import { actions } from '../actions'

export const initialState = {
  institutions: [],
  institution: null,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.ON_ADD:
      return { ...state }

    case actions.ON_GET_ONE:
      return {
        ...state,
        institution: action.payload,
      }

    case actions.ON_GET_ALL:
      return {
        ...state,
        institutions: action.payload,
      }

    case actions.ON_UPDATE:
      return state.map((value) => {
        if (value.idInstitution === action.payload.idInstitution) {
          value = { idInstitution: value.idInstitution, ...action.payload }
        }
        return value
      })

    case actions.ON_DELETE:
      return state.filter((value) => value === action.payload)

    case actions.CHECK_AUTH:
      return

    default:
      break
  }
}
