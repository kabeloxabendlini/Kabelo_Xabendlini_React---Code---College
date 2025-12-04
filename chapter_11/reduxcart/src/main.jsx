import React from "react";
import { createRoot } from "react-dom/client";
import { createStore } from "redux";
import { Provider } from "react-redux";
import cartReducer from "./reducer";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.css';

const store = createStore(cartReducer);

const container = document.getElementById("container");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
