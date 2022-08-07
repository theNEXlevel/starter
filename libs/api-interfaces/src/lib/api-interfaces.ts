import { User } from './prisma'

export interface UserApp extends User {
  accessToken?: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Error {
  error?: string;
  message: string | string[];
  statusCode?: number;
}
