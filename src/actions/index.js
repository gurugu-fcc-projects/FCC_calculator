import {
  inputCheck,
  parseInput,
  beautifyInput,
  beautifyResult
} from '../utils/parsers';
import { calculationParser } from '../utils/calculation';
import {
  UPDATE_INPUT,
  CLEAR_INPUT,
  HIDE_MESSAGE,
  ERROR_MESSAGE
} from './types';

const errorMessage = (input, message) => {
  return {
    type: ERROR_MESSAGE,
    payload: {
      parsed: input,
      display: beautifyInput(input),
      result: '',
      message: message
    }
  };
}

export const handleInput = (parsedInput, currentInput) => {
  //=== check input
  const message = inputCheck(parsedInput, currentInput);

  //=== handle DELETE action
  if (currentInput === 'delete') {
    const updatedInput = parsedInput.slice(0, -1);

    if (message) {
      return errorMessage(updatedInput, message.content);
    } else if (calculationParser(updatedInput) === false) {
      return errorMessage(updatedInput, 'Can\'t divide by zero');
    } else {
      return {
        type: UPDATE_INPUT,
        payload: {
          parsed: updatedInput,
          display: beautifyInput(updatedInput),
          result: beautifyResult(calculationParser(updatedInput))
        }
      };
    }
  }

  //=== handle CLEAR action
  if (currentInput === 'C') {
    return {
      type: CLEAR_INPUT
    };
  }

  //=== handle EQUALITY action
  if (currentInput === '=') {
    if (message) {
      return errorMessage(parsedInput, message.content);
    } else if (calculationParser(parsedInput) === false) {
      return errorMessage(parsedInput, 'Can\'t divide by zero');
    } else {
      return {
        type: UPDATE_INPUT,
        payload: {
          parsed: calculationParser(parsedInput),
          display: beautifyResult(calculationParser(parsedInput)),
          result: ''
        }
      };
    }
  }

  //=== handle CALCULATION
  const updatedInput = parseInput(parsedInput, currentInput);

  if (message && message.type === 'medium') {
    return errorMessage(updatedInput, message.content);
  } else if (message && message.type === 'serious') {
    return errorMessage(parsedInput, message.content);
  } else if (calculationParser(updatedInput) === false) {
    return errorMessage(updatedInput, 'Can\'t divide by zero');
  } else {
    return {
      type: UPDATE_INPUT,
      payload: {
        parsed: updatedInput,
        display: beautifyInput(updatedInput),
        result: beautifyResult(calculationParser(updatedInput))
      }
    };
  }
}

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE
  };
}
