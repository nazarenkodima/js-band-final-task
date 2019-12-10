import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// reducers
import { signInReducer } from '../bus/signIn/reducer';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  signInReducer,
  form: formReducer,
});
