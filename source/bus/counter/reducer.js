import { types } from './types';

const initialState = {
  count: 1,
  totalPrice: null,
  booksAvailability: null,
  bookPrice: null,
  isInputValid: true,
};

export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };

    case types.DECREMENT:
      return {
        ...state,
        count: Math.max(1, state.count - 1),
      };

    case types.TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload,
      };

    case types.UPDATE_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload * state.count,
      };

    case types.BOOKS_AVAILABILITY:
      return {
        ...state,
        booksAvailability: action.payload,
      };

    case types.SET_COUNT:
      return {
        ...state,
        count: action.payload,
      };

    case types.UPDATE_TOTAL_PRICE_ON_BLUR:
      return {
        ...state,
        totalPrice: action.payload * state.bookPrice,
      };

    case types.SET_BOOK_PRICE_ON_FOCUS:
      return {
        ...state,
        bookPrice: action.payload,
      };

    case types.IS_INPUT_VALID:
      return {
        ...state,
        isInputValid: action.payload,
      };

    default:
      return state;
  }
};
