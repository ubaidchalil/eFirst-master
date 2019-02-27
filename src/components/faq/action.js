import { DASHBOARD_DATA_URL } from "../../constants";

export const faqCategoryState = {
  LOADING: "FAQCAT_LOADING",
  SUCCESS: "FAQCAT_SUCCESS",
  ERROR: "FAQCAT_ERROR",
  DONE: "FAQCAT_DONE"
};

export const faqState = {
  LOADING: "FAQ_LOADING",
  SUCCESS: "FAQ_SUCCESS",
  ERROR: "FAQ_ERROR",
  DONE: "FAQ_DONE"
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

export const FAQCategoryData = token => dispatch => {
  return Fetcher(
    async () => {
      const result = await fetch(DASHBOARD_DATA_URL, {
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
    faqCategoryState,
    dispatch
  );
};

export const FAQData = ({ token, categoryId }) => dispatch => {
  return Fetcher(
    async () => {
      const result = await fetch(
        `${DASHBOARD_DATA_URL}?categoryID=${categoryId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      return result.json().then(data => ({
        data: data,
        status: result.ok
      }));
    },
    faqState,
    dispatch
  );
};
