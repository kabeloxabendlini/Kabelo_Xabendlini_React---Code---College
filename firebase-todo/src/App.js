// FILE: src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Auth from "./components/Auth";
import TodoPage from "./components/TodoPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

export default function App() {
  const [user, setUser] = React.useState(null);

  // Listen for auth state changes
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return unsubscribe;
  }, []);

  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">Home</Link>
        {user ? (
          <div className="user-section">
            {user.photoURL && (
              <img
                src={user.photoURL}
                width="34"
                alt="Profile"
                style={{ borderRadius: "50%" }}
              />
            )}
            <span>{user.displayName || user.email}</span>
            <button onClick={() => signOut(auth)}>Logout</button>
          </div>
        ) : (
          <Link to="/auth">Login</Link>
        )}
      </nav>

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

        // onChange = {(e) => setEmail (e.target.value)}