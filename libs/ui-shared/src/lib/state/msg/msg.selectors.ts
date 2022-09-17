import { createFeatureSelector } from '@ngrx/store';
import { Error } from '@starter/api-interfaces';

export const selectMsg = createFeatureSelector<Partial<Error>>('msg');
