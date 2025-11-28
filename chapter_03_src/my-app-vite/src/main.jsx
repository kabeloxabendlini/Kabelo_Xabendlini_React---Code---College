// Import React (needed for JSX and component structure)
import React from 'react';

// Import the new ReactDOM client API (React 18+) for rendering the app
import ReactDOM from 'react-dom/client';

// Import the main App component that will be rendered on the page
import App from './App';

// Import global CSS styles for the entire application
import './index.css';

// Create a root using the React 18 createRoot API.
// This attaches React to the DOM element with id="root".
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside React.StrictMode.
// StrictMode helps highlight potential problems in development.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

