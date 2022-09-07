import { createAction, props } from '@ngrx/store';
import { ErrorUI, LoginUI, UserUI } from '@starter/api-interfaces';

const userStart = '[User]';
const userApiStart = '[User API]';

export const loginRequest = createAction(`${userStart} Login Request`, props<{ user: LoginUI }>());
export const loginSuccess = createAction(`${userApiStart} Login Success`, props<{ user: UserUI }>());
export const loginError = createAction(`${userApiStart} Login Error`, props<{ error: ErrorUI }>());
export const registerRequest = createAction(`${userStart} Register Request`, props<{ user: LoginUI }>());
export const registerSuccess = createAction(`${userApiStart} Register Success`, props<{ user: UserUI }>());
export const registerError = createAction(`${userApiStart} Register Error`, props<{ error: ErrorUI }>());
export const logoutUser = createAction(`${userStart} Logout`);
