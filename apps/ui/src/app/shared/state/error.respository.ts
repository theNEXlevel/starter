import { Injectable } from '@angular/core';
import { createStore, select, setProp, withProps } from '@ngneat/elf';
import { Error } from '@starter/api-interfaces';

export interface ErrorProps {
  error: Error;
}

const initialState: ErrorProps = {
  error: {
    message: '',
  },
};

export const store = createStore({ name: 'error' }, withProps<ErrorProps>(initialState));

@Injectable({ providedIn: 'root' })
export class ErrorRepository {
  error$ = store.pipe(select((error) => error));
  error = store.getValue();

  setError(error: Error) {
    store.update(setProp('error', error));
  }

  resetError() {
    store.update(setProp('error', initialState.error));
  }
}
