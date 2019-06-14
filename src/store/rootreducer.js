import storage from "redux-persist/es/storage";
import { persistCombineReducers } from "redux-persist";
import {
  login,
  token,
  logout,
  registration,
  forgetpassword,
  confirmemail,
  extUserInfo,
  extRegistration,
  extLoginUrls,
  forgetchangepassword
} from "../components/auth/reducer";

import {
  countries,
  attestationrate,
  documenttypes,
  services,
  documentattestation,
  langtranslation,
  documentlanguage,
  certificatetype,
  servicerequest,
  translationrate,
  message
} from "../components/service/reducer";

import { faq, faqcategory } from "../components/faq/reducer";

import { support } from "../components/support/reducer";

import {
  profile,
  usercontactdetail,
  userofficeadress,
  userpersonaldetail,
  userprofile,
  changepassword
} from "../components/profile/reducer";

import { dashboard } from "../components/dashboard/reducer";

const config = {
  key: "primary",

  storage,
  blacklist: [
    "login",
    "registration",
    "forgetpassword",
    "attestationrate",
    "countries",
    "documenttypes",
    "dashboard",
    "documentattestation",
    "services",
    "langtranslation",
    "documentlanguage",
    "certificatetype",
    "profile",
    "usercontactdetail",
    "userofficeadress",
    "userpersonaldetail",
    "userprofile",
    "support",
    "faq",
    "faqcategory",
    "servicerequest",
    "translationrate",
    "message",
    "confirmemail",
    "logout",
    "changepassword",
    "extUserInfo",
    "extRegistration",
    "extLoginUrls",
    "forgetchangepassword"
  ]
};

const combinedReducers = {
  login,
  token,
  registration,
  forgetpassword,
  countries,
  attestationrate,
  documenttypes,
  dashboard,
  documentattestation,
  services,
  langtranslation,
  documentlanguage,
  certificatetype,
  profile,
  usercontactdetail,
  userofficeadress,
  userpersonaldetail,
  userprofile,
  support,
  faq,
  faqcategory,
  servicerequest,
  translationrate,
  message,
  confirmemail,
  logout,
  changepassword,
  extUserInfo,
  extRegistration,
  extLoginUrls,
  forgetchangepassword
};

export default persistCombineReducers(config, combinedReducers);
