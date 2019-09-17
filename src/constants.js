export const Color = {
  main: "#7c7c7c",
  secondary: "#b61e89"
};
export const validateFileTypeAndSize = ({ fileName, fileSize }) => {
  const filetypes = ["jpeg", "jpg", "png", "docx", "doc", "xls", "xlsx", "pdf"];
  const ext = fileName.split(".").pop();
  const validateType = filetypes.includes(ext);
  const validateSize = fileSize <= 5242880;

  const result = {
    validateType,
    validateSize
  };
  return result;
};

export const validateFileTypeAndSizeForTranslation = ({
  fileName,
  fileSize
}) => {
  const filetypes = ["jpeg", "jpg", "png"];
  const ext = fileName.split(".").pop();
  const validateType = filetypes.includes(ext);
  const validateSize = fileSize <= 5242880;

  const result = {
    validateType,
    validateSize
  };
  return result;
};
/// BASE URL ///
export const BASE_URL = "https://api.efirst.ae/";
export const PROFILE_BASE_URL =
  "https://efirstdatastorage.blob.core.windows.net/profilepic/";

/// AUTH URLS ///
export const LOGIN_URL = `${BASE_URL}Token`;
export const RESET_PASSWORD_URL = `${BASE_URL}Account/SendToken`;
export const REGISTER_URL = `${BASE_URL}Account/Register`;
export const CONFIRM_EMAIL_URL = `${BASE_URL}Account/ConfirmEmail`;
export const LOGOUT_URL = `${BASE_URL}Account/Logout`;
export const EXT_USER_INFO_URL = `${BASE_URL}Account/UserInfo`;
export const EXT_REGISTER_URL = `${BASE_URL}Account/RegisterExternal`;
export const EXT_LOGIN_URLS_URL = `${BASE_URL}Account/ExternalLogins`;
export const CHANGE_PASSWORD_URL = `${BASE_URL}Account/ForgotPassword`;

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
export const VISASERVICE_URL = `${BASE_URL}Service/CreateAmerService`;
export const UPD_SR_AMT = `${BASE_URL}ServiceRequest/UpdateSRAmount`;
export const ACTIVATE_SR = `${BASE_URL}ServiceRequest/ActivateServiceRequest`;
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

/// ONE SIGNAL URLS ///
export const REGISTER_ONESIGNAL_URL = `${BASE_URL}/OneSignal/RegisterOneSignalUser`;
export const UNREGISTER_ONESIGNAL_URL = `${BASE_URL}/OneSignal/UnregisterOneSignalUsers`;

/// FOLOOSI PAYMENT DETAILS ///
export const PAYMENT_URL = `${BASE_URL}/api/FoloosiPayment`;

export const PAYMENT_WEB_URL =
  "https://staging.efirst.ae/foloosipayment/index/";
