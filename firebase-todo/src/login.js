import React, { useState } from "react";
import { auth, googleProvider } from "./firebase"; // adjust path if your firebase.js is elsewhere
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
      alert("Logged in successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setError("");
      alert("Logged in with Google!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      <button onClick={handleGoogleLogin} style={styles.googleButton}>
        Sign in with Google
      </button>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    borderRadius: "10px",
    textAlign: "center",
  },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
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
  error: { marginTop: "10px", color: "#ff6b6b" },
};

export default Login;
