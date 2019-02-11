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
  documentattestation
} from "../components/service/reducer";

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
    "services"
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
  services
};

export default persistCombineReducers(config, combinedReducers);
