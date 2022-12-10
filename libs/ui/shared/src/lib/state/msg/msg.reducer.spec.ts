import { showMsg } from './msg.actions';
import { msgReducer } from './msg.reducer';

describe('Reducer: Msg', () => {
  it('should have initial state of undefined msg', () => {
    const expected = undefined;
    expect(msgReducer(undefined, showMsg)).toEqual(expected);
  });
});
