import { FAQ_CAT_URL, FAQ_URL } from "../../constants";

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
  DONE: "FAQ_DONE",
  CLEAR: "FAQ_CLEAR"
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
export const clearFaq = () => dispatch => {
  dispatch(setInStore([], faqState.CLEAR));
};

const FetcherCategory = async (fetchData, type, dispatch, token) => {
  dispatch(setInStore(true, type.LOADING));
  dispatch(setInStore(null, type.ERROR));
  try {
    const result = await fetchData();
    if (checkResult(result, dispatch, error => setInStore(error, type.ERROR))) {
      GetFAQById(result.data, token, dispatch);
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
  return FetcherCategory(
    async () => {
      const result = await fetch(FAQ_CAT_URL, {
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
    dispatch,
    token
  );
};

const GetFAQById = (categorylist, token, dispatch) => {
  if (categorylist) {
    categorylist.forEach(elm => {
      dispatch(FAQData(token, elm));
    });
  }
};

export const FAQData = (token, elm) => dispatch => {
  return Fetcher(
    async () => {
      const result = await fetch(`${FAQ_URL}?categoryID=${elm.FAQCategoryID}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return result.json().then(data => ({
        data: { ...elm, faq: [...data] },
        status: result.ok
      }));
    },
    faqState,
    dispatch
  );
};
