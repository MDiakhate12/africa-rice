export const initialState = {
  open: false,
  data: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ON_OPEN_CLIENT_FORM_DIALOG":
      return {
        open: true,
        ...action.payload,
      };
    case "ON_CLOSE_CLIENT_FORM_DIALOG":
      return initialState;

    default:
      break;
  }
};
