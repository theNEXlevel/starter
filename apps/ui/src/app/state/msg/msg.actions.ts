import { createAction, props } from '@ngrx/store';
import { ErrorUI } from '@starter/api-interfaces';

const start = '[Msg]';

export const showMsg = createAction(`${start} Show`, props<{ msg: Partial<ErrorUI> }>());
