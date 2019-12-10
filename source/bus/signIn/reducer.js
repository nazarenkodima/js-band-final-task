import { types } from './types';

const initialState = {
  isFetching: false,
  user: {},
  error: {},
};

export const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_IN_ASYNC:
      return {
        ...state,
      };

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

    case types.START_FETCHING:
      return {
        ...state,
        isFetching: true,
      };

    case types.STOP_FETCHING:
      return {
        ...state,
        isFetching: false,
      };

    default:
      return state;
  }
};
