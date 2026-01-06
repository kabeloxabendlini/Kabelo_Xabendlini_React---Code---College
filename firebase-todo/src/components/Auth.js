// FILE: src/components/Auth.js
import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const commonEmails = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
  ];

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Show suggestions only if user typed @
    if (value.includes("@")) {
      const [user, domainPart] = value.split("@");
      const filtered = commonEmails
        .filter((d) => d.startsWith(domainPart))
        .map((d) => `${user}@${d}`);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (suggestion) => {
    setEmail(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="auth-container" style={{ position: "relative", maxWidth: "300px" }}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        autoComplete="off" // turn off browser default to use custom suggestions
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            position: "absolute",
            width: "100%",
            background: "white",
            zIndex: 10,
          }}
        >
          {suggestions.map((s, i) => (
            <li
              key={i}
              style={{ padding: "5px", cursor: "pointer" }}
              onClick={() => selectSuggestion(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        style={{ marginTop: "10px" }}
      />
      <button onClick={handleLogin} style={{ marginTop: "10px" }}>
        Login
      </button>
      <button onClick={handleGoogleLogin} style={{ marginTop: "10px" }}>
        Sign in with Google
      </button>
    </div>
  );
}
