import React from 'react';
import { shallow } from 'enzyme';

import { CalculatorDisplay } from '../../src/components/calculator_display';

function setup() {
  const props = {
    dislay: '12345',
    result: '12345'
  };

  const enzymeWrapper = shallow(<CalculatorDisplay {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('CalculatorDisplay', () => {
  let enzymeWrapper;

  beforeEach(() => {
    ({ enzymeWrapper } = setup());
  });

  it('renders without crashing', () => {
    expect(enzymeWrapper.hasClass('display')).toBe(true);
  });
  it('shows input field', () => {
    expect(enzymeWrapper.find('.display-input')).toBeTruthy();
  });
  it('shows result field', () => {
    expect(enzymeWrapper.find('.display-result')).toBeTruthy();
  });
});
