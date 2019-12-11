import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// reducers
import { authReducer } from '../bus/auth/reducer';
import { uiReducer } from '../bus/ui/reducer';
import { booksReducer } from '../bus/books/reducer';
import { viewBookReducer } from '../bus/viewBook/reducer';
import { filtersReducer } from '../bus/filters/reducer';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  authReducer,
  uiReducer,
  booksReducer,
  viewBookReducer,
  filtersReducer,
  form: formReducer,
});
