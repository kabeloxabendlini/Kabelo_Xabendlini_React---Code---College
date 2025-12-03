// src/App.js
import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./User";
import UserForm from "./UserForm";

class NotFound extends Component {
  render() {
    return <div>Page Not Found</div>;
  }
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/add" element={<UserForm />} />
          <Route path="/edit/:id" element={<UserForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
