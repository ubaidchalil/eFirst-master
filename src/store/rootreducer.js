import storage from "redux-persist/es/storage";
import { persistCombineReducers } from "redux-persist";
import {
  login,
  token,
  registration,
  forgetpassword
} from "../components/auth/reducer";

import {
  countries,
  attestationrate,
  documenttypes,
  services,
  documentattestation,
  langtranslation,
  documentlanguage,
  translatelanguage,
  certificatetype
} from "../components/service/reducer";

import { faq, faqcategory } from "../components/faq/reducer";

import { support } from "../components/support/reducer";

import {
  profile,
  usercontactdetail,
  userofficeadress,
  userpersonaldetail,
  userprofile
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
    "faqcategory"
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
  faqcategory
};

export default persistCombineReducers(config, combinedReducers);
