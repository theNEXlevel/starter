import { InjectionToken } from '@angular/core';
import { Environment } from './ui-interfaces';

export const ENV = new InjectionToken<Environment>('ENV');
