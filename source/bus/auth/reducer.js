import { types } from './types';

const initialState = {
  isAuthenticated: false,
  user: {},
  error: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_IN_ASYNC_SUCCESS:
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };

    case types.SIGN_IN_ASYNC_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case types.AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: true,
      };

    default:
      return state;
  }
};
