import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'App.css'
import 'Github.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-spinners/ClipLoader.css';
import 'react-bootstrap/Form.css';
import 'react-bootstrap/Button.css';
import 'react-router-dom/Link.css';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);

  // Render the app
  root.render(<App />);

  // Clean up after render
  root.unmount();
});