import { loginRequest, logoutUser } from './user.actions';
import { userReducer } from './user.reducer';

describe('Reducer: User', () => {
  it('should have initial state of undefined user', () => {
    const expected = {
      user: {},
      msg: {},
    };
    expect(userReducer(undefined, loginRequest)).toEqual(expected);
  });
  it('should have state as an empty object', () => {
    const expected = {
      user: {},
      msg: {},
    };
    expect(userReducer(undefined, logoutUser)).toEqual(expected);
  });
});
