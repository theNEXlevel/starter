import { createFeatureSelector } from '@ngrx/store';
import { UserEntity } from '@starter/api-interfaces';

export const selectUser = createFeatureSelector<Partial<UserEntity>>('user');
