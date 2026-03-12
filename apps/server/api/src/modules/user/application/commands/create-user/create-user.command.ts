import { User } from '@packages/api-db';

export type CreateUserCommand = Pick<
  User,
  'email' | 'name' | 'role' | 'password'
>;
