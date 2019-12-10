import { types } from './types';

const initialState = {
  books: [],
};

export const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_BOOKS_ASYNC_SUCCESS:
      return {
        ...state,
        books: action.payload,
      };

    case types.FETCH_BOOKS_ASYNC_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
