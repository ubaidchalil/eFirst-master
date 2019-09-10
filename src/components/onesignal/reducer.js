import { oneSignalState, oneSignalInfoState } from "./action";

const initialOneSignal = {
  loading: false,
  data: null,
  success: null,
  error: null
};
export const onesignal = (state = initialOneSignal, action) => {
  switch (action.type) {
    case oneSignalState.LOADING:
      return { ...state, loading: action.state };
    case oneSignalState.DONE:
      return { ...state, data: action.data };
    case oneSignalState.SUCCESS:
      return { ...state, success: action.state };
    case oneSignalState.ERROR:
      return { ...state, error: action.state };
    default:
      return state;
  }
};

const initialOneSignalInfo = {
  data: null
};

export const onesignalInfo = (state = initialOneSignalInfo, action) => {
  switch (action.type) {
    case oneSignalInfoState.DONE:
      return { ...state, data: action.data };
    default:
      return state;
  }
};
