// src/App.js
// FILE: src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Auth from "./components/Auth";
import TodoPage from "./components/TodoPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { auth } from "./firebase";
import { signOut } from "firebase/auth"; // ✅ Correct import

export default function App() {
  const [user, setUser] = React.useState(null);

  // Listen for auth state changes
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return unsubscribe;
  }, []);

  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav className="navbar" style={styles.navbar}>
        <Link to="/" style={styles.link}>Home</Link>
        {user ? (
          <div className="user-section" style={styles.userSection}>
            {user.photoURL && (
              <img
                src={user.photoURL}
                width="34"
                alt="Profile"
                style={{ borderRadius: "50%" }}
              />
            )}
            <span style={styles.userName}>{user.displayName || user.email}</span>
            <button style={styles.logoutButton} onClick={() => signOut(auth)}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/auth" style={styles.link}>Login</Link>
        )}
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <TodoPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

// Optional inline styling for navbar
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    backgroundColor: "#f3f4f6",
    borderBottom: "1px solid #e5e7eb",
  },
  link: {
    textDecoration: "none",
    color: "#6366f1",
    fontWeight: "600",
    fontSize: "1rem",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  userName: {
    fontWeight: "500",
  },
  logoutButton: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#ef4444",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },
};
