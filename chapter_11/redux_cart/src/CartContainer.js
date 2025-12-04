import { connect } from 'react-redux';
import Cart from './Cart';

const mapStateToProps = (state) => ({
  totalCost: state.totalCost,
  productCart: state.productCart
});

const mapDispatchToProps = (dispatch) => ({
  onAddProduct: (name, price) =>
    dispatch({
      type: 'addProduct',
      productData: { productName: name, productPrice: price }
    }),
  onDeleteProduct: (productData) =>
    dispatch({
      type: 'deleteProduct',
      productData
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
