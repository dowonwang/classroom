import { UserRole } from '../../domain/entities/user.entity';

export type UserDetailDto = {
  name: string;
  uuid: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};
