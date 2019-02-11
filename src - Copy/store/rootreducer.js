import storage from "redux-persist/es/storage";
import { persistCombineReducers } from "redux-persist";
import { login, token } from "../components/auth/reducer";

const config = {
    key: "primary",

    storage,
    // whitelist: []
    blacklist: [
        "login"
    ]
};

const combinedReducers = {
    login,
    token
};

export default persistCombineReducers(config, combinedReducers);
