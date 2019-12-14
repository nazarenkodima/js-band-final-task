import { types } from './types';

const initialState = {
  book: {},
  error: false,
};

export const viewBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_BOOK_ASYNC_SUCCESS:
      return {
        ...state,
        book: action.payload,
      };

    case types.FETCH_BOOK_ASYNC_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case types.CLEAR_BOOK:
      return {
        ...state,
        book: {},
      };

    default:
      return state;
  }
};
