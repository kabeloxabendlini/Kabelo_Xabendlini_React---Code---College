import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import GitHub from './GitHub';
import GitHubUser from './GitHubUser';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <header className="App-header">
        <h1>GitHub Explorer</h1>
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/github" className="nav-link">GitHub</Link>
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
