import { createReducer, on } from '@ngrx/store';

import { ErrorUI } from '@starter/api-interfaces';
import { showMsg } from './msg.actions';

const initialState: Partial<ErrorUI> = {};

export const msgReducer = createReducer(
  initialState,
  on(showMsg, (state, payload) => payload.msg)
);
