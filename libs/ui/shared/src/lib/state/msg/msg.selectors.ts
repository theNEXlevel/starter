import { createFeatureSelector } from '@ngrx/store';
import { Error } from '@starter/interfaces';

export const selectMsg = createFeatureSelector<Partial<Error>>('msg');
