import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

export class CalculatorDisplay extends Component {
  render() {
    const { display, result } = this.props;

    function prepareDisplay(input) {
      if (input) {
        const inputToArray = Array.prototype.slice.call(display);
        let size;

        if (input.length < 13) {
          size = 'size-large';
        } else if (input.length < 17) {
          size = 'size-medium';
        } else {
          size = 'size-small';
        }

        return (
          <div className={size}>
            {
              inputToArray.map((char, index) => {
                if (/[\/\+\-\*]/.test(char)) {
                  return <span key={char+index} className='operator'>{char}</span>
                } else {
                  return char;
                }
              })
            }
          </div>
        );
      }
    }

    return (
      <div className="display" data-rippleEffect="display">
        <div className="display-input padding">{prepareDisplay(display)}</div>
        <div className="display-result padding">{result}</div>
      </div>
    );
  }
}

CalculatorDisplay.propTypes = {
  display: PropTypes.string,
  result: PropTypes.string
}

function mapStateToProps(state) {
  return {
    display: state.input.display,
    result: state.input.result
  }
}

export default connect(mapStateToProps)(CalculatorDisplay);
