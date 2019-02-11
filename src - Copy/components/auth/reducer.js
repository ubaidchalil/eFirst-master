import { loginState , tokenState} from "./action";

const defaulTokenState = null;

// const defaultRegisterState = {
//   error: null,
//   loading: false
// };
const defaultLoginState = {
  error: null,
  loading: false
};

export const token = (state = defaulTokenState, action) => {
  switch (action.type) {
    case tokenState.DONE:
      const tokenData = Array.isArray(action.data) ? action.data[0] : action.data;
      return {
        token: tokenData.access_token,
        username: tokenData.userName,
      };
    case tokenState.CLEAR:
      return defaulTokenState;
    default:
      return state;
  }
};

export const registration = (state = defaultRegisterState, action) => {
  switch (action.type) {
    case registrationState.ERROR:
      return { ...state, error: action.state };
    case registrationState.LOADING:
      return { ...state, loading: action.state };
    default:
      return state;
  }
};

export const login = (state = defaultLoginState, action) => {
  switch (action.type) {
    case loginState.ERROR:
      return { ...state, error: action.state };
    case loginState.LOADING:
      return { ...state, loading: action.state };
    default:
      return state;
  }
};