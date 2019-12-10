// Actions
import { types } from './types';

// actions
import { uiActions } from '../ui/actions';
import { authActions } from '../auth/actions';

// API
import { api } from '../../REST/index';

export const booksActions = {
  fetchBookAsync: () => async dispatch => {
    dispatch(uiActions.startFetching());
    dispatch({ type: types.FETCH_BOOKS_ASYNC });

    try {
      const response = await api.books.fetch();
      const result = await response.json();

      dispatch(authActions.authenticate());

      console.log(result);
    } catch (e) {
      console.log(e);
    }

    dispatch(uiActions.stopFetching());
  },
};
