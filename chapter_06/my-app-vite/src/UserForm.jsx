import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Form as RBForm } from "react-bootstrap";

class UserForm extends Component {
  render() {
    return (
      <div className="p-3 border rounded bg-light">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email format";
            } else if (values.email.length < 10) {
              errors.email = "Email too short";
            }

            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 8) {
              errors.password = "Password must be at least 8 characters";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>

              {/* EMAIL */}
              <RBForm.Group className="mb-3">
                <RBForm.Label>Email</RBForm.Label>
                <Field
                  type="email"
                  name="email"
                  as={RBForm.Control}
                  placeholder="Enter email"
                />
                <div className="text-danger mt-1 fw-bold">
                  <ErrorMessage name="email" />
                </div>
              </RBForm.Group>

              {/* PASSWORD */}
              <RBForm.Group className="mb-3">
                <RBForm.Label>Password</RBForm.Label>
                <Field
                  type="password"
                  name="password"
                  as={RBForm.Control}
                  placeholder="Enter password"
                />
                <div className="text-danger mt-1 fw-bold">
                  <ErrorMessage name="password" />
                </div>
              </RBForm.Group>

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
