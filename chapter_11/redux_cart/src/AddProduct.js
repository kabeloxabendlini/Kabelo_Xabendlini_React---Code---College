import React, { Component } from 'react';
import { Button, Input, Form, FormGroup } from 'reactstrap';

class AddProduct extends Component {
  state = {
    productName: '',
    productPrice: ''
  };

  handleNameChange = (e) => this.setState({ productName: e.target.value });
  handlePriceChange = (e) => this.setState({ productPrice: e.target.value });

  handleAdd = (e) => {
    e.preventDefault();
    if (!this.state.productName || !this.state.productPrice) return;
    this.props.addProduct(this.state.productName, this.state.productPrice);
    this.setState({ productName: '', productPrice: '' });
  };

  render() {
    return (
      <Form inline onSubmit={this.handleAdd}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="text"
            placeholder="Product Name"
            value={this.state.productName}
            onChange={this.handleNameChange}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            type="number"
            placeholder="Product Price"
            value={this.state.productPrice}
            onChange={this.handlePriceChange}
          />
        </FormGroup>
        <Button color="primary" type="submit">
          Add Product
        </Button>
      </Form>
    );
  }
}

export default AddProduct;
