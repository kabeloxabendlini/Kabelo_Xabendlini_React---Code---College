import React, { Component } from "react";
import Product from "./Product";
import { Container } from "react-bootstrap";

class Products extends Component {
  constructor(props) {
    super(props);
    this.products = this.getProducts();
  }

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

  render() {
    return (
      <Container>
        {this.products.map((product) => (
          <Product key={product.productName} data={product} />
        ))}
      </Container>
    );
  }
}

export default Products;
