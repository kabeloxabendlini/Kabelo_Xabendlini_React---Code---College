// FILE: src/components/ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, loading = false, children }) {
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // If user is present, cancel any pending redirect immediately
    if (user) {
      setRedirecting(false);
      return;
    }

    // Only start redirect timer when auth has fully resolved and there's no user
    if (!loading && !user) {
      const t = setTimeout(() => setRedirecting(true), 800);
      return () => clearTimeout(t);
    }
  }, [user, loading]);

  // User is signed in — render the page
  if (user) return children;

  // Redirect timer elapsed — send to auth
  if (redirecting) return <Navigate to="/auth" replace />;

  // Auth still loading OR brief grace period after popup closes
  return (
    <>
      <style>{css}</style>
      <div className="pr-shell">
        <div className="pr-card">
          {!loading ? (
            <>
              <div className="pr-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="9" stroke="#e8ff47" strokeWidth="1.6"/>
                  <path d="M11 7v4.5M11 14.5v.5" stroke="#e8ff47" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="pr-title">Authentication required</p>
              <p className="pr-sub">Redirecting you to sign in…</p>
              <div className="pr-bar"><div className="pr-bar-fill" /></div>
            </>
          ) : (
            <>
              <div className="pr-spinner">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="13" stroke="#222228" strokeWidth="2.5"/>
                  <circle cx="16" cy="16" r="13" stroke="#e8ff47" strokeWidth="2.5"
                    strokeDasharray="50" strokeDashoffset="30" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="pr-title">Checking your session…</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&display=swap');

  .pr-shell {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0c0c0d;
    font-family: 'Sora', sans-serif;
  }

  .pr-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    animation: fadeIn 0.3s ease both;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .pr-icon-wrap {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: rgba(232,255,71,0.07);
    border: 1px solid rgba(232,255,71,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
  }

  .pr-spinner {
    animation: spin 1s linear infinite;
    margin-bottom: 4px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .pr-title {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: #d0d0d8;
    letter-spacing: -0.02em;
  }

  .pr-sub {
    margin: 0;
    font-size: 0.78rem;
    color: #555560;
  }

  .pr-bar {
    margin-top: 12px;
    width: 160px;
    height: 2px;
    background: #1e1e24;
    border-radius: 2px;
    overflow: hidden;
  }

  .pr-bar-fill {
    height: 100%;
    background: #e8ff47;
    border-radius: 2px;
    animation: progress 0.8s cubic-bezier(0.4,0,0.2,1) forwards;
  }

  @keyframes progress {
    from { width: 0%; }
    to   { width: 100%; }
  }
`;