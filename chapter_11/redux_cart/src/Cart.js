import React, { Component } from 'react';
import AddProduct from './AddProduct';
import { Table, Button } from 'reactstrap';

class Cart extends Component {
  render() {
    return (
      <div className="container mt-4">
        <AddProduct addProduct={this.props.onAddProduct} />

        <Table striped responsive className="mt-3">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Product Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.productCart.map((product) => (
              <tr key={product.productName}>
                <td>{product.productName}</td>
                <td>{product.productPrice}</td>
                <td>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => this.props.onDeleteProduct(product)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h5>Total Amount: {this.props.totalCost}</h5>
      </div>
    );
  }
}

export default Cart;
