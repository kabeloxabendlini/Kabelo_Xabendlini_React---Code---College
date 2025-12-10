import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders at least one Rating heading', () => {
  render(<App />);
  // Check that any heading containing the word "Rating" is in the document
  const ratingHeading = screen.getByText(/rating/i);
  expect(ratingHeading).toBeInTheDocument();
});

