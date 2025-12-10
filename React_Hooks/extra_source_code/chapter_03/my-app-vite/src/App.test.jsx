// Import React (required for JSX even if not directly used)
import React from 'react';

// Import testing utilities from React Testing Library
// - render: mounts the component into a virtual DOM for testing
// - screen: lets us query elements rendered on the screen
import { render, screen } from '@testing-library/react';

// Import the component we want to test
import App from './App';

// Define a test case named "renders without crashing"
test('renders without crashing', () => {

  // Render the App component in a virtual testing environment
  render(<App />);

  // OPTIONAL: Example check — make sure some expected text appears.
  // Adjust the text to match what your App actually displays.
  expect(screen.getByText(/my first react app/i)).toBeInTheDocument();
});
