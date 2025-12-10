// Import Bootstrap's default CSS (must be imported before your own CSS)
import 'bootstrap/dist/css/bootstrap.min.css';

// Import your custom global styles
import './index.css';

// Import React (needed for JSX)
import React from 'react';

// Import the React 18 DOM rendering API
import ReactDOM from 'react-dom/client';

// Import the main App component that will be rendered
import App from './App';

// Create the root element where the app will be mounted.
// React 18 uses createRoot instead of the old ReactDOM.render().
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside <React.StrictMode>.
// StrictMode helps identify potential problems during development.
// (It does not affect production builds.)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

