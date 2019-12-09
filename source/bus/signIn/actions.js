// Actions
import { types } from './types';

import {api} from '../../REST/index';


export const signInActions = {
  fillUser: (user) => {
    return {
      type: types.FILL_USER,
      payload: user
    }
  },

  signInAsync: (username) => async (dispatch) => {

    dispatch({type: types.START_FETCHING});

    dispatch({type: types.SIGN_IN_ASYNC});

    const response = await api.auth.signin(username);
    const result = await response.json();

    dispatch({type: types.STOP_FETCHING});

    dispatch(signInActions.fillUser(result));

    localStorage.setItem('token', result.token);

  }


};

//
// export const signInAsync = (username) => async (dispatch) => {
//   dispatch({
//       type: types.SIGN_IN_ASYNC,
//   });
//   const response = await api.auth.signin(username);
//   const result = await response.json();
//
//   localStorage.setItem('token', result.token);
//     console.log(result);
//
//   };
