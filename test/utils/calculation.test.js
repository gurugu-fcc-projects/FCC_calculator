import {
  tooLarge,
  checkForExponential,
  calculationParser,
  calculateOuter,
  calculateSimple
} from '../../src/utils/calculation';

describe('tooLarge', () => {
  it('returns true if the number is longer than 15 digits before decimal dot', () => {
    expect(tooLarge(9999999999999999)).toBeTruthy();
    expect(tooLarge(9.99999899999999e+21)).toBeTruthy();
  });
  it('returns false if the number is shorter or equal to 15 digits before decimal dot', () => {
    expect(tooLarge(999999999999999)).toBeFalsy();
  });
});

describe('checkForExponential', () => {
  it('returns input without changes if the number is short', () => {
    expect(checkForExponential(999999999999999)).toEqual(999999999999999);
  });
  it('makes exponential number if the number is long', () => {
    expect(checkForExponential(1000000000000000)).toEqual('1.00000000e+15');
  });
  it('limits exponential number to 8 digits after decimal dot', () => {
    expect(checkForExponential(1000000000000000)).toEqual('1.00000000e+15');
  });
});

describe('calculationParser', () => {
  it('handles E-numbers simple calculations', () => {
    expect(calculationParser('9.00000000e+15+999999999999999')).toEqual('1.00000000e+16');
    expect(calculationParser('10.00000000e+30-999999999999999')).toEqual('1.00000000e+31');
    expect(calculationParser('10.00000000e+15*999999999999999')).toEqual('1.00000000e+31');
    expect(calculationParser('10.00000000e+30/999999999999999')).toEqual('1.00000000e+16');
  });
  it('handles E-numbers with second number as a percent', () => {
    expect(calculationParser('10.00000000e+15+100%')).toEqual('2.00000000e+16');
    expect(calculationParser('10.00000000e+15-100%')).toEqual('0');
    expect(calculationParser('10.00000000e+15*50%')).toEqual('5.00000000e+15');
    expect(calculationParser('10.00000000e+15/50%')).toEqual('2.00000000e+16');
  });
  it('handles E-numbers as a percent', () => {
    expect(calculationParser('2.00000000e+16%')).toEqual('200000000000000');
  });
  it('handles one number with percent symbol', () => {
    expect(calculationParser('6%')).toEqual('0.06');
    expect(calculationParser('(6)%')).toEqual('0.06');
  });
  it('handles two numbers, when the first number has percent symbol', () => {
    expect(calculationParser('6%+6')).toEqual('6.06');
    expect(calculationParser('6%+(6')).toEqual('6.06');
  });
  it('handles addition of a simple number to percent number', () => {
    expect(calculationParser('10+10%')).toEqual('11');
    expect(calculationParser('10+10+10+10+10+10+10+10+10+10+10%')).toEqual('110');
  });
  it('handles subtraction of a simple number to percent number', () => {
    expect(calculationParser('10-10%')).toEqual('9');
    expect(calculationParser('10+10+10+10+10+10+10+10+10+10-10%')).toEqual('90');
  });
  it('handles division of a simple number by a percent number', () => {
    expect(calculationParser('10/10%')).toEqual('100');
    expect(calculationParser('100+100/10%')).toEqual('1100');
  });
  it('handles multiplication of a simple number by a percent number', () => {
    expect(calculationParser('10*10%')).toEqual('1');
    expect(calculationParser('55*10%')).toEqual('5.5');
    expect(calculationParser('100+55*10%')).toEqual('105.5');
  });
  it('handles both percent numbers', () => {
    expect(calculationParser('10%+10%')).toEqual('0.11');
    expect(calculationParser('10%-10%')).toEqual('0.09000000000000001');
    expect(calculationParser('10%/10%')).toEqual('1');
    expect(calculationParser('10%*10%')).toEqual('0.010000000000000002');
  });
  it('guarantees equal priority for multiplication & division', () => {
    expect(calculationParser('6/2*2')).toEqual('6');
    expect(calculationParser('6*2/2')).toEqual('6');
  });
  it('follows the order of operations, "*" & "/" is calculated before "+")', () => {
    expect(calculationParser('2+22*5')).toEqual('112');
  });
  it('performs simple and complex calculations', () => {
    expect(calculationParser('6/5/3/76/656')).toEqual('0.000008023106546854943');
  });
  it('returns input if there is only one number without brackets and operators', () => {
    expect(calculationParser('6546')).toEqual('6546');
  });
  it('removes trailing operator', () => {
    expect(calculationParser('65+')).toEqual('65');
  });
  it('removes all opening brackets if there are no closing brackets', () => {
    expect(calculationParser('((67')).toEqual('67');
  });
  it('performs calculation (without brackets)', () => {
    expect(calculationParser('6+4')).toEqual('10');
    expect(calculationParser('6*6')).toEqual('36');
    expect(calculationParser('81/9')).toEqual('9');
    expect(calculationParser('6.7+3.4')).toEqual('10.1');
  });
  it('performs calculation (with brackets)', () => {
    expect(calculationParser('(5+5)')).toEqual('10');
    expect(calculationParser('(5+5)+(10+10)')).toEqual('30');
    expect(calculationParser('(((((50*10)/(10*1)')).toEqual('50');
    expect(calculationParser('(2)*(3-2)')).toEqual('2');
  });
  it('deals with negative numbers & brackets', () => {
    expect(calculationParser('(2-3)')).toEqual('-1');
    expect(calculationParser('(2-3)+')).toEqual('-1');
    expect(calculationParser('(2-3)-1')).toEqual('-2');
    expect(calculationParser('(2-3)+1')).toEqual('0');
    expect(calculationParser('(23)*(2-87)')).toEqual('-1955');
  });
  it('deals separately with unclosed bracketed expressions', () => {
    expect(calculationParser('(5+5)+(')).toEqual('10');
    expect(calculationParser('(23)*(2-87')).toEqual('-1955');
  })
  it('deals with negative numbers', () => {
    expect(calculationParser('-10')).toEqual('-10');
    expect(calculationParser('2-3')).toEqual('-1');
    expect(calculationParser('(-1+2')).toEqual('1');
    expect(calculationParser('5+(-2')).toEqual('3');
  });
  it('deals with unfinished equations', () => {
    expect(calculationParser('2+')).toEqual('2');
    expect(calculationParser('2+(')).toEqual('2');
  });
  it('handles ultra small results', () => {
    expect(calculationParser('6/5/3/76/656/4/5')).toEqual('4.01155327e-7');
  });
});

describe('calculateOuter', () => {
  it('returns single number as is', () => {
    expect(calculateOuter('5')).toEqual('5');
  });
  it('returns input unchanged if there are no operators', () => {
    expect(calculateOuter('54667546')).toEqual('54667546');
  });
  it('returns the result of complex math calculation', () => {
    expect(calculateOuter('5+5+5')).toEqual('15');
  });
  it('returns the result of complex math calculation (with floats)', () => {
    expect(calculateOuter('5.5+5+5')).toEqual('15.5');
  });
});

describe('calculateSimple', () => {
  it('sums two simple numbers', () => {
    expect(calculateSimple('', '5', '+', '5')).toEqual(10);
  });
  it('subtracts the second number from the first', () => {
    expect(calculateSimple('', '10', '-', '5')).toEqual(5);
  });
  it('divides the first number by the second', () => {
    expect(calculateSimple('', '10', '/', '5')).toEqual(2);
  });
  it('multiplies the first number by the second', () => {
    expect(calculateSimple('', '10', '*', '5')).toEqual(50);
  });
});
