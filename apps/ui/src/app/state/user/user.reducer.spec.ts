import { loginError, loginSuccess, logoutUser, registerError, registerSuccess } from './user.actions';
import { userReducer } from './user.reducer';

const initialState = {
  user: {},
  msg: {},
};

describe('Reducer: User', () => {
  it('- loginSuccess', () => {
    expect(userReducer(undefined, loginSuccess)).toEqual({ user: undefined, msg: {} });
  });
  it('- loginError', () => {
    expect(userReducer(undefined, loginError)).toEqual({ user: {}, msg: undefined });
  });
  it('- registerSuccess', () => {
    expect(userReducer(undefined, registerSuccess)).toEqual({ user: undefined, msg: {} });
  });
  it('- registerError', () => {
    expect(userReducer(undefined, registerError)).toEqual({ user: {}, msg: undefined });
  });
  it('- logoutUser', () => {
    expect(userReducer(undefined, logoutUser)).toEqual(initialState);
  });
});
