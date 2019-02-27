import { supportState } from "./action";

const initialSupport = {
  loading: false,
  succuss: null,
  error: null
};

export const support = (state = initialSupport, action) => {
  switch (action.type) {
    case supportState.LOADING:
      return { ...state, loading: action.state };
    case supportState.SUCCESS:
      return { ...state, success: action.state };
    case supportState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};
