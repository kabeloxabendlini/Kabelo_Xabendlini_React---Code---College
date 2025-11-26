import React, { Component } from 'react';
import Rating from './Rating';
import { Container, Row, Col } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          {/* Render 5 separate columns, each with a Rating */}
          {[1, 2, 3, 4, 5].map((ratingValue) => (
            <Col key={ratingValue}>
              <h3>Rating {ratingValue}</h3>
              <Rating rating={ratingValue} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default App;

