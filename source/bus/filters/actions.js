// Actions
import { types } from './types';

export const filtersActions = {
  updateBooksFilter: title => {
    return {
      type: types.UPDATE_SEARCH_FILTER,
      payload: title,
    };
  },

  clearSearchFilter: () => {
    return {
      type: types.CLEAR_SEARCH_FILTER,
    };
  },

  updateSelectChange: filter => {
    return {
      type: types.UPDATE_SELECT_CHANGE,
      payload: filter,
    };
  },
};
