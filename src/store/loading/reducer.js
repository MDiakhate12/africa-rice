export const initialState = {
    loading: false,
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case "ON_LOADING_START":
        return {
          open: true,
          ...action.payload,
        };
      case "ON_LOADING_END":
        return initialState;
  
      default:
        break;
    }
  };
  