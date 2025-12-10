import React, { Component } from 'react';
import Product from './Product';
import { Container } from 'react-bootstrap';

class Products extends Component {
  // Constructor runs once when the component is created
  constructor(props) {
    super(props);
    // Store the product list in a class property
    // (we are not using React state here because the list is static)
    this.products = this.getProducts();
  }

  // Returns an array of product objects
  // Each object represents 1 product with its details
  getProducts() {
  return [
    { 
      imageUrl: "http://loremflickr.com/150/150?random=1",
      productName: "Product 1",
      releasedDate: "May 31, 2016",
      description: "Description for product 1.",
      rating: 1,
      numOfReviews: 5
    },
    { 
      imageUrl: "http://loremflickr.com/150/150?random=2",
      productName: "Product 2",
      releasedDate: "June 15, 2016",
      description: "Description for product 2.",
      rating: 2,
      numOfReviews: 10
    },
    { 
      imageUrl: "http://loremflickr.com/150/150?random=3",
      productName: "Product 3",
      releasedDate: "July 1, 2016",
      description: "Description for product 3.",
      rating: 3,
      numOfReviews: 3
    },
    { 
      imageUrl: "http://loremflickr.com/150/150?random=4",
      productName: "Product 4",
      releasedDate: "August 20, 2016",
      description: "Description for product 4.",
      rating: 4,
      numOfReviews: 7
    },
    { 
      imageUrl: "http://loremflickr.com/150/150?random=5",
      productName: "Product 5",
      releasedDate: "September 5, 2016",
      description: "Description for product 5.",
      rating: 5,
      numOfReviews: 12
    }
  ];
}


  // Render method controls what appears on the screen
  render() {    
    return (
      // Bootstrap Container adds spacing and centers content
      <Container className="mt-4">
        {/* Loop through all products and render a <Product /> component for each one */}
        {this.products.map((product) => (
          // "key" helps React identify each item for performance
          // "data" is passed as props to the Product component
          <Product key={product.productName} data={product} />
        ))}
      </Container>
    );
  }
}

export default Products;
