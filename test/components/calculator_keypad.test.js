import React from 'react';
import { shallow } from 'enzyme';

import { CalculatorKeypad } from '../../src/components/calculator_keypad';

function setup() {
  const enzymeWrapper = shallow(<CalculatorKeypad />);

  return { enzymeWrapper };
}

describe('CalculatorKeypad', () => {
  let enzymeWrapper;

  beforeEach(() => {
    ({ enzymeWrapper } = setup());
  });

  it('renders without crashing', () => {
    expect(enzymeWrapper.hasClass('keypad')).toBe(true);
  });
  it('shows 21 buttons', () => {
    expect(enzymeWrapper.find('.keypad-main').find('div').length).toBe(21);
  });
});
