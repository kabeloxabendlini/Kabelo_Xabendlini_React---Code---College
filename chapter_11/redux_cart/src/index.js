import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import cartReducer from './reducer';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(cartReducer);

const container = document.getElementById('container');
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

