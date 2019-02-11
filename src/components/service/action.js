import {
  ATTESTATION_PRICE_URL,
  DOCUMENT_TYPE_URL,
  COUNTRIES_URL,
  DOC_ATTESTATION_CREATE_URL,
  SERVICES_DATA_URL
} from "../../constants";

export const attestationState = {
  LOADING: "ATTEST_LOADING",
  SUCCESS: "ATTEST_SUCCESS",
  ERROR: "ATTEST_ERROR"
};

export const servicesState = {
  LOADING: "SERVICES_LOADING",
  SUCCESS: "SERVICES_SUCCESS",
  ERROR: "SERVICES_ERROR",
  DONE: "SERVICES_DONE"
};
export const countryState = {
  LOADING: "COUNTRY_LOADING",
  SUCCESS: "COUNTRY_SUCCESS",
  ERROR: "COUNTRY_ERROR",
  DONE: "COUNTRY_DONE"
};
export const documentTypeState = {
  LOADING: "DOCTYPE_LOADING",
  SUCCESS: "DOCTYPE_SUCCESS",
  ERROR: "DOCTYPE_ERROR",
  DONE: "DOCTYPE_DONE"
};
export const attesstationRateState = {
  LOADING: "ATTRATE_LOADING",
  SUCCESS: "ATTRATE_SUCCESS",
  ERROR: "ATTRATE_ERROR",
  DONE: "ATTRATE_DONE"
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

export const docAttestationCreate = payload => dispatch => {
  const { token, ...bodyData } = payload;
  const body = JSON.stringify(bodyData);
  console.log("Body", body);
  return openFetcher(
    async () => {
      const result = await fetch(DOC_ATTESTATION_CREATE_URL, {
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
    attestationState,
    dispatch
  );
};

export const countries = token => dispatch => {
  return Fetcher(
    async () => {
      const result = await fetch(COUNTRIES_URL, {
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
    countryState,
    dispatch
  );
};

export const documentationTypes = token => dispatch => {
  return Fetcher(
    async () => {
      const result = await fetch(DOCUMENT_TYPE_URL, {
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
    documentTypeState,
    dispatch
  );
};
export const attestationPrice = ({
  CountryId,
  CertificateType,
  token
}) => dispatch => {
  console.log(
    `${ATTESTATION_PRICE_URL}?countryId=${CountryId}&documentTypeId=${CertificateType}`
  );
  return Fetcher(
    async () => {
      const result = await fetch(
        `${ATTESTATION_PRICE_URL}?countryId=${CountryId}&documentTypeId=${CertificateType}`,
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
    attesstationRateState,
    dispatch
  );
};

export const servicesData = ({ statusId, token }) => dispatch => {
  return Fetcher(
    async () => {
      const result = await fetch(`${SERVICES_DATA_URL}?statusId=${statusId}`, {
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
    servicesState,
    dispatch
  );
};
