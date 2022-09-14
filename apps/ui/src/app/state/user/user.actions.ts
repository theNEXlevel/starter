import { createAction, props } from '@ngrx/store';
import { Error, Login, User } from '@starter/api-interfaces';

const userStart = '[User]';
const userApiStart = '[User API]';

export const loginRequest = createAction(`${userStart} Login Request`, props<{ user: Login }>());
export const loginSuccess = createAction(`${userApiStart} Login Success`, props<{ user: User }>());
export const loginError = createAction(`${userApiStart} Login Error`, props<{ error: Error }>());
export const registerRequest = createAction(`${userStart} Register Request`, props<{ user: Login }>());
export const registerSuccess = createAction(`${userApiStart} Register Success`, props<{ user: User }>());
export const registerError = createAction(`${userApiStart} Register Error`, props<{ error: Error }>());
export const logoutUser = createAction(`${userStart} Logout`);
export const toggleDarkMode = createAction(`${userStart} Toggle Dark Mode`);
