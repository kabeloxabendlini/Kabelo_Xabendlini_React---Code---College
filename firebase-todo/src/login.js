// FILE: src/components/Login.js
import React, { useState, useEffect, useRef } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null);
  const navigate = useNavigate();

  const commonEmails = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"];

  // Pick up Google redirect result when returning to the app
  useEffect(() => {
    setGoogleLoading(true);
    getRedirectResult(auth)
      .then((result) => {
        if (result) navigate("/");
      })
      .catch((err) => {
        if (err.code !== "auth/no-auth-event") setError(err.message);
      })
      .finally(() => setGoogleLoading(false));
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) return setError("Please enter your email and password.");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":         setError("That email address doesn't look right."); break;
        case "auth/user-not-found":        setError("No account found with this email."); break;
        case "auth/wrong-password":        setError("Incorrect password. Try again."); break;
        case "auth/operation-not-allowed": setError("Email/password login is not enabled."); break;
        default:                           setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      setGoogleLoading(false);
      setError(err.message);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value.includes("@")) {
      const [user, domainPart] = value.split("@");
      const filtered = commonEmails
        .filter((d) => d.startsWith(domainPart || ""))
        .map((d) => `${user}@${d}`);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (s) => {
    setEmail(s);
    setSuggestions([]);
  };

  return (
    <>
      <style>{css}</style>
      <div className="auth-shell">
        <div className="auth-card">

          <div className="auth-header">
            <div className="auth-logo">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="8" fill="#e8ff47"/>
                <path d="M8 14h12M14 8v12" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">Sign in to continue to your tasks</p>
          </div>

          <button
            className={`auth-google-btn ${googleLoading ? "loading" : ""}`}
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            type="button"
          >
            {googleLoading ? (
              <svg className="spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="10"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
            )}
            <span>{googleLoading ? "Connecting…" : "Continue with Google"}</span>
          </button>

          <div className="auth-divider"><span>or sign in with email</span></div>

          <form onSubmit={handleLogin} className="auth-form" noValidate>
            <div className="auth-field-group" ref={suggestionsRef}>
              <div className={`auth-field ${focusedField === "email" ? "focused" : ""}`}>
                <label className="auth-label">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="username"
                  className="auth-input"
                  placeholder="you@example.com"
                />
              </div>
              {suggestions.length > 0 && (
                <ul className="auth-suggestions">
                  {suggestions.map((s, i) => (
                    <li key={i} className="auth-suggestion" onMouseDown={() => selectSuggestion(s)}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                        <path d="M1 5l6 4 6-4" stroke="currentColor" strokeWidth="1.2"/>
                      </svg>
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={`auth-field ${focusedField === "password" ? "focused" : ""}`}>
              <label className="auth-label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                autoComplete="current-password"
                className="auth-input"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="auth-eye"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 2l12 12M6.5 6.6A2 2 0 0 0 9.4 9.5M4.2 4.3C2.8 5.2 1.7 6.5 1 8c1.3 2.8 4 4.5 7 4.5 1.2 0 2.4-.3 3.4-.9M6 3.6C6.6 3.4 7.3 3.3 8 3.3c3 0 5.7 1.7 7 4.5a9.3 9.3 0 0 1-2.2 2.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <ellipse cx="8" cy="8" rx="7" ry="4.5" stroke="currentColor" strokeWidth="1.3"/>
                    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/>
                  </svg>
                )}
              </button>
            </div>

            {error && (
              <div className="auth-error">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M7 4v3.5M7 9.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              className={`auth-submit-btn ${loading ? "loading" : ""}`}
              disabled={loading || googleLoading}
            >
              {loading ? (
                <>
                  <svg className="spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="24" strokeDashoffset="8"/>
                  </svg>
                  Signing in…
                </>
              ) : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');

  .auth-shell {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0c0c0d;
    padding: 24px;
    font-family: 'Sora', sans-serif;
  }

  .auth-card {
    width: 100%;
    max-width: 400px;
    background: #111113;
    border: 1px solid #222226;
    border-radius: 20px;
    padding: 36px 32px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.6);
    animation: slideUp 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .auth-header { text-align: center; margin-bottom: 28px; }
  .auth-logo { display: inline-flex; margin-bottom: 16px; }
  .auth-title { margin: 0 0 6px; font-size: 1.5rem; font-weight: 600; color: #f0f0f2; letter-spacing: -0.03em; }
  .auth-subtitle { margin: 0; font-size: 0.85rem; color: #666670; }

  .auth-google-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid #2a2a30;
    background: #18181c;
    color: #d0d0d8;
    font-family: 'Sora', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
    letter-spacing: -0.01em;
  }
  .auth-google-btn:hover:not(:disabled) { background: #1e1e24; border-color: #38383f; color: #f0f0f2; }
  .auth-google-btn.loading { opacity: 0.6; cursor: not-allowed; }

  .auth-divider {
    display: flex; align-items: center; gap: 12px; margin: 20px 0;
    color: #3a3a42; font-size: 0.78rem; font-weight: 500;
    text-transform: uppercase; letter-spacing: 0.08em;
  }
  .auth-divider::before, .auth-divider::after { content: ''; flex: 1; height: 1px; background: #222226; }

  .auth-form { display: flex; flex-direction: column; gap: 14px; }
  .auth-field-group { position: relative; }

  .auth-field {
    position: relative;
    border: 1px solid #222226;
    border-radius: 12px;
    background: #18181c;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .auth-field.focused { border-color: #e8ff47; box-shadow: 0 0 0 3px rgba(232,255,71,0.08); }

  .auth-label {
    display: block; padding: 10px 14px 0;
    font-size: 0.7rem; font-weight: 500; color: #555560;
    text-transform: uppercase; letter-spacing: 0.07em; transition: color 0.2s;
  }
  .auth-field.focused .auth-label { color: #e8ff47; }

  .auth-input {
    display: block; width: 100%; padding: 4px 14px 10px;
    border: none; background: transparent; outline: none;
    font-family: 'Sora', sans-serif; font-size: 0.92rem;
    color: #e8e8f0; box-sizing: border-box; letter-spacing: -0.01em;
  }
  .auth-input::placeholder { color: #35353d; }

  .auth-eye {
    position: absolute; right: 12px; bottom: 10px;
    border: none; background: none; color: #444450;
    cursor: pointer; padding: 2px; display: flex;
    align-items: center; transition: color 0.15s;
  }
  .auth-eye:hover { color: #888898; }

  .auth-suggestions {
    position: absolute; top: calc(100% + 6px); left: 0; right: 0;
    list-style: none; margin: 0; padding: 6px;
    background: #1c1c22; border: 1px solid #2a2a32;
    border-radius: 12px; box-shadow: 0 12px 32px rgba(0,0,0,0.5);
    z-index: 20; animation: dropIn 0.15s ease both;
  }
  @keyframes dropIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

  .auth-suggestion {
    display: flex; align-items: center; gap: 8px;
    padding: 9px 12px; border-radius: 8px;
    font-size: 0.85rem; font-family: 'DM Mono', monospace;
    color: #909098; cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .auth-suggestion:hover { background: #252530; color: #e8ff47; }

  .auth-error {
    display: flex; align-items: center; gap: 8px; padding: 11px 14px;
    background: rgba(255,80,80,0.08); border: 1px solid rgba(255,80,80,0.2);
    border-radius: 10px; font-size: 0.83rem; color: #ff7070;
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .auth-submit-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 13px; margin-top: 4px;
    border: none; border-radius: 12px;
    background: #e8ff47; color: #0a0a0a;
    font-family: 'Sora', sans-serif; font-size: 0.92rem;
    font-weight: 600; letter-spacing: -0.01em; cursor: pointer;
    transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(232,255,71,0.2);
  }
  .auth-submit-btn:hover:not(:disabled) { background: #f0ff6a; transform: translateY(-1px); box-shadow: 0 6px 24px rgba(232,255,71,0.3); }
  .auth-submit-btn:active:not(:disabled) { transform: translateY(0); }
  .auth-submit-btn.loading, .auth-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .spin { animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
`;