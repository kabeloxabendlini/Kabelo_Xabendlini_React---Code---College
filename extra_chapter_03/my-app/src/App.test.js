// Import React (needed for JSX in older React versions)
import React from 'react';

// Import ReactDOM to render components into the DOM for testing
import ReactDOM from 'react-dom';

// Import the component we want to test
import App from './App';

// This is a simple test that ensures the App component renders without throwing an error
it('renders without crashing', () => {
  // Create a fake DOM element to render the component into
  const div = document.createElement('div');

  // Render the App component into the div
  ReactDOM.render(<App />, div);
});
