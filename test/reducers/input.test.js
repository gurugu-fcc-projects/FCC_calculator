import inputReducer from '../../src/reducers/input';
import { UPDATE_INPUT } from '../../src/actions/types';

describe('Input Reducer', () => {
  it('handles action with unknown type', () => {
    expect(inputReducer(undefined, {})).toEqual({parsed: '', display: '', result: '', message: ''});
  });
  it('handles action of type UPDATE_INPUT', () => {
    const action = {type: UPDATE_INPUT, payload: { parsed: '12334', display: '12334', result: '12334' }};
    expect(inputReducer({}, action)).toEqual({ parsed: '12334', display: '12334', result: '12334' });
  });
});
