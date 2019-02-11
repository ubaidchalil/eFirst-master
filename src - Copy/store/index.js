import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";
import rootReducer from "./rootreducer";

// const middleware = applyMiddleware(thunk);
let middleware = applyMiddleware(thunk);
if (__DEV__) {
  const logger = createLogger({
    level: "info",
    collapsed: true
  });
  middleware = applyMiddleware(thunk, logger);
}
export default () => {
  const store = createStore(rootReducer, middleware);
  const persistor = persistStore(store);
  return { store, persistor };
};
