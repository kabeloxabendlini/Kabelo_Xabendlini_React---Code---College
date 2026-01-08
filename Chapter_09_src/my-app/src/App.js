// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import User from "./User";
import UserForm from "./UserForm";
import Login from "./Login";
import Signup from "./Signup";
import { auth } from "./firebaseConfig";

function PrivateRoute({ children }) {
  return auth.currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-user/:id"
          element={
            <PrivateRoute>
              <UserForm />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
