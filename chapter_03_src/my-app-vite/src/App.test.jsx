import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
  
  // optional: check for some text in App
  expect(screen.getByText(/my first react app/i)).toBeInTheDocument();
});
