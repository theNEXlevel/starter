import { createFeatureSelector } from '@ngrx/store';
import { ErrorEntity } from '@starter/api-interfaces';

export const selectMsg = createFeatureSelector<Partial<ErrorEntity>>('msg');
