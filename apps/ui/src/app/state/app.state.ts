import { ErrorEntity, UserEntity } from '@starter/api-interfaces';

export interface AppState {
  user: Partial<UserEntity>;
  msg: Partial<ErrorEntity>;
}
