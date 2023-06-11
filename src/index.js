import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { weatherReducer } from "./Redux/Redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
const allReducers = combineReducers({ data: weatherReducer });
const store = createStore(allReducers);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
