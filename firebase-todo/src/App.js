// FILE: src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { auth } from "./firebase";
import { signOut } from "firebase/auth"; // Correct import from firebase/auth

import Auth from "./components/Auth";
import TodoPage from "./components/TodoPage";
import Projects from "./components/Projects";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import AddTodo from "./components/AddTodo";

import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <Router>
      <div style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        {user && <Link to="/profile" style={styles.link}>Profile</Link>}
        {user && <Link to="/projects" style={styles.link}>Projects</Link>}
        {user && <button onClick={handleSignOut} style={styles.logoutButton}>Sign Out</button>}
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <div style={{ padding: "20px" }}>
                <h1>Welcome, {user?.email}</h1>
                <AddTodo />
                <TodoPage />
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute user={user}>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

// ----------------------
// Simple styles
// ----------------------
const styles = {
  nav: {
    display: "flex",
    gap: "10px",
    padding: "10px",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  logoutButton: {
    marginLeft: "auto",
    backgroundColor: "#de5246",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default App;
