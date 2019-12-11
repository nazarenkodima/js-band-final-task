// Actions
import { types } from './types';

// actions
import { uiActions } from '../ui/actions';

// API
import { api } from '../../REST/index';

export const authActions = {
  authenticate: () => {
    return {
      type: types.AUTHENTICATE,
    };
  },

  signInAsyncSuccess: user => {
    return {
      type: types.SIGN_IN_ASYNC_SUCCESS,
      payload: user,
    };
  },

  signInAsyncError: error => {
    return {
      type: types.SIGN_IN_ASYNC_ERROR,
      payload: error,
    };
  },

  signInAsync: username => async dispatch => {
    dispatch(uiActions.startFetching());

    dispatch({ type: types.SIGN_IN_ASYNC });

    const response = await api.auth.signin(username);
    const result = await response.json();

    const { token, message } = result;

    if (response.status === 200) {
      dispatch(authActions.signInAsyncSuccess(result));

      localStorage.setItem('token', token);
      localStorage.setItem('username', result.username);
      localStorage.setItem('avatar', result.avatar);

      dispatch({ type: types.AUTHENTICATE });

      dispatch(uiActions.stopFetching());
    }

    if (response.status === 400) {
      dispatch(authActions.signInAsyncError(message));

      dispatch(uiActions.stopFetching());
    }
  },

  signOutAsync: () => async dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');

    dispatch({ type: types.SIGN_OUT });
  },
};
