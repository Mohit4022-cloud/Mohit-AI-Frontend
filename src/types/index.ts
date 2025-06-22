export * from './auth';
export * from './call';
export * from './contact';
export * from './calendar';
export * from './email';
export * from './settings';
export * from './transcript';
export * from './advanced';
export * from './reports';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}