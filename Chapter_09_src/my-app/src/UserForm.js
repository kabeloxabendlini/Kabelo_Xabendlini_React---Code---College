// src/UserForm.js
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ref, get, update, push, set } from "firebase/database";
import { db } from "./firebaseConfig";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Container, Card, Button, Form as BootstrapForm, Alert } from "react-bootstrap";

const UserForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // undefined for Add mode

  const [initialValues, setInitialValues] = useState({
    username: "",
    email: "",
  });

  const [submitSuccess, setSubmitSuccess] = useState("");

  // For Edit mode: fetch existing user
  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const snapshot = await get(ref(db, `users/${id}/profile`));
          if (snapshot.exists()) setInitialValues(snapshot.val());
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (id) {
        await update(ref(db, `users/${id}/profile`), values);
        setSubmitSuccess("User updated successfully!");
      } else {
        const newUserRef = push(ref(db, "users"));
        await set(ref(db, `users/${newUserRef.key}/profile`), values);
        setSubmitSuccess("User added successfully!");

        // Call callback to update User.js instantly
        location.state?.onAddUser?.(newUserRef.key, values);
      }

      setSubmitting(false);

      setTimeout(() => navigate("/"), 500); // go back to User list quickly
    } catch (err) {
      console.error("Error submitting form:", err);
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-lg p-4">
        <h2 className="mb-4 text-center">{id ? "Edit User" : "Add New User"}</h2>
        {submitSuccess && <Alert variant="success">{submitSuccess}</Alert>}

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
            if (!values.username) errors.username = "Username is required";
            if (!values.email) errors.email = "Email is required";
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Username</BootstrapForm.Label>
                <Field type="text" name="username" className="form-control" />
                <ErrorMessage name="username" component="div" className="text-danger" />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Email</BootstrapForm.Label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </BootstrapForm.Group>

              <div className="d-flex justify-content-center mt-4">
                <Button type="submit" disabled={isSubmitting} variant="primary">
                  {id ? "Update User" : "Add User"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default UserForm;
