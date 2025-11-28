import React, { Component } from 'react';

class Products extends Component {

  render() {
    // Array of product names to display
    const products = ["Learning React", "Pro React", "Beginning React"];

    // Map through the product list and return <li> elements
    // Each item gets a unique key (using product name here)
    const listProducts = products.map((product) => 
      <li key={product.toString()}>{product}</li>
    );

    return (
      <div>
        {/* Render the list of product <li> items inside a <ul> */}
        <ul>{listProducts}</ul>
      </div>
    );
  }
}

export default Products;
