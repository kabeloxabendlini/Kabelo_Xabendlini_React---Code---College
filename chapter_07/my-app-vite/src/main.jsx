import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Create a root to render your app
const root = createRoot(document.getElementById('root'));

// Render the App inside React's StrictMode
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
