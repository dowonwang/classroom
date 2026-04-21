import { User } from '$modules/user/domain/entities/user.entity';
import { UserEmail } from '$modules/user/domain/value-objects/email.vo';
import { UserName } from '$modules/user/domain/value-objects/name.vo';
import { UserPassword } from '$modules/user/domain/value-objects/password.vo';
import { UserUuid } from '$modules/user/domain/value-objects/uuid.vo';

import type { User as PrismaUser } from '@packages/api-db';

export const UserEntityMapper = {
  fromRecord(record: PrismaUser): User {
    return User.create(UserUuid.create(record.id), {
      email: UserEmail.create(record.email),
      name: UserName.create(record.name),
      password: UserPassword.fromHashed(record.password),
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  },
} as const;
