export const Color = {
  main: "#7c7c7c",
  secondary: "#b61e89"
};

/// AUTH URLS ///

export const LOGIN_URL = "https://api.efirst.ae/Token";
export const RESET_PASSWORD_URL =
  "https://api.efirst.ae/Account/ForgotPassword";
export const REGISTER_URL = "https://api.efirst.ae/Account/Register";

/// DASHBOARD URLS ///

export const DASHBOARD_DATA_URL = "https://api.efirst.ae/Dashboard/Get";

/// SERVICE URLS ///

export const COUNTRIES_URL = "https://api.efirst.ae/Master/GetAllCountry";
export const DOCUMENT_TYPE_URL =
  "https://api.efirst.ae/Master/GetAllDocumentTypes";
export const ATTESTATION_PRICE_URL =
  "https://api.efirst.ae/Master/GetAttestationRate";
export const TRANSLATION_PRICE_URL =
  "https://api.efirst.ae/Master/GetTranslationRate";
export const DOC_ATTESTATION_CREATE_URL =
  "https://api.efirst.ae/Service/CreateDocumentAttestation";
export const CERTTYPE_URL =
  "https://api.efirst.ae/Master/GetAllCertificateTypes";
export const DOCLANG_URL =
  "https://api.efirst.ae/Master/GetAllDoucmentLanguages";
export const LANGTRANS_URL =
  "https://api.efirst.ae/Service/CreateLanguageTranslation";

/// PROFILE URLS ///

export const PROFILE_URL = "https://api.efirst.ae/Profile/Get";
export const USER_PROFILE_CREATE_URL =
  "https://api.efirst.ae/Profile/SaveUserProfile";
export const USER_PERSDETL_CREATE_URL =
  "https://api.efirst.ae/Profile/SaveUserPersonalDetails";
export const USER_CONTDETL_CREATE_URL =
  "https://api.efirst.ae/Profile/SaveUserContactDetails";
export const USER_OFFADDRESS_CREATE_URL =
  "https://api.efirst.ae/Profile/SaveUserOfficeAddress";

/// SERVICE REQUEST URLS ///

export const SERVICES_DATA_URL =
  "https://api.efirst.ae/ServiceRequest/GetSRByStatus";
export const SERVICE_REQUEST_URL = "https://api.efirst.ae/ServiceRequest/Get";

/// FAQ URLS ///

export const FAQ_CAT_URL = "https://api.efirst.ae/FAQ/GetFAQCategory";
export const FAQ = "https://api.efirst.ae/FAQ/GetFAQ";

/// SUPPORT URLS ///

export const SUPPORT_URL = "https://api.efirst.ae/Support/Post";
