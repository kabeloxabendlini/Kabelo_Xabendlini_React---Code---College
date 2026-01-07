// FILE: src/components/Auth.js
import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const commonEmails = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) return setError("Please enter email and password");

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          setError("Invalid email address"); break;
        case "auth/user-not-found":
          setError("User not found"); break;
        case "auth/wrong-password":
          setError("Incorrect password"); break;
        case "auth/operation-not-allowed":
          setError("Email/password login is not enabled in Firebase"); break;
        default:
          setError(err.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      if (err.code === "auth/operation-not-allowed") {
        setError("Google login is not enabled in Firebase");
      } else if (err.code === "auth/unauthorized-domain") {
        setError("This domain is not authorized in Firebase Auth");
      } else {
        setError(err.message);
      }
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value.includes("@")) {
      const [user, domainPart] = value.split("@");
      const filtered = commonEmails
        .filter((d) => d.startsWith(domainPart))
        .map((d) => `${user}@${d}`);
      setSuggestions(filtered);
    } else setSuggestions([]);
  };

  const selectSuggestion = (s) => {
    setEmail(s);
    setSuggestions([]);
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          autoComplete="username"
          required
          style={styles.input}
        />
        {suggestions.length > 0 && (
          <ul style={styles.suggestions}>
            {suggestions.map((s, i) => (
              <li key={i} onClick={() => selectSuggestion(s)} style={styles.suggestionItem}>{s}</li>
            ))}
          </ul>
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <button onClick={handleGoogleLogin} style={styles.googleButton}>Sign in with Google</button>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

// Styles omitted for brevity (same as your previous Auth.js)
// ----------------------
// Styles
// ----------------------
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    borderRadius: "10px",
    textAlign: "center",
    position: "relative",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1em",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#646cff",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  googleButton: {
    marginTop: "10px",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#de5246",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    marginTop: "10px",
    color: "#ff6b6b",
    fontWeight: "600",
  },
  suggestions: {
    listStyle: "none",
    margin: 0,
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    position: "absolute",
    width: "100%",
    background: "white",
    color: "#000",
    zIndex: 10,
  },
  suggestionItem: {
    padding: "5px",
    cursor: "pointer",
  },
};
