// Actions
import { types } from './types';

export const counterActions = {
  increment: () => {
    return {
      type: types.INCREMENT,
    };
  },
  decrement: () => {
    return {
      type: types.DECREMENT,
    };
  },
  setTotalPrice: price => {
    return {
      type: types.TOTAL_PRICE,
      payload: price,
    };
  },
  setCount: count => {
    return {
      type: types.SET_COUNT,
      payload: count,
    };
  },
  setBookAvailability: count => {
    return {
      type: types.BOOKS_AVAILABILITY,
      payload: count,
    };
  },
  isBooksAvailabilityMax: warning => {
    return {
      type: types.IS_BOOKS_AVAILABILITY_MAX,
      payload: warning,
    };
  },
  updateTotalPrice: price => {
    return {
      type: types.UPDATE_TOTAL_PRICE,
      payload: price,
    };
  },
  updateTotalPriceOnBlur: price => {
    return {
      type: types.UPDATE_TOTAL_PRICE_ON_BLUR,
      payload: price,
    };
  },
  setBookPriceOnFocus: price => {
    return {
      type: types.SET_BOOK_PRICE_ON_FOCUS,
      payload: price,
    };
  },
  isInputValid: valid => {
    return {
      type: types.IS_INPUT_VALID,
      payload: valid,
    };
  },
};
