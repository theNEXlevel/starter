import { createAction, props } from '@ngrx/store';
import { UserEntity } from '@starter/api-interfaces';

const userStart = '[User]';

export const loginUser = createAction(`${userStart} Login`, props<{ user: UserEntity }>());
export const logoutUser = createAction(`${userStart} Logout`);
