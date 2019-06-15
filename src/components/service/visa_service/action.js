import { SUPPORT_URL } from "../../../constants";

export const supportState = {
  LOADING: "SUPPORT_LOADING",
  SUCCESS: "SUPPORT_SUCCESS",
  ERROR: "SUPPORT_ERROR"
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

export const supportCreate = payload => dispatch => {
  const { token, supportCreate, ...bodyData } = payload;
  const body = JSON.stringify(bodyData);
  console.log(body);
  return openFetcher(
    async () => {
      const result = await fetch(SUPPORT_URL, {
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
    supportState,
    dispatch
  );
};
