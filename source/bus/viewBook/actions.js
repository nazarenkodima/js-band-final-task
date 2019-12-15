// Actions
import { types } from './types';

// actions
import { uiActions } from '../ui/actions';
import { counterActions } from '../counter/actions';

// API
import { api } from '../../REST/index';

export const viewBookActions = {
  fetchBookAsyncSuccess: book => {
    return {
      type: types.FETCH_BOOK_ASYNC_SUCCESS,
      payload: book,
    };
  },

  fetchBookAsyncError: error => {
    return {
      type: types.FETCH_BOOK_ASYNC_ERROR,
      payload: error,
    };
  },

  clearBook: () => {
    return {
      type: types.CLEAR_BOOK,
    };
  },

  viewBook: () => {
    return {
      type: types.CLEAR_BOOK,
    };
  },

  fetchBookAsync: id => async dispatch => {
    dispatch(uiActions.startFetching());
    dispatch({ type: types.FETCH_BOOK_ASYNC });

    try {
      const response = await api.books.viewBook(id);
      const result = await response.json();

      if (response.status === 200) {
        dispatch(viewBookActions.fetchBookAsyncSuccess(result));
        dispatch(counterActions.setTotalPrice(result.price));
        dispatch(counterActions.setBookAvailability(result.count));
      }

      if (response.status === 401) {
        dispatch(viewBookActions.fetchBookAsyncError(result.message));
        dispatch(uiActions.showNotification(true));
      }
    } catch (e) {
      dispatch(viewBookActions.fetchBookAsyncError(e));
      dispatch(uiActions.emitError(e));
    }

    dispatch(uiActions.stopFetching());
  },
};
