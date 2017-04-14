import {
  UPDATE_INPUT,
  CLEAR_INPUT,
  HIDE_MESSAGE,
  ERROR_MESSAGE
 } from '../actions/types';

const INIT_STATE = {
  parsed: '',
  display: '',
  result: '',
  message: ''
}

export default function(state = INIT_STATE, action) {
  switch(action.type) {
    case ERROR_MESSAGE:
      return {
        parsed: action.payload.parsed,
        display: action.payload.display,
        result: action.payload.result,
        message: action.payload.message
      };
    case UPDATE_INPUT:
      return {
        ...state,
        parsed: action.payload.parsed,
        display: action.payload.display,
        result: action.payload.result
      };
    case CLEAR_INPUT:
      return {
        parsed: '',
        display: '',
        result: '',
        message: ''
      };
    case HIDE_MESSAGE:
      return {
        ...state,
        message: ''
      };
    default:
      return state;
  }
}
