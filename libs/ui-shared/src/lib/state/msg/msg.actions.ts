import { createAction, props } from '@ngrx/store';
import { Error } from '@starter/api-interfaces';

const start = '[Msg]';

export const showMsg = createAction(`${start} Show`, props<{ msg: Partial<Error> }>());
