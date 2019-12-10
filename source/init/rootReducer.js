import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// reducers
import { authReducer } from '../bus/auth/reducer';
import { uiReducer } from '../bus/ui/reducer';
import { booksReducer } from '../bus/books/reducer';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  authReducer,
  uiReducer,
  booksReducer,
  form: formReducer,
});
