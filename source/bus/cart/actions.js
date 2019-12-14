// Actions
import { types } from './types';

import { uiActions } from '../ui/actions';

import { api } from '../../REST';

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

  booksReadyForPurchase: () => {
    return {
      type: types.BOOKS_READY_FOR_PURCHASE,
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

  purchaseAsync: () => async (dispatch, getState) => {
    dispatch(uiActions.startFetching());

    const booksId = getState().cartReducer.idArray;

    dispatch({ type: types.PURCHASE_ASYNC });

    const response = await api.cart.purchase(booksId);
    const result = await response.json();

    if (response.status === 200) {
      dispatch(cartActions.purchaseAsyncSuccess(result.message));
      dispatch(cartActions.clearCart());
      localStorage.removeItem('cart');
    }

    if (response.status === 400 || response.status === 401) {
      dispatch(cartActions.purchaseAsyncFailure(result.message));
    }

    dispatch(uiActions.showNotification(true));

    dispatch(uiActions.stopFetching());
  },

  purchaseAsyncSuccess: message => {
    return {
      type: types.PURCHASE_ASYNC_SUCCESS,
      payload: message,
    };
  },

  purchaseAsyncFailure: message => {
    return {
      type: types.PURCHASE_ASYNC_FAILURE,
      payload: message,
    };
  },
};
