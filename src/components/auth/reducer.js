import {
  loginState,
  tokenState,
  registrationState,
  forgetpasswordState,
  confirmEmailState
} from "./action";

const defaulToken = null;

const defaultRegister = {
  error: null,
  loading: false,
  data: null,
  success: true
};
const defaultLogin = {
  error: null,
  loading: false
};
const defaultForgetPassword = {
  error: null,
  success: null,
  loading: false
};

const defaultConfirmEmail = {
  error: null,
  success: null,
  loading: false
};
export const token = (state = defaulToken, action) => {
  switch (action.type) {
    case tokenState.DONE:
      const tokenData = Array.isArray(action.data)
        ? action.data[0]
        : action.data;
      return {
        token: tokenData.access_token,
        username: tokenData.userName
      };
    case tokenState.CLEAR:
      return defaulToken;
    default:
      return state;
  }
};

export const registration = (state = defaultRegister, action) => {
  switch (action.type) {
    case registrationState.ERROR:
      return { ...state, error: action.state };
    case registrationState.LOADING:
      return { ...state, loading: action.state };
    case registrationState.DONE:
      return { ...state, data: action.state };
    default:
      return state;
  }
};

export const login = (state = defaultLogin, action) => {
  switch (action.type) {
    case loginState.ERROR:
      return { ...state, error: action.state };
    case loginState.LOADING:
      return { ...state, loading: action.state };
    default:
      return state;
  }
};

export const forgetpassword = (state = defaultForgetPassword, action) => {
  switch (action.type) {
    case forgetpasswordState.ERROR:
      return { ...state, error: action.state };
    case forgetpasswordState.LOADING:
      return { ...state, loading: action.state };
    case forgetpasswordState.SUCCESS:
      return { ...state, success: action.state };
    default:
      return state;
  }
};

export const confirmemail = (state = defaultConfirmEmail, action) => {
  switch (action.type) {
    case confirmEmailState.ERROR:
      return { ...state, error: action.state };
    case confirmEmailState.LOADING:
      return { ...state, loading: action.state };
    case confirmEmailState.SUCCESS:
      return { ...state, success: action.state };
    default:
      return state;
  }
};
