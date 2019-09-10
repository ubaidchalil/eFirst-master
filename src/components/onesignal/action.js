import {
  REGISTER_ONESIGNAL_URL,
  UNREGISTER_ONESIGNAL_URL
} from "../../constants";
import { dispatch } from "rxjs/internal/observable/range";

export const oneSignalState = {
  LOADING: "ONESIGNAL_LOADING",
  SUCCESS: "ONESIGNAL_SUCCESS",
  ERROR: "ONESIGNAL_ERROR",
  DONE: "ONESIGNAL_DONE"
};

export const oneSignalInfoState = {
  DONE: "ONESIGNAL_INFO_DONE"
};

export const setOneSignalDeviceInfo = info => dispatch => {
  dispatch({ type: oneSignalInfoState.DONE, data: info });
};

export const checkResult = (result, dispatch, setError) => {
  if (result.status) {
    return true;
  }
  dispatch(setError(JSON.stringify(result.data)));
  return false;
};

export const setInStore = (state, type) => ({
  type,
  state
});
const openFetcher = async (fetchData, type, dispatch) => {
  dispatch(setInStore(true, type.LOADING));
  dispatch(setInStore(null, type.ERROR));
  dispatch(setInStore(false, type.SUCCESS));
  try {
    const result = await fetchData();
    if (checkResult(result, dispatch, error => setInStore(error, type.ERROR))) {
      dispatch(setInStore(true, type.SUCCESS));
    } else {
      dispatch(setInStore(false, type.SUCCESS));
    }
  } catch (error) {
    dispatch(setInStore(false, type.SUCCESS));
    dispatch(setInStore(error, type.ERROR));
  }
  dispatch(setInStore(false, type.LOADING));
};
export const registerOnesignal = payload => dispatch => {
  const { token, data } = payload;
  console.log("DATA2---->", data);
  const body = JSON.stringify(data);
  console.log("body--->", body);
  return openFetcher(
    async () => {
      const result = await fetch(REGISTER_ONESIGNAL_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body
      });
      return result.json().then(data => ({
        data: data,
        status: result.ok
      }));
    },
    oneSignalState,
    dispatch
  );
};

export const unregisterOnesignal = payload => dispatch => {
  const { token, data } = payload;
  const body = data;
  return openFetcher(
    async () => {
      const result = await fetch(UNREGISTER_ONESIGNAL_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
        body
      });
      return result.json().then(data => ({
        data: data,
        status: result.ok
      }));
    },
    oneSignalState,
    dispatch
  );
};
