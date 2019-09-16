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
  message,
  visaservice,
  docSRAmUpdation,
  srActivation
} from "../components/service/reducer";
import { statusBar } from "../components/splashscreen/reducer";
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

import { onesignal, onesignalInfo } from "../components/onesignal/reducer";
import { paymentdetail } from "../components/foloosi/reducer";
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
    "forgetchangepassword",
    "visaservice",
    "docSRAmUpdation",
    "srActivation",
    "statusBar",
    "onesignal",
    "onesignalInfo",
    "paymentdetail"
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
  forgetchangepassword,
  visaservice,
  docSRAmUpdation,
  srActivation,
  statusBar,
  onesignal,
  onesignalInfo,
  paymentdetail
};

export default persistCombineReducers(config, combinedReducers);
