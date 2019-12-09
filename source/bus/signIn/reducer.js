import { types } from './types';

const initialState = {
  isFetching: false,
  user: {},
};

export const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_IN_ASYNC:
      return {
        ...state,
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

    case types.FILL_USER:
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
