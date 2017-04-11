import {
  // SHOW_MESSAGE,
  // HIDE_MESSAGE
} from '../actions/types';

export default function(state = {content: ''}, action) {
  switch(action.type) {
    case SHOW_MESSAGE:
      return { ...state, content: action.payload };
    case HIDE_MESSAGE:
      return { ...state, content: '' };
    default:
      return state;
  }
}
