import React, { Component } from 'react';
import Rating from './Rating';
import { Row, Col, Image } from 'react-bootstrap';

class Product extends Component {
  render() {
    // Destructure relevant product data from props
    const { imageUrl, productName, releasedDate, rating, numOfReviews, description } = this.props.data;

    return (
      // Row wrapper for product layout (image + product details)
      <Row className="mb-4 align-items-center">
        
        {/* Product Image Section */}
        <Col xs="auto" className="d-flex align-items-center">
          <Image
            src={imageUrl}        // Product image URL
            alt={productName}     // Accessible alt text
            width={120}           // Larger width for visibility
            height={120}          // Larger height to match width
            rounded               // Rounded edges
          />
        </Col>

        {/* Product Details Section */}
        <Col>
          {/* Product Name */}
          <h5>{productName}</h5>

          {/* Release Date */}
          <small className="text-muted">{releasedDate}</small>

          {/* Rating Component */}
          <div className="mt-2">
            {/* Pass rating and number of reviews to Rating component */}
            <Rating rating={rating} numOfReviews={numOfReviews} />
          </div>

          {/* Product Description */}
          <p className="mt-2">{description}</p>
        </Col>
      </Row>
    );
  }
}

export default Product;
