import { Injectable } from '@angular/core';
import { createStore, select, setProp, withProps } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { UserApp } from '@starter/api-interfaces';

export interface UserProps {
  user?: UserApp;
}

export const store = createStore({ name: 'user' }, withProps<UserProps>({}));

export const persist = persistState(store, {
  key: 'user',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class UserRepository {
  user$ = store.pipe(select((user) => user));
  user = store.getValue();

  setUser(user: UserApp) {
    store.update(setProp('user', user));
  }

  resetUser() {
    store.update(setProp('user', undefined));
  }
}
