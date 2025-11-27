import React, { Component } from "react";
import JumboTronComponent from "./JumboTronComponent";
import Products from "./Products";
import { Container } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <Container className="mt-4">

        <JumboTronComponent />

        <Products />

        <JumboTronComponent />

      </Container>
    );
  }
}

export default App;
