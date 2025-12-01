import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import registerServiceWorker from registerServiceWorker;
import reportWebVitals from './reportWebVitals'
import './App.css';
import './Github.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-spinners/ClipLoader.css';
import 'react-bootstrap/Form.css';
import 'react-bootstrap/Button.css';
import 'react-router-dom/Link.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-spinners/ClipLoader.css';
import 'react-bootstrap/Form.css';
import 'react-bootstrap/Button.css';
import 'react-router-dom/Link.css';
import 'App.css';
import 'Github.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-spinners/ClipLoader.css';
import 'react-bootstrap/Form.css';
import 'react-bootstrap/Button.css';
import 'react-router-dom/Link.css';

registerServiceWorker();
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
