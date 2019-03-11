import {
  LOGIN_URL,
  REGISTER_URL,
  RESET_PASSWORD,
  CONFIRM_EMAIL_URL
} from "../../constants";

export const registrationState = {
  LOADING: "REGISTRATION_LOADING",
  ERROR: "REGISTRATION_ERROR",
  DONE: "REGISTRATION_DONE",
  SUCCESS: "REGISTRATION_SUCCESS"
};

export const loginState = {
  LOADING: "LOGIN_LOADING",
  ERROR: "LOGIN_ERROR"
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

export const tokenState = {
  DONE: "USER_LOGGED",
  CLEAR: "USER_LOGGED_OUT"
};
export const checkResult = (result, dispatch, setError) => {
  console.log(result);
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
    console.log(result);
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

const openRegFetcher = async (fetchData, type, dispatch) => {
  dispatch(setInStore(true, type.LOADING));
  h;
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
  dispatch(setInStore(null, type.ERROR));
  try {
    const result = await fetchData();
    console.log(result);
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
      const result = await fetch(RESET_PASSWORD, {
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
