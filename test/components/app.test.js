import React from 'react';
import { shallow } from 'enzyme';

import { App } from '../../src/components/app';
import CalculatorDisplay from '../../src/components/calculator_display';
import CalculatorKeypad from '../../src/components/calculator_display';

function setup() {
  const enzymeWrapper = shallow(<App />);

  return { enzymeWrapper };
}

describe('App', () => {
  let enzymeWrapper;

  beforeEach(() => {
    ({ enzymeWrapper } = setup());
  });

  it('renders without crashing', () => {
    expect(enzymeWrapper.hasClass('calculator')).toBe(true);
  });
  it('shows display', () => {
    expect(enzymeWrapper.find('CalculatorDisplay')).toBeTruthy();
  });
  it('shows keypad', () => {
    expect(enzymeWrapper.find('CalculatorKeypad')).toBeTruthy();
  });
});
