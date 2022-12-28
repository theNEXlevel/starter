import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(selectUserState, (state) => {
  return state.user;
});

export const selectUserMsg = createSelector(selectUserState, (state) => {
  return state.msg;
});

export const selectUserDarkMode = createSelector(selectUserState, (state) => {
  return state.darkMode;
});
