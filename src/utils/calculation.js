export const tooLarge = (input) => { // check if the number is too large
  let inputInString = input.toString(10);

  if (inputInString.indexOf('e') !== -1)
    return true;
  if (inputInString.indexOf('.') !== -1)
    inputInString = inputInString.slice(0, inputInString.indexOf('.'));

  return inputInString.length > 15;
}

export const checkForExponential = (input) => { // turn a large number into exponential
  return tooLarge(input) ? input.toExponential(8) : input;
}

export const calculateSimple = (_match, firstNumber, operator, secondNumber) => {
  //=== handle percents & convert strings to numbers
  if (firstNumber.indexOf('%') !== -1) {
    firstNumber = Number(firstNumber.slice(0, firstNumber.indexOf('%'))) * 0.01;
  } else {
    firstNumber = Number(firstNumber);
  }

  if (secondNumber.indexOf('%') !== -1) {
    // firstNumber = Number(firstNumber);
    if (secondNumber.indexOf('-') !== -1) {
      secondNumber = Number(secondNumber.slice(0, secondNumber.indexOf('%'))) * 0.01;
    } else if (operator === '-' || operator === '+') {
      secondNumber = firstNumber * secondNumber.slice(0, secondNumber.indexOf('%')) / 100;
    } else {
      secondNumber = secondNumber.slice(0, secondNumber.indexOf('%')) / 100;
    }
  } else {
    secondNumber = Number(secondNumber);
  }
  //=== perform a calculation depending on passed operator
  switch(operator) {
    case '+':
      return checkForExponential(firstNumber + secondNumber);
    case '-':
      return checkForExponential(firstNumber - secondNumber);
    case '*':
      return checkForExponential(firstNumber * secondNumber);
    case '/':
      //=== protection from division by zero in complex equations
      if (secondNumber === 0) {
        return 'error';
      }
      return checkForExponential(firstNumber / secondNumber);
    default:
      return '';
  }
}

export const calculateOuter = (input) => {
  try {
    //=== catch error status
    if (input.indexOf('error') !== -1) {
      return false;
    }
    //=== return if only one number is left
    if (/^(\-)?\d+(\.)?(\d+)?(e\+\d+|e\+|e)?(e\-\d+|e\-|e)?%?$/.test(input)) {
      //=== handle single number with percent sign
      if (input.indexOf('%') !== -1) {
        const number = input.slice(0, input.indexOf('%'));
        return (Number(number) * 0.01).toString();
      }
      //=== handle single number
      return input;
    } else {
        //=== handle operators priority
      if (input.indexOf('*') !== -1 || input.indexOf('/') !== -1) {
        //=== first handle multiplication & division
        return calculateOuter(input.replace(/(\-?[\d\.%]+(?:e\+\d+)?)([\/\*])(\-?[\d\.%]+(?:e\+\d+)?)/, calculateSimple));
      } else {
        //=== then handle addition & subtraction
        return calculateOuter(input.replace(/(\-?[\d\.%]+(?:e\+\d+)?)([\+\-])(\-?[\d\.%]+(?:e\+\d+)?)/, calculateSimple));
      }
    }
  } catch (e) {
    console.error(e);
  }
}

export const calculateBracketedExpression = (input) => {
  const expressionStart = input.lastIndexOf('(');
  const expressionEnd = input.indexOf(')', expressionStart) === -1
    ? input.length
    : input.indexOf(')', expressionStart);
  const inputHead = input.slice(0, expressionStart);
  const inputTail = expressionEnd === input.length
    ? ''
    : input.slice(expressionEnd + 1);
  const expression = expressionEnd === input.length
    ? input.slice(expressionStart + 1)
    : input.slice(expressionStart + 1, expressionEnd);

  return inputHead + calculateOuter(expression) + inputTail;
}

export const calculationParser = (input) => {
  //=== resolve error status
  if (input === false) {
    return false;
  }
  if (input.length === 0) { // solve issue with empty input
    return input;
  }
  if (/[\/\+\-\*\(]$/.test(input)) {
    return calculationParser(input.slice(0, -1)); // remove trailing operator ot bracket if present
  }
  if (input.indexOf('(') !== -1) { // follow this branch if there are opening brackets
    if (input.indexOf(')') === -1) { // if there are only opening brackets, remove them
      return calculationParser(input.replace(/\(/g, '')); // call calculationParser again, but this time without brackets
    } else {
      return calculationParser(calculateBracketedExpression(input)); // calculate one bracketed expression & repeat
    }
  } else  { // there are no brackets
    return calculateOuter(input);
  }
}
