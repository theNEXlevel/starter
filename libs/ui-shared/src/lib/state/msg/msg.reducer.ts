import { createReducer, on } from '@ngrx/store';

import { Error } from '@starter/api-interfaces';
import { showMsg } from './msg.actions';

const initialState: Partial<Error> = {};

export const msgReducer = createReducer(
  initialState,
  on(showMsg, (state, payload) => payload.msg)
);
