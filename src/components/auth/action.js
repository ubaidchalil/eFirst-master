import {
  LOGIN_URL,
  REGISTER_URL,
  RESET_PASSWORD_URL,
  CONFIRM_EMAIL_URL,
  LOGOUT_URL,
  EXT_USER_INFO_URL,
  EXT_REGISTER_URL,
  EXT_LOGIN_URLS_URL,
  BASE_URL,
  CHANGE_PASSWORD_URL
} from "../../constants";

export const registrationState = {
  LOADING: "REGISTRATION_LOADING",
  ERROR: "REGISTRATION_ERROR",
  DONE: "REGISTRATION_DONE",
  SUCCESS: "REGISTRATION_SUCCESS"
};

export const extUrlState = {
  LOADING: "EXT_LOGIN_URL_LOADING",
  ERROR: "EXT_LOGIN_URL_ERROR",
  DONE: "EXT_LOGIN_URL_DONE",
  SUCCESS: "EXT_LOGIN_URL_SUCCESS"
};

export const ExtRegistrationState = {
  LOADING: "EXT_REGISTRATION_LOADING",
  ERROR: "EXT_REGISTRATION_ERROR",
  DONE: "EXT_REGISTRATION_DONE",
  SUCCESS: "EXT_REGISTRATION_SUCCESS"
};

export const loginState = {
  LOADING: "LOGIN_LOADING",
  ERROR: "LOGIN_ERROR"
};

export const logoutState = {
  LOADING: "LOGOUT_LOADING",
  ERROR: "LOGOUT_ERROR",
  SUCCESS: "LOGOUT_SUCCESS",
  CLEAR: "LOGOUT_CLEAR_STATE"
};

export const confirmEmailState = {
  LOADING: "CONFIRM_EMAIL_LOADING",
  ERROR: "CONFIRM_EMAIL_ERROR",
  SUCCESS: "CONFIRM_EMAIL_SUCCESS"
};

export const forgetpasswordState = {
  LOADING: "FORGET_LOADING",
  SUCCESS: "FORGET_SUCCESS",
  ERROR: "FORGET_ERROR"
};

export const forgetchangepasswordState = {
  LOADING: "CHANGE_PASSWORD_LOADING",
  SUCCESS: "CHANGE_PASSWORD_SUCCESS",
  ERROR: "CHANGE_PASSWORD_ERROR"
};

export const tokenState = {
  DONE: "USER_LOGGED",
  EXT_DONE: "USER_EXT_DONE",
  CLEAR: "USER_LOGGED_OUT"
};

export const getUserInfoTokenState = {
  LOADING: "EXT_USER_INFO_LOADING",
  ERROR: "EXT_USER_INFO_ERROR",
  DONE: "EXT_USER_INFO_DONE",
  SUCCESS: "EXT_USER_INFO_SUCCESS"
};

export const checkResult = (result, dispatch, setError) => {
  if (result.status) {
    return true;
  }
  dispatch(setError(JSON.stringify(result.data)));
  return false;
};

const setDone = data => ({
  type: tokenState.DONE,
  data
});
export const setExtToken = data => ({
  type: tokenState.EXT_DONE,
  data
});
export const setInStore = (state, type) => ({
  type,
  state
});
export const clearData = () => ({
  type: tokenState.CLEAR
});

export const openFetcher = async (fetchData, type, dispatch) => {
  //dispatch(clearData());
  dispatch(setInStore(true, type.LOADING));
  dispatch(setInStore(null, type.ERROR));
  try {
    const result = await fetchData();

    if (checkResult(result, dispatch, error => setInStore(error, type.ERROR))) {
      if (!result.data) {
        dispatch(setInStore(false, type.LOADING));
        dispatch(
          setInStore("Wrong Email or Password, Please Try Again.", type.ERROR)
        );
        dispatch(clearData());
      } else {
        dispatch(setDone(result.data));
        dispatch(setInStore(false, type.LOADING));
      }
    } else {
      dispatch(clearData());
      dispatch(setInStore(false, type.LOADING));
    }
  } catch (error) {
    dispatch(clearData());
    dispatch(setInStore(false, type.LOADING));
    dispatch(setInStore(error, type.ERROR));
  }
};

export const LogoutFetcher = async (fetchData, type, dispatch) => {
  dispatch(setInStore(false, type.SUCCESS));
  dispatch(setInStore(true, type.LOADING));
  dispatch(setInStore(null, type.ERROR));
  try {
    const result = await fetchData();
    if (checkResult(result, dispatch, error => setInStore(error, type.ERROR))) {
      dispatch(clearData());
      dispatch(setInStore(true, type.SUCCESS));
      dispatch(setInStore(false, type.LOADING));
    } else {
      dispatch(setInStore(false, type.LOADING));
    }
  } catch (error) {
    dispatch(clearData());
    dispatch(setInStore(false, type.LOADING));
    dispatch(setInStore(error, type.ERROR));
  }
};

const openRegFetcher = async (fetchData, type, dispatch) => {
  dispatch(setInStore(true, type.LOADING));
  dispatch(setInStore(false, type.SUCCESS));
  dispatch(setInStore(null, type.ERROR));
  try {
    const result = await fetchData();
    console.log(result);
    if (checkResult(result, dispatch, error => setInStore(error, type.ERROR))) {
      if (!result.data) {
        dispatch(setInStore(false, type.LOADING));
        dispatch(setInStore("Something wrong...", type.ERROR));
      } else {
        dispatch(setInStore(result.data, type.DONE));
        dispatch(setInStore(true, type.SUCCESS));
        dispatch(setInStore(false, type.LOADING));
      }
    } else {
      dispatch(clearData());
      dispatch(setInStore(false, type.LOADING));
    }
  } catch (error) {
    dispatch(clearData());
    dispatch(setInStore(false, type.LOADING));
    dispatch(setInStore(error, type.ERROR));
  }
};

const openFetcher2 = async (fetchData, type, dispatch) => {
  dispatch(setInStore(true, type.LOADING));
  dispatch(setInStore(false, type.SUCCESS));
  dispatch(setInStore(null, type.ERROR));
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

export const loginUser = formBody => dispatch => {
  console.log(LOGIN_URL);
  return openFetcher(
    async () => {
      const result = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formBody
      });
      return result.json().then(data => ({
        data: data,
        status: result.ok
      }));
    },
    loginState,
    dispatch
  );
};

export const registerUser = payload => dispatch => {
  const body = JSON.stringify(payload);
  return openRegFetcher(
    async () => {
      const result = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body
      });
      return result.json().then(data => ({
        data: data,
        status: result.ok
      }));
    },
    registrationState,
    dispatch
  );
};

export const extRegisterUser = payload => dispatch => {
  const token = payload.token;
  console.log("////////////////////token : " + token);
  const body = JSON.stringify(payload);
  return openRegFetcher(
    async () => {
      const result = await fetch(EXT_REGISTER_URL, {
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
    ExtRegistrationState,
    dispatch
  );
};

export const confirmEmail = payload => dispatch => {
  const { code, userid } = payload;
  const url = `${CONFIRM_EMAIL_URL}?userId=${userid}&code=${code}`;
  console.log(url);
  return openFetcher2(
    async () => {
      const result = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      return result.json().then(data => ({
        data: data,
        status: result.ok
      }));
    },
    confirmEmailState,
    dispatch
  );
};

export const resetPasswordUser = payload => dispatch => {
  const body = JSON.stringify(payload);
  return openFetcher2(
    async () => {
      const result = await fetch(RESET_PASSWORD_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body
      });

      return result.json().then(data => ({
        data: data,
        status: result.ok
      }));
    },
    forgetpasswordState,
    dispatch
  );
};

export const forgetChangePassword = payload => dispatch => {
  const body = JSON.stringify(payload);
  console.log("body", body);
  return openFetcher2(
    async () => {
      const result = await fetch(CHANGE_PASSWORD_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body
      });

      return result.json().then(data => ({
        data: data,
        status: result.ok
      }));
    },
    forgetchangepasswordState,
    dispatch
  );
};

export const Logout = token => dispatch => {
  return LogoutFetcher(
    async () => {
      const result = await fetch(LOGOUT_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      return result.ok
        ? {
            status: result.ok
          }
        : result.json().then(data => ({
            data: data,
            status: result.ok
          }));
    },
    logoutState,
    dispatch
  );
};

export const clearLogoutState = () => dispatch => {
  dispatch(setInStore(true, logoutState.CLEAR));
};

const getUserInfoFetcher = async (fetchData, type, dispatch) => {
  dispatch(setInStore(true, type.LOADING));
  dispatch(setInStore(false, type.SUCCESS));
  dispatch(setInStore(null, type.ERROR));
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

export const getUserInfo = token => dispatch => {
  console.log(`Token = > ${token}`);
  return getUserInfoFetcher(
    async () => {
      const result = await fetch(EXT_USER_INFO_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Result", result);
      return result.json().then(data => ({
        data: data,
        status: result.ok
      }));
    },
    getUserInfoTokenState,
    dispatch
  );
};

export const getExtLoginUrls = token => dispatch => {
  return getUserInfoFetcher(
    async () => {
      const result = await fetch(
        EXT_LOGIN_URLS_URL + "?returnUrl=" + BASE_URL,
        {
          method: "GET",
          headers: {
            Accept: "application/json"
          }
        }
      );
      return result.json().then(data => ({
        data: data,
        status: result.ok
      }));
    },
    extUrlState,
    dispatch
  );
};
