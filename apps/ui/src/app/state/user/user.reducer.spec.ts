import { loginError, loginSuccess, logoutUser, registerError, registerSuccess, toggleDarkMode } from './user.actions';
import { userReducer } from './user.reducer';

const initialState = {
  user: {},
  msg: {},
  darkMode: false,
};

describe('Reducer: User', () => {
  it('- loginSuccess', () => {
    expect(userReducer(undefined, loginSuccess)).toEqual({ user: undefined, msg: {}, darkMode: false });
  });
  it('- loginError', () => {
    expect(userReducer(undefined, loginError)).toEqual({ user: {}, msg: undefined, darkMode: false });
  });
  it('- registerSuccess', () => {
    expect(userReducer(undefined, registerSuccess)).toEqual({ user: undefined, msg: {}, darkMode: false });
  });
  it('- registerError', () => {
    expect(userReducer(undefined, registerError)).toEqual({ user: {}, msg: undefined, darkMode: false });
  });
  it('- logoutUser', () => {
    expect(userReducer(undefined, logoutUser)).toEqual(initialState);
  });
  it('- toggleDarkMode', () => {
    expect(userReducer(undefined, toggleDarkMode)).toEqual({ user: {}, msg: {}, darkMode: true });
  });
});
