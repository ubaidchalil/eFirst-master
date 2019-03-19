export const Color = {
  main: "#7c7c7c",
  secondary: "#b61e89"
};

/// BASE URL ///
const BASE_URL = "https://api.efirst.ae/";

/// AUTH URLS ///
export const LOGIN_URL = `${BASE_URL}Token`;
export const RESET_PASSWORD_URL = `${BASE_URL}Account/ForgotPassword`;
export const REGISTER_URL = `${BASE_URL}Account/Register`;
export const CONFIRM_EMAIL_URL = `${BASE_URL}Account/ConfirmEmail`;
export const LOGOUT_URL = `${BASE_URL}Account/Logout`;

/// DASHBOARD URLS ///
export const DASHBOARD_DATA_URL = `${BASE_URL}Dashboard/Get`;

/// SERVICE URLS ///
export const COUNTRIES_URL = `${BASE_URL}Master/GetAllCountry`;
export const DOCUMENT_TYPE_URL = `${BASE_URL}Master/GetAllDocumentTypes`;
export const ATTESTATION_PRICE_URL = `${BASE_URL}Master/GetAttestationRate`;
export const TRANSLATION_PRICE_URL = `${BASE_URL}Master/GetTranslationRate`;
export const DOC_ATTESTATION_CREATE_URL = `${BASE_URL}Service/CreateDocumentAttestation`;
export const CERTTYPE_URL = `${BASE_URL}Master/GetAllCertificateTypes`;
export const DOCLANG_URL = `${BASE_URL}Master/GetAllDoucmentLanguages`;
export const LANGTRANS_URL = `${BASE_URL}Service/CreateLanguageTranslation`;
// export const LANGTRANS_URL =
//   `http://192.168.43.134:57154/api/test/CreateLanguageTranslation`;

/// PROFILE URLS ///
export const PROFILE_URL = `${BASE_URL}Profile/Get`;
export const USER_PROFILE_CREATE_URL = `${BASE_URL}Profile/SaveUserProfile`;
export const USER_PERSDETL_CREATE_URL = `${BASE_URL}Profile/SaveUserPersonalDetails`;
export const USER_CONTDETL_CREATE_URL = `${BASE_URL}Profile/SaveUserContactDetails`;
export const USER_OFFADDRESS_CREATE_URL = `${BASE_URL}Profile/SaveUserOfficeAddress`;

/// SERVICE REQUEST URLS ///
export const SERVICEREQUEST_LIST_URL = `${BASE_URL}ServiceRequest/GetServiceRequestForSRList?filterOption=0`;
export const SERVICES_DATA_URL = `${BASE_URL}ServiceRequest/GetSRByStatus`;

export const SERVICE_REQUEST_URL = `${BASE_URL}ServiceRequest/Get`;

/// FAQ URLS ///
export const FAQ_CAT_URL = `${BASE_URL}FAQ/GetFAQCategory`;
export const FAQ_URL = `${BASE_URL}FAQ/GetFAQ`;

/// SUPPORT URLS ///
export const SUPPORT_URL = `${BASE_URL}Support/Post`;

/// MESSAGE URLS ///
export const MESSAGE_URL = `${BASE_URL}Message/Post`;
