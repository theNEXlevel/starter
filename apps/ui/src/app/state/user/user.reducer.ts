import { createReducer, on } from '@ngrx/store';

import { ErrorUI, UserUI } from '@starter/api-interfaces';
import { loginError, loginSuccess, logoutUser, registerError, registerSuccess } from './user.actions';

export interface UserState {
  user: Partial<UserUI>;
  msg: Partial<ErrorUI>;
}

const initialState: UserState = {
  user: {},
  msg: {},
};

export const userReducer = createReducer(
  initialState,
  on(loginSuccess, (state, payload) => {
    return { ...state, user: payload.user, msg: {} };
  }),
  on(loginError, (state, payload) => {
    return { ...state, msg: payload.error };
  }),
  on(registerSuccess, (state, payload) => {
    return { ...state, user: payload.user, msg: {} };
  }),
  on(registerError, (state, payload) => {
    return { ...state, msg: payload.error };
  }),
  on(logoutUser, () => initialState)
);
