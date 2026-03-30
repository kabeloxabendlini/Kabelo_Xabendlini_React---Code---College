// FILE: src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

import Auth from "./components/Auth";
import TodoPage from "./components/TodoPage";
import Projects from "./components/Projects";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

import { useAuthState } from "react-firebase-hooks/auth";

function NavBar({ user, onSignOut }) {
  const location = useLocation();
  const onAuthPage = location.pathname === "/auth";

  return (
    <>
      <style>{navCss}</style>
      <nav className="app-nav">
        <div className="app-nav-left">
          <Link to={user ? "/" : "/auth"} className="app-nav-logo">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect width="22" height="22" rx="6" fill="#e8ff47"/>
              <path d="M6 11h10M11 6v10" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>TodoApp</span>
          </Link>

          {/* Only show nav links when signed in */}
          {user && (
            <div className="app-nav-links">
              <Link to="/" className={`app-nav-link ${location.pathname === "/" ? "active" : ""}`}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 6l6-5 6 5v7H9V9H5v4H1V6z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                </svg>
                Home
              </Link>
              <Link to="/projects" className={`app-nav-link ${location.pathname === "/projects" ? "active" : ""}`}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                  <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                  <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                  <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" strokeDasharray="2 1.2"/>
                </svg>
                Projects
              </Link>
              <Link to="/profile" className={`app-nav-link ${location.pathname === "/profile" ? "active" : ""}`}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="5" r="3" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M1 13c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                Profile
              </Link>
            </div>
          )}
        </div>

        {/* Right side: sign in button when logged out, sign out when logged in */}
        {user ? (
          <button className="app-nav-signout" onClick={onSignOut}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2M9 10l3-3-3-3M12 7H5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Sign out
          </button>
        ) : (
          !onAuthPage && (
            <Link to="/auth" className="app-nav-signin">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9M5 10l3-3-3-3M8 7H1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sign in
            </Link>
          )
        )}
      </nav>
    </>
  );
}

function App() {
  const [user, loading] = useAuthState(auth);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <Router>
      <NavBar user={user} onSignOut={handleSignOut} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <TodoPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* Redirect to home if already signed in */}
        <Route
          path="/auth"
          element={user ? <Navigate to="/" replace /> : <Auth />}
        />
      </Routes>
    </Router>
  );
}

const navCss = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&display=swap');

  .app-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 52px;
    background: #0e0e10;
    border-bottom: 1px solid #1e1e22;
    font-family: 'Sora', sans-serif;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .app-nav-left {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .app-nav-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    font-size: 0.92rem;
    font-weight: 600;
    color: #f0f0f2;
    letter-spacing: -0.02em;
  }

  .app-nav-links {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .app-nav-link {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 8px;
    text-decoration: none;
    font-size: 0.82rem;
    font-weight: 500;
    color: #555560;
    transition: color 0.15s, background 0.15s;
    letter-spacing: -0.01em;
  }

  .app-nav-link:hover { color: #909098; background: #18181c; }

  .app-nav-link.active {
    color: #e8ff47;
    background: rgba(232,255,71,0.07);
  }

  .app-nav-signout {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border: 1px solid #2a2a30;
    border-radius: 8px;
    background: transparent;
    color: #555560;
    font-family: 'Sora', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
  }

  .app-nav-signout:hover {
    border-color: rgba(255,90,90,0.3);
    color: #ff7070;
    background: rgba(255,90,90,0.06);
  }

  .app-nav-signin {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border: 1px solid #2a2a30;
    border-radius: 8px;
    background: transparent;
    color: #555560;
    font-family: 'Sora', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    text-decoration: none;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
  }

  .app-nav-signin:hover {
    border-color: rgba(232,255,71,0.3);
    color: #e8ff47;
    background: rgba(232,255,71,0.06);
  }
`;

export default App;