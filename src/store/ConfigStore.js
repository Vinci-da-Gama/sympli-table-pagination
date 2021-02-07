import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import RootReducer from "../reduxers";

export const ConfigStore = () =>
  createStore(
    RootReducer,
    process.env.REACT_APP_NODE_ENV === "production"
      ? applyMiddleware(thunk)
      : composeWithDevTools(applyMiddleware(thunk))
  );
