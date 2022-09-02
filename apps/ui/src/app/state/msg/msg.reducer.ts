import { createReducer, on } from '@ngrx/store';

import { ErrorEntity } from '@starter/api-interfaces';
import { showMsg } from './msg.actions';

const initialState: Partial<ErrorEntity> = {};

export const msgReducer = createReducer(
  initialState,
  on(showMsg, (state, payload) => payload.msg)
);
