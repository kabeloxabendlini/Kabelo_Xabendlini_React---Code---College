import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import GitHub from './GitHub';
import GitHubUser from './GitHubUser';
import './App.css';
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


function App() {
  return (
    <BrowserRouter>
      <header className="App-header">
        <h1>React-Bootstrap:</h1>
        <h1>GitHub Explorer</h1>
        <nav>
          <div className= "nav-links">
          <div className= "nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/github" className="nav-link">GitHub</Link>
        </div>
        </div>
        </nav>
      </header>

      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/github" element={<GitHub />} />
          <Route path="/github/user/:login/:id" element={<GitHubUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

function Home() {
  return <h2>Welcome to the GitHub Explorer App!</h2>;
}

function NotFound() {
  return <h2>404 - Page Not Found</h2>;
}

export default App;
