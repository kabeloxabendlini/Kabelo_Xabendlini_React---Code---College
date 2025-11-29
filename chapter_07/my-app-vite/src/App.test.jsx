import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

it('renders without crashing', () => {
  // Create a temporary DOM element
  const div = document.createElement('div');

  // Create a React root
  const root = createRoot(div);

  // Render the App component into the root
  root.render(<App />);
});
