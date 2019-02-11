
import { LOGIN_URL} from "../../constants";

export const loginState = {
  LOADING: "LOGIN_LOADING",
  ERROR: "LOGIN_ERROR"
};
export const tokenState = {
  DONE: "USER_LOGGED",

  CLEAR: "USER_LOGGED_OUT"
};
export const checkResult = (result, dispatch, setError) => {
    if (!result.errors && !result.error) {
      return true;
    }
    dispatch(setError(JSON.stringify(result)));
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
  dispatch(setInStore(null, type.ERROR));
  dispatch(setInStore(true, type.LOADING));
  try {
    const result = await fetchData();
    if (checkResult(result, dispatch, error => setInStore(error, type.ERROR))) {
      if (!result) {
        dispatch(setInStore(false, type.LOADING));
        dispatch(
          setInStore("Wrong Email or Password, Please Try Again.", type.ERROR)
        );
        dispatch(clearData());
      } else {
        dispatch(setDone(result));
        dispatch(setInStore(false, type.LOADING));
        
      }
    }
    else{
      dispatch(setInStore(false, type.LOADING));
      dispatch(clearData());
    }
  } catch (error) {
    dispatch(setInStore(false, type.LOADING));
    dispatch(setInStore(error, type.ERROR));
    dispatch(clearData());
  }
};

export const loginUser = (formBody) => dispatch =>
{
  console.log(LOGIN_URL);
 return openFetcher(
    async () => {
        const result = await fetch(LOGIN_URL, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                      },
                    body: formBody
                  });
      return result.json();
    },
    loginState,
    dispatch
  );
  }

export const registerUser = data => dispatch =>
  openFetcher(
    async () => {
      const result = await fetch(REGISTER_URL, {
        method: "POST",
        body: jsonToXML(data)
      });
      return result.json();
    },
    registrationState,
    dispatch
  );