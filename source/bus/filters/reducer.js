// Core

import { types } from './types';

const initialState = {
  price: 'price',
  tasksFilter: '',
};

export const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_SEARCH_FILTER:
      return {
        ...state,
        tasksFilter: action.payload,
      };

    case types.UPDATE_SELECT_CHANGE:
      return {
        ...state,
        ...action.payload,
      };

    case types.CLEAR_SEARCH_FILTER:
      return {
        ...state,
        tasksFilter: '',
      };

    default:
      return state;
  }
};
