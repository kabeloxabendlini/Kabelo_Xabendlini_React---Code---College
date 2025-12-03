import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [usernameTouched, setUsernameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const [errorUsername, setErrorUsername] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const title = id ? "Edit User" : "New User";

  useEffect(() => {
    if (id) {
      firebase
        .database()
        .ref("/" + id)
        .on("value", (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUsername(data.username);
            setEmail(data.email);
          }
        });
    }
  }, [id]);

  const validateUsername = () => {
    if (!usernameTouched) return "";
    if (username.length === 0) return "Username is required";
    if (username.length < 3) return "Username should be minimum 3 characters";
    if (username.includes(" ")) return "Username cannot contain spaces";
    return "";
  };

  const validateEmail = () => {
    if (!emailTouched) return "";
    if (email.length === 0) return "Email is required";
    if (email.length < 3) return "Email should be minimum 3 characters";
    if (!email.includes("@")) return "Email should contain @";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usernameError = validateUsername();
    const emailError = validateEmail();

    setErrorUsername(usernameError);
    setErrorEmail(emailError);

    if (usernameError || emailError) return;

    if (id) {
      // Update
      firebase
        .database()
        .ref("/" + id)
        .update({ username, email })
        .then(() => navigate("/"));
    } else {
      // Create new
      firebase
        .database()
        .ref("/")
        .push({ username, email })
        .then(() => navigate("/"));
    }
  };

  const canBeSubmitted = !validateUsername() && !validateEmail();

  return (
    <div className="container mt-4">
      <h1>{title}</h1>

      <Form onSubmit={handleSubmit}>
        {/* Username */}
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => setUsernameTouched(true)}
            isInvalid={!!validateUsername()}
          />
          <Form.Control.Feedback type="invalid">{validateUsername()}</Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            isInvalid={!!validateEmail()}
          />
          <Form.Control.Feedback type="invalid">{validateEmail()}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!canBeSubmitted}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UserForm;
