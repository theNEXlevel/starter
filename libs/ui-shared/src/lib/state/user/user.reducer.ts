import { createReducer, on } from '@ngrx/store';

import { Error, User } from '@starter/api-interfaces';
import { loginError, loginSuccess, logoutUser, registerError, registerSuccess, toggleDarkMode } from './user.actions';

export interface UserState {
  user: Partial<User>;
  msg: Partial<Error>;
  darkMode: boolean;
}

const initialState: UserState = {
  user: {},
  msg: {},
  darkMode: false,
};

export const userReducer = createReducer(
  initialState,
  on(loginSuccess, (state, payload) => ({ ...state, ...{ user: payload.user, msg: {} } })),
  on(loginError, (state, payload) => ({ ...state, msg: payload.error })),
  on(registerSuccess, (state, payload) => ({ ...state, ...{ user: payload.user, msg: {} } })),
  on(registerError, (state, payload) => ({ ...state, msg: payload.error })),
  on(logoutUser, () => initialState),
  on(toggleDarkMode, (state) => ({ ...state, darkMode: !state.darkMode }))
);
