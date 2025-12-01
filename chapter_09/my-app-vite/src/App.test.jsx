import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'App.css';
import 'Github.css';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import 'react-bootstrap/dist/react-bootstrap.min.css';
import 'react-router-dom/Link.css';
import 'react-router-dom/BrowserRouter.css';
import 'react-router-dom/Routes.css';
import 'react-router-dom/Router.css';
import 'react-router-dom/Route.css';
import 'react-router-dom/NavLink.css';
import 'react-router-dom/Switch.css';
import 'react-router-dom/Link.css';
import 'react-router-dom/Outlet.css';
import 'react-router-dom/Redirect.css';
import 'react-roouter-dom/HashRouter.css';
import 'react-router-dom/MemoryRouter.css';
import 'react-router-dom/StaticRouter.css';
import 'react-router-dom/Prompt.css';
import 'react-router-dom/withRouter.css';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);

  // Render the app
  root.render(<App />);

  // Clean up after render
  root.unmount();
});

