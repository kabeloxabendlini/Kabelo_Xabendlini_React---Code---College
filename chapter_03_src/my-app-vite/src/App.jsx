// Import React and Component class for creating class-based components
import React, { Component } from 'react';

// Import the Rating component which will display individual ratings
import Rating from './Rating';

// Import layout components from react-bootstrap for responsive grid layout
import { Container, Row, Col } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      // Container provides proper responsive padding and centers content
      <Container>
        {/* Row creates a horizontal group of columns */}
        <Row>
          {/*
            Loop through an array of numbers [1..5]
            For each number, create a column with a Rating component.
            This avoids writing the same JSX five times.
          */}
          {[1, 2, 3, 4, 5].map((ratingValue) => (
            // Col creates a responsive column — key is added for React's list rendering
            <Col key={ratingValue}>
              {/* Display the rating label/title */}
              <h3>Rating {ratingValue}</h3>

              {/* Pass the ratingValue as a prop to the Rating component */}
              <Rating rating={ratingValue} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

// Export App so it can be used in index.js or other files
export default App;
