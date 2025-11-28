import React, { Component } from "react";
import JumboTronComponent from "./JumboTronComponent";
import Products from "./Products";
import { Container } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      // Main layout container with top margin for spacing
      <Container className="mt-4">

        {/* Top Jumbotron section */}
        <JumboTronComponent />

        {/* Product list section */}
        <Products />

        {/* Bottom Jumbotron section */}
        <JumboTronComponent />

      </Container>
    );
  }
}

export default App;
