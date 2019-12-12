import { types } from './types';

const initialState = {
  cart: undefined,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TYPE:
      return state;

    default:
      return state;
  }
};
