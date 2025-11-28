import React, { Component } from "react";
import UserForm from "./UserForm";
// import Products from './Products'; // Uncomment if you want to display products

/*
  App Component
  -------------
  Main entry point of the application.
  Currently renders:
  - A heading
  - The UserForm component (a login form using Formik and Bootstrap)
*/
class App extends Component {
  render() {
    return (
      <div>
        {/* Application heading */}
        <h1>My App</h1>

        {/* Render the user login form */}
        <UserForm />

        {/* Optionally, you could render products here by importing Products */}
      </div>
    );
  }
}

export default App;
