// src/Signup.js
import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Signup failed. Try again.");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <Card className="shadow p-4">
        <h2 className="mb-4 text-center">Sign Up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </Form.Group>
          <Button type="submit" className="w-100" variant="primary">Sign Up</Button>
        </Form>
        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Card>
    </Container>
  );
};

export default Signup;


