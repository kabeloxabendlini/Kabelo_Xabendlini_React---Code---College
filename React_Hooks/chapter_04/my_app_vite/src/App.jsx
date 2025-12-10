import React, { Component } from 'react';
import Products from './Products';
import { Row, Container } from 'react-bootstrap'; // Import Bootstrap layout components

class App extends Component {
  render() {
    return (
      // Main container to center content and add top margin
      <Container className="mt-4">
        
        {/* Row for proper Bootstrap grid alignment */}
        <Row className="mb-4 align-items-center">
          
          {/* Render the Products component inside the row */}
          <Products />
          
        </Row>
      </Container>
    );
  }
}

export default App;
