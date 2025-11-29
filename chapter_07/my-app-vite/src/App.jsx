import React from 'react';
import GitHub from './GitHub';

export default function App() {
  return (
    <div className="container mt-5">
      {/* App Header */}
      <header className="text-center mb-4">
        <h1 className="display-4">GitHub Repository Finder</h1>
        <p className="lead text-muted">Search for a GitHub user and see their repositories</p>
      </header>

      {/* GitHub Component */}
      <GitHub />

      {/* Footer */}
      <footer className="text-center mt-5 mb-3 text-muted">
        &copy; {new Date().getFullYear()} GitHub Finder App
      </footer>
    </div>
  );
}

