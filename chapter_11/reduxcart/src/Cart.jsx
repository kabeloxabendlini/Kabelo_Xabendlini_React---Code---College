import React, { Component } from "react";
import AddProduct from "./AddProduct";
import { Table } from "reactstrap";

class Cart extends Component {
  render() {
    return (
      <div className="container mt-4">
        <AddProduct addProduct={this.props.onAddProduct} />

        <Table striped responsive>
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Product Price</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            {this.props.productCart.map((productData) => (
              <tr key={productData.productName}>
                <td>{productData.productName}</td>
                <td>{productData.productPrice}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.props.onDeleteProduct(productData)}
                  >
                    Remove
                  </button>
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
