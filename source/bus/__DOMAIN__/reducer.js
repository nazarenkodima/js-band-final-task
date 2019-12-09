import { types } from './types';

const initialState = null;

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TYPE:
      return state;

    default:
      return state;
  }
};
