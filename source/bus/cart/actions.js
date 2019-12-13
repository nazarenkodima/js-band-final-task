// Actions
import { types } from './types';

export const cartActions = {
  addBookToCart: book => {
    return {
      type: types.ADD_TO_CART,
      payload: book,
    };
  },

  fillCart: cart => {
    return {
      type: types.FILL_CART,
      payload: cart,
    };
  },

  clearCart: () => {
    return {
      type: types.CLEAR_CART,
    };
  },

  getCartTotal: () => {
    return {
      type: types.CART_TOTAL,
    };
  },

  fillCartTotalPrice: price => {
    return {
      type: types.FILL_CART_TOTAL_PRICE,
      payload: price,
    };
  },

  addBookToCartAsync: book => (dispatch, getState) => {
    dispatch(cartActions.addBookToCart(book));

    dispatch(cartActions.getCartTotal());

    const { cart } = getState().cartReducer;
    const { cartTotal } = getState().cartReducer;

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartTotal', cartTotal);
  },
};
