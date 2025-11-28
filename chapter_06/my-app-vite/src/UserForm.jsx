import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Form as RBForm } from "react-bootstrap";

/*
  UserForm Component
  ------------------
  This form uses Formik for form management and validation,
  combined with React-Bootstrap for styling.

  Features:
  - Controlled form inputs for email and password
  - Real-time validation
  - Error messages displayed below inputs
  - Disabled submit button while submitting
*/
class UserForm extends Component {
  render() {
    return (
      // Container with padding, border, rounded corners, and light background
      <div className="p-3 border rounded bg-light">

        <Formik
          initialValues={{ email: "", password: "" }} // Initial form values

          // Form validation function
          validate={(values) => {
            const errors = {};

            // EMAIL VALIDATION
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email format";
            } else if (values.email.length < 10) {
              errors.email = "Email too short";
            }

            // PASSWORD VALIDATION
            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 8) {
              errors.password = "Password must be at least 8 characters";
            }

            return errors;
          }}

          // Handle form submission
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // Show form values as an alert
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false); // Enable submit button again
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>

              {/* EMAIL FIELD */}
              <RBForm.Group className="mb-3">
                <RBForm.Label>Email</RBForm.Label>
                <Field
                  type="email"
                  name="email"
                  as={RBForm.Control}   // Use Bootstrap input
                  placeholder="Enter email"
                />
                {/* Display email validation errors */}
                <div className="text-danger mt-1 fw-bold">
                  <ErrorMessage name="email" />
                </div>
              </RBForm.Group>

              {/* PASSWORD FIELD */}
              <RBForm.Group className="mb-3">
                <RBForm.Label>Password</RBForm.Label>
                <Field
                  type="password"
                  name="password"
                  as={RBForm.Control}  // Use Bootstrap input
                  placeholder="Enter password"
                />
                {/* Display password validation errors */}
                <div className="text-danger mt-1 fw-bold">
                  <ErrorMessage name="password" />
                </div>
              </RBForm.Group>

              {/* SUBMIT BUTTON */}
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>

            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default UserForm;
