import { map } from 'lodash';

import { types } from './types';

const initialState = {
  cart: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      // eslint-disable-next-line no-case-declarations
      const updateBook = state.cart.find(item => item.id === action.payload.id);

      if (updateBook) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? {
                  ...item,
                  count: updateBook.count + action.payload.count,
                  totalPrice: updateBook.totalPrice + action.payload.totalPrice,
                }
              : item,
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case types.FILL_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case types.CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    case types.CART_TOTAL:
      return {
        ...state,
        cartTotal: state.cart.reduce((a, b) => {
          return a + b.totalPrice;
        }, 0),
      };

    case types.FILL_CART_TOTAL_PRICE:
      return {
        ...state,
        cartTotal: action.payload,
      };

    case types.BOOKS_READY_FOR_PURCHASE:
      return {
        ...state,
        idArray: {
          books: map(state.cart, 'id'),
        },
      };

    case types.PURCHASE_ASYNC_SUCCESS:
      return {
        ...state,
        successMessage: action.payload,
      };

    case types.PURCHASE_ASYNC_FAILURE:
      return {
        ...state,
        failMessage: action.payload,
      };

    default:
      return state;
  }
};
