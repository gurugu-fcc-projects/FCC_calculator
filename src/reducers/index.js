import { combineReducers } from 'redux';
import inputReducer from './input';
// import messageReducer from './message';

const rootReducer = combineReducers({
  input: inputReducer
  // message: messageReducer
});

export default rootReducer;
