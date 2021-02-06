import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import "./scss/index.scss";
import App from "./App";
import { ConfigStore } from "./store/ConfigStore";
import reportWebVitals from "./reportWebVitals";

const store = ConfigStore();
const targetDom = document.getElementById("root");

render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  targetDom
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
