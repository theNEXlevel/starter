import { createFeatureSelector } from '@ngrx/store';
import { ErrorUI } from '@starter/api-interfaces';

export const selectMsg = createFeatureSelector<Partial<ErrorUI>>('msg');
