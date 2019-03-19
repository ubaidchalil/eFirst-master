import {
  ATTESTATION_PRICE_URL,
  DOCUMENT_TYPE_URL,
  COUNTRIES_URL,
  DOC_ATTESTATION_CREATE_URL,
  SERVICES_DATA_URL,
  LANGTRANS_URL,
  CERTTYPE_URL,
  DOCLANG_URL,
  SERVICE_REQUEST_URL,
  TRANSLATION_PRICE_URL,
  MESSAGE_URL,
  SERVICEREQUEST_LIST_URL
} from "../../constants";
export const attestationState = {
  LOADING: "ATTEST_LOADING",
  SUCCESS: "ATTEST_SUCCESS",
  ERROR: "ATTEST_ERROR"
};

export const langTransState = {
  LOADING: "LANGTRANS_LOADING",
  SUCCESS: "LANGTRANS_SUCCESS",
  ERROR: "LANGTRANS_ERROR"
};

export const messageState = {
  LOADING: "MESSAGE_LOADING",
  SUCCESS: "MESSAGE_SUCCESS",
  ERROR: "MESSAGE_ERROR"
};

export const servicesState = {
  LOADING: "SERVICES_LOADING",
  SUCCESS: "SERVICES_SUCCESS",
  ERROR: "SERVICES_ERROR",
  DONE: "SERVICES_DONE"
};

export const serviceRequestState = {
  LOADING: "SERVICES_REQ_LOADING",
  SUCCESS: "SERVICES_REQ_SUCCESS",
  ERROR: "SERVICES_REQ_ERROR",
  DONE: "SERVICES_REQ_DONE"
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

export const documentLanguageState = {
  LOADING: "DOCLANG_LOADING",
  SUCCESS: "DOCLANG_SUCCESS",
  ERROR: "DOCLANG_ERROR",
  DONE: "DOCLANG_DONE"
};

export const certificateTypeState = {
  LOADING: "CERTTYPE_LOADING",
  SUCCESS: "CERTTYPE_SUCCESS",
  ERROR: "CERTTYPE_ERROR",
  DONE: "CERTTYPE_DONE"
};

export const attesstationRateState = {
  LOADING: "ATTRATE_LOADING",
  SUCCESS: "ATTRATE_SUCCESS",
  ERROR: "ATTRATE_ERROR",
  DONE: "ATTRATE_DONE"
};

export const translationRateState = {
  LOADING: "TRARATE_LOADING",
  SUCCESS: "TRARATE_SUCCESS",
  ERROR: "TRARATE_ERROR",
  DONE: "TRARATE_DONE"
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
export const sendOrReplyMessage = payload => dispatch => {
  const { token, ...bodyData } = payload;

  const body = JSON.stringify(bodyData);
  console.log(body);
  return openFetcher(
    async () => {
      const result = await fetch(MESSAGE_URL, {
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
    messageState,
    dispatch
  );
};

export const doclangTransCreate = payload => dispatch => {
  const { token, data } = payload;
  const body = data;
  return openFetcher(
    async () => {
      const result = await fetch(LANGTRANS_URL, {
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

    langTransState,
    dispatch
  );
};

export const getdoclanguage = token => dispatch => {
  return Fetcher(
    async () => {
      const result = await fetch(DOCLANG_URL, {
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
    documentLanguageState,
    dispatch
  );
};

export const getcertificateType = token => dispatch => {
  return Fetcher(
    async () => {
      const result = await fetch(CERTTYPE_URL, {
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
    certificateTypeState,
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

export const translationPrice = ({
  fromLanguage,
  toLanguage,
  token
}) => dispatch => {
  console.log(
    `${TRANSLATION_PRICE_URL}?fromLanguage=${fromLanguage}&toLanguage=${toLanguage}`
  );
  return Fetcher(
    async () => {
      const result = await fetch(
        `${TRANSLATION_PRICE_URL}?fromLanguage=${fromLanguage}&toLanguage=${toLanguage}`,
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
    translationRateState,
    dispatch
  );
};

export const servicesData = ({ statusId, token }) => dispatch => {
  const url = statusId
    ? `${SERVICES_DATA_URL}?statusId=${statusId}`
    : `${SERVICEREQUEST_LIST_URL}`;
  return Fetcher(
    async () => {
      const result = await fetch(url, {
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

export const serviceRequestData = ({ serviceId, token }) => dispatch => {
  return Fetcher(
    async () => {
      const result = await fetch(`${SERVICE_REQUEST_URL}?id=${serviceId}`, {
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
    serviceRequestState,
    dispatch
  );
};
