import { User } from '$modules/user/domain/entities/user.entity';
import { UserEmail } from '$modules/user/domain/value-objects/email.vo';
import { UserName } from '$modules/user/domain/value-objects/name.vo';
import { UserPassword } from '$modules/user/domain/value-objects/password.vo';
import { UserUUID } from '$modules/user/domain/value-objects/uuid.vo';

import type { User as PrismaUser } from '@packages/api-db';

export const UserEntityMapper = {
  fromRecord(record: PrismaUser): User {
    return User.create({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      uuid: UserUUID.create(record.uuid),
      email: UserEmail.create(record.email),
      name: UserName.create(record.name),
      password: UserPassword.fromHashed(record.password),
    });
  },
} as const;
