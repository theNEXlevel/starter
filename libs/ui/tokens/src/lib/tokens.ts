import { InjectionToken } from '@angular/core';
import { Environment } from '@starter/interfaces';

export const ENV = new InjectionToken<Environment>('ENV');
