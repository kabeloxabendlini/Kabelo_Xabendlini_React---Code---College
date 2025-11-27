import React, { Component } from 'react';
import Rating from './Rating';
import { Row, Col, Image } from 'react-bootstrap';

class Product extends Component {
  render() {
    const { imageUrl, productName, releasedDate, rating, numOfReviews, description } = this.props.data;

    return (
      <Row className="mb-4 align-items-center">
        {/* Product Image */}
        <Col xs="auto" className="d-flex align-items-center">
          <Image
            src={imageUrl}
            alt={productName}
            width={120}     // ✅ Bigger width
            height={120}    // ✅ Bigger height
            rounded
          />
        </Col>

        {/* Product Info */}
        <Col>
          <h5>{productName}</h5>
          <small className="text-muted">{releasedDate}</small>

          <div className="mt-2">
            <Rating rating={rating} numOfReviews={numOfReviews} />
          </div>

          <p className="mt-2">{description}</p>
        </Col>
      </Row>
    );
  }
}

export default Product;
