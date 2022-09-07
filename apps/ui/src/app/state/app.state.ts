import { ErrorUI } from '@starter/api-interfaces';
import { UserState } from './user';

export interface AppState {
  user: UserState;
  msg: Partial<ErrorUI>;
}
