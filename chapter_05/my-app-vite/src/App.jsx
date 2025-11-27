import React, { Component } from 'react';
import Products from './Products';
import { Row, Container } from 'react-bootstrap'; // Import Row & Container

class App extends Component {
  render() {
    return (
      <Container className="mt-4">
        {/* Wrap in a Row for proper Bootstrap grid alignment */}
        <Row className="mb-4 align-items-center">
          <Products />  {/* Render all products here */}
        </Row>
      </Container>
    );
  }
}

export default App;


