import { loginUser, logoutUser } from './user.actions';
import { userReducer } from './user.reducer';

describe('Reducer: User', () => {
  it('should have initial state of undefined user', () => {
    const expected = undefined;
    expect(userReducer(undefined, loginUser)).toEqual(expected);
  });
  it('should have state as an empty object', () => {
    const expected = {};
    expect(userReducer(undefined, logoutUser)).toEqual(expected);
  });
});
