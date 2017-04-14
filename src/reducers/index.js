import { combineReducers } from 'redux';
import inputReducer from './input';

const rootReducer = combineReducers({
  input: inputReducer
});

export default rootReducer;
