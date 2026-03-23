import { UserRole } from '../../../domain/entities/user.entity';

export type CreateUserCommand = {
  email: string;
  name: string;
  password: string;
  role: UserRole;
};
