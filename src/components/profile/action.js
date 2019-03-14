import {
  PROFILE_URL,
  USER_CONTDETL_CREATE_URL,
  USER_OFFADDRESS_CREATE_URL,
  USER_PERSDETL_CREATE_URL,
  USER_PROFILE_CREATE_URL
} from "../../constants";

export const profileState = {
  LOADING: "PROFILE_LOADING",
  SUCCESS: "PROFILE_SUCCESS",
  ERROR: "PROFILE_ERROR",
  DONE: "PROFILE_DONE"
};

export const userProfileState = {
  LOADING: "USRPFL_LOADING",
  SUCCESS: "USRPRFL_SUCCESS",
  ERROR: "USRPRFL_ERROR"
};
export const userContactDetailState = {
  LOADING: "USRCONTDETL_LOADING",
  SUCCESS: "USRCONTDETL_SUCCESS",
  ERROR: "USRCONTDETL_ERROR"
};
export const userPersonalDetailState = {
  LOADING: "USRPRDETL_LOADING",
  SUCCESS: "USRPRDETL_SUCCESS",
  ERROR: "USRPRDETL_ERROR"
};
export const userOfficeAddressState = {
  LOADING: "USROFCADD_LOADING",
  SUCCESS: "USROFCADD_SUCCESS",
  ERROR: "USROFCADD_ERROR"
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
const Fetcher = async (fetchData, type, dispatch) => {
  dispatch(setInStore(true, type.LOADING));
  dispatch(setInStore(null, type.ERROR));
  dispatch(setInStore(false, type.SUCCESS));
  try {
    const result = await fetchData();
    if (checkResult(result, dispatch, error => setInStore(error, type.ERROR))) {
      dispatch(setInStore(result.data, type.DONE));
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

export const userProfileCreate = payload => dispatch => {
  const { token, data } = payload;
  const body = data;
  return openFetcher(
    async () => {
      const result = await fetch(USER_PROFILE_CREATE_URL, {
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
    userProfileState,
    dispatch
  );
};

export const userPersonalDetailCreate = payload => dispatch => {
  const { token, ...bodyData } = payload;
  const body = JSON.stringify(bodyData);
  return openFetcher(
    async () => {
      const result = await fetch(USER_PERSDETL_CREATE_URL, {
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
    userPersonalDetailState,
    dispatch
  );
};

export const userConatctDetailCreate = payload => dispatch => {
  const { token, ...bodyData } = payload;
  const body = JSON.stringify(bodyData);
  return openFetcher(
    async () => {
      const result = await fetch(USER_CONTDETL_CREATE_URL, {
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
    userContactDetailState,
    dispatch
  );
};

export const userOfficeAddressCreate = payload => dispatch => {
  const { token, ...bodyData } = payload;
  const body = JSON.stringify(bodyData);
  return openFetcher(
    async () => {
      const result = await fetch(USER_OFFADDRESS_CREATE_URL, {
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
    userOfficeAddressState,
    dispatch
  );
};

export const profileData = token => dispatch => {
  return Fetcher(
    async () => {
      const result = await fetch(PROFILE_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return result.json().then(data => ({
        data: data,
        status: result.ok
      }));
    },
    profileState,
    dispatch
  );
};
