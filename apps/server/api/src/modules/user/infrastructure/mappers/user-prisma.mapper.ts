import { User } from '$modules/user/domain/entities/user.entity';
import { UserEmail } from '$modules/user/domain/value-objects/email.vo';
import { UserName } from '$modules/user/domain/value-objects/name.vo';
import { UserPassword } from '$modules/user/domain/value-objects/password.vo';
import { UserUUID } from '$modules/user/domain/value-objects/uuid.vo';

import type { User as PrismaUser } from '@packages/api-db';

export const UserPrismaMapper = {
  toDomain(record: PrismaUser): User {
    return User.create({
      ...record,
      email: UserEmail.create(record.email),
      password: UserPassword.fromHashed(record.password),
      name: UserName.create(record.name),
      uuid: UserUUID.create(record.uuid),
    });
  },
} as const;
