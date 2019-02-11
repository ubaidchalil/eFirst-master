import { LOGIN_URL, REGISTER_URL, RESET_PASSWORD } from "../../constants";

export const registrationState = {
  LOADING: "REGISTRATION_LOADING",
  ERROR: "REGISTRATION_ERROR"
};
export const loginState = {
  LOADING: "LOGIN_LOADING",
  ERROR: "LOGIN_ERROR"
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
  dispatch(setInStore(null, type.ERROR));
  try {
    const result = await fetchData();
    console.log(result);
    if (checkResult(result, dispatch, error => setInStore(error, type.ERROR))) {
      if (!result.data) {
        dispatch(setInStore(false, type.LOADING));
        dispatch(setInStore("Something wrong...", type.ERROR));
        dispatch(clearData());
      } else {
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

const openForgetFetcher = async (fetchData, type, dispatch) => {
  dispatch(setInStore(true, type.LOADING));
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
  console.log(body);
  return openFetcher(
    async () => {
      const result = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body
      });
      //console.log(result.json());
      return result.json().then(data => ({
        data: data,
        status: result.ok
      }));
      //return {data:result.json(),status:result.ok};
    },
    registrationState,
    dispatch
  );
};

export const resetPasswordUser = payload => dispatch => {
  const body = JSON.stringify(payload);
  return openForgetFetcher(
    async () => {
      const result = await fetch(RESET_PASSWORD, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body
      });
      //console.log(result.json());
      return result.json().then(data => ({
        data: data,
        status: result.ok
      }));
      //return {data:result.json(),status:result.ok};
    },
    forgetpasswordState,
    dispatch
  );
};
