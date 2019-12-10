// Actions
import { types } from './types';

import { api } from '../../REST/index';

export const signInActions = {
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
    dispatch({ type: types.START_FETCHING });

    dispatch({ type: types.SIGN_IN_ASYNC });

    const response = await api.auth.signin(username);
    const result = await response.json();

    if (response.status === 200) {
      dispatch(signInActions.signInAsyncSuccess(result));

      localStorage.setItem('token', result.token);

      dispatch({ type: types.STOP_FETCHING });
    }

    if (response.status === 400) {
      dispatch(signInActions.signInAsyncError(result.message));

      dispatch({ type: types.STOP_FETCHING });
    }
  },
};
