import { PAYMENT_URL } from "../../constants";

export const paymentDetailState = {
  LOADING: "PAYMENT_DETAIL_LOADING",
  SUCCESS: "PAYMENT_DETAIL_SUCCESS",
  ERROR: "PAYMENT_DETAIL_ERROR",
  DONE: "PAYMENT_DETAIL_DONE"
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

export const getPaymentDetail = payload => dispatch => {
  const { token, SrId, Amount, UserId } = payload;
  const body = JSON.stringify({ SrId, Amount, UserId, Action: "I" });
  console.log("body", body);
  console.log("token", token);

  return Fetcher(
    async () => {
      const result = await fetch(PAYMENT_URL, {
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

    paymentDetailState,
    dispatch
  );
};
