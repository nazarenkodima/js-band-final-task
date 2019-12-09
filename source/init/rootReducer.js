import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

// reducers
import { Reducer } from '../bus/__DOMAIN__/reducer';

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
  Reducer,
  form: formReducer
});
