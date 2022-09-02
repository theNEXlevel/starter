import { createReducer, on } from '@ngrx/store';

import { UserEntity } from '@starter/api-interfaces';
import { loginUser, logoutUser } from './user.actions';

const initialState: Partial<UserEntity> = {};

export const userReducer = createReducer(
  initialState,
  on(loginUser, (state, payload) => payload.user),
  on(logoutUser, (state) => state)
);
