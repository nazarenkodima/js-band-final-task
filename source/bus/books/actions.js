// Actions
import { types } from './types';

// actions
import { uiActions } from '../ui/actions';
import { authActions } from '../auth/actions';

// API
import { api } from '../../REST/index';

export const booksActions = {
  fetchBooksAsyncSuccess: books => {
    return {
      type: types.FETCH_BOOKS_ASYNC_SUCCESS,
      payload: books,
    };
  },

  fetchBooksAsyncError: error => {
    return {
      type: types.FETCH_BOOKS_ASYNC_ERROR,
      payload: error,
    };
  },

  resetError: () => {
    return {
      type: types.RESET_ERROR,
    };
  },

  fetchBooksAsync: () => async dispatch => {
    dispatch(uiActions.startFetching());
    dispatch({ type: types.FETCH_BOOKS_ASYNC });

    try {
      const response = await api.books.fetch();
      const result = await response.json();

      dispatch(authActions.authenticate());

      if (response.status === 200) {
        dispatch(booksActions.fetchBooksAsyncSuccess(result));
      }

      if (response.status === 401) {
        dispatch(booksActions.fetchBooksAsyncError(result.message));
        dispatch(uiActions.showNotification(true));
      }
    } catch (e) {
      dispatch(uiActions.emitError(e));
    }

    dispatch(uiActions.stopFetching());
  },
};
