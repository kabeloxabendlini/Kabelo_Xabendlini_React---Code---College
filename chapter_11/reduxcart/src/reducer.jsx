const initialState = {
  totalCost: 0,
  productCart: []
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "addProduct":
      const addPrice = Number(action.productData.productPrice) || 0;
      return {
        ...state,
        totalCost: state.totalCost + addPrice,
        productCart: [...state.productCart, action.productData]
      };

    case "deleteProduct":
      const deletePrice = Number(action.productData.productPrice) || 0;
      return {
        ...state,
        totalCost: state.totalCost - deletePrice,
        productCart: state.productCart.filter(
          p => p.productName !== action.productData.productName
        )
      };

    default:
      return state;
  }
}

export default cartReducer;
