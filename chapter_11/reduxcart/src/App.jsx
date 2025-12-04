const initialState = {
  totalCost: 0,
  productCart: []
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "addProduct":
      return {
        ...state,
        totalCost: state.totalCost + action.productData.productPrice,
        productCart: [...state.productCart, action.productData]
      };

    case "deleteProduct":
      return {
        ...state,
        totalCost: state.totalCost - action.productData.productPrice,
        productCart: state.productCart.filter(
          (p) => p.productName !== action.productData.productName
        )
      };

    default:
      return state;
  }
}

export default cartReducer;
