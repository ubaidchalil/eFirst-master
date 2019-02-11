import {
  attestationState,
  countryState,
  documentTypeState,
  attesstationRateState,
  servicesState
} from "./action";
const initialDocumentAttestation = {
  loading: false,
  succuss: null,
  error: null
};

const initialCountry = {
  loading: false,
  data: [],
  succuss: null,
  error: null
};

const initialServices = {
  loading: false,
  data: [],
  succuss: null,
  error: null
};

const initialDocumentType = {
  loading: false,
  data: [],
  succuss: null,
  error: null
};

const initialAttestationRate = {
  loading: false,
  data: null,
  succuss: null,
  error: null
};

export const documentattestation = (
  state = initialDocumentAttestation,
  action
) => {
  switch (action.type) {
    case attestationState.LOADING:
      return { ...state, loading: action.state };
    case attestationState.SUCCESS:
      return { ...state, success: action.state };
    case attestationState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};

export const documenttypes = (state = initialDocumentType, action) => {
  switch (action.type) {
    case documentTypeState.LOADING:
      return { ...state, loading: action.state };
    case documentTypeState.DONE:
      return { ...state, data: action.state };
    case documentTypeState.SUCCESS:
      return { ...state, success: action.state };
    case documentTypeState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};

export const countries = (state = initialCountry, action) => {
  switch (action.type) {
    case countryState.LOADING:
      return { ...state, loading: action.state };
    case countryState.DONE:
      return { ...state, data: action.state };
    case countryState.SUCCESS:
      return { ...state, success: action.state };
    case countryState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};

export const services = (state = initialServices, action) => {
  switch (action.type) {
    case servicesState.LOADING:
      return { ...state, loading: action.state };
    case servicesState.DONE:
      return { ...state, data: action.state };
    case servicesState.SUCCESS:
      return { ...state, success: action.state };
    case servicesState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};

export const attestationrate = (state = initialAttestationRate, action) => {
  switch (action.type) {
    case attesstationRateState.LOADING:
      return { ...state, loading: action.state };
    case attesstationRateState.DONE:
      return { ...state, data: action.state };
    case attesstationRateState.SUCCESS:
      return { ...state, success: action.state };
    case attesstationRateState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};
