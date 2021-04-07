export const initialState = {
  open: false,
  title: '',
  content: ''
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ON_OPEN_DIALOG":
      return {
        open: true,
        ...action.payload,
      };
    case "ON_CLOSE_DIALOG":
      return initialState;

    default:
      break;
  }
};
