import { Error } from '@starter/interfaces';
import { UserState } from './user';

export interface AppState {
  user: UserState;
  msg: Partial<Error>;
}
