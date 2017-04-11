import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { rippleEffect, rippleEffectDisplay } from '../utils/visual';
import { getKeyName } from '../utils/parsers';

export class CalculatorKeypad extends Component {
  componentWillUpdate() {
    window.removeEventListener('keyup', this.handleKeyboard);
  }

  handleKeyboard = (event) => {
    const keyName = getKeyName(event);

    if (keyName) {
      if (keyName !== 'delete') {
        const pressedElement = document.querySelector(`[data-key="${keyName}"]`);
        rippleEffect(event, true, pressedElement);
      }

      if (keyName === 'C') {
        rippleEffectDisplay();
        setTimeout(() => {
          this.props.handleInput(this.props.parsedInput, keyName);
        }, 300);
      } else {
        this.props.handleInput(this.props.parsedInput, keyName);
      }
    }
  }

  handleMouseAndTouch = (event, parsedInput, key) => {
    rippleEffect(event, false, null);

    if (key === 'C') {
      rippleEffectDisplay();
      setTimeout(() => {
        this.props.handleInput(parsedInput, key);
      }, 300);
    } else {
      this.props.handleInput(parsedInput, key);
    }
  }

  render() {
    const keys = ['C', '()', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '.', '0', '+/-', '='];
    const parsedInput = this.props.parsedInput;
    //== create keypad
    const keypad = keys.map(key => {
      //== set different colors for operator buttons & equality button
      let outerRow = /^(C|\(\)|%|\/|\*|\+|\-)$/.test(key) ? 'outer-row' : '';
      outerRow = /=/.test(key) ? 'equality' : outerRow;

      return (
        <div key={key}
          className={`keypad-key ${outerRow}`}
          onClick={(event) => this.handleMouseAndTouch(event, parsedInput, key)}
          data-key={key}
          data-rippleEffect="button">
          {key}
        </div>
      )});

    //== listen for keyboard input
    window.addEventListener('keyup', this.handleKeyboard);

    return (
      <div className='keypad'>
        <div className='keypad-additional'>
          <span
            onClick={() => this.props.handleInput(parsedInput, 'delete')}
            className='glyphicon glyphicon-arrow-left padding keypad-delete'
            value='delete'></span>
        </div>
        <div className='keypad-main'>
          { keypad }
        </div>
      </div>
    );
  }
}

CalculatorKeypad.propTypes = {
  handleInput: PropTypes.func,
  parsedInput: PropTypes.string
}

function mapStateToProps(state) {
  return { parsedInput: state.input.parsed }
}

export default connect(mapStateToProps, actions)(CalculatorKeypad);
