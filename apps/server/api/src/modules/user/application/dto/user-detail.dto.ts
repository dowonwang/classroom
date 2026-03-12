import { User } from '@packages/api-db';

export type UserDetailDto = Omit<User, 'id' | 'password'>;
