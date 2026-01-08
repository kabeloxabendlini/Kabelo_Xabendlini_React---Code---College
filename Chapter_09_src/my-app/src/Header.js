// src/Header.js
import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          User Management
        </Navbar.Brand>
        <Nav className="ms-auto">
          {auth.currentUser ? (
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button variant="outline-light" className="me-2" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button variant="outline-light" onClick={() => navigate("/signup")}>
                Signup
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
