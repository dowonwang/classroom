import { User } from '../../domain/entities/user.entity';
import { UserEmail } from '../../domain/value-objects/email.vo';
import { UserName } from '../../domain/value-objects/name.vo';
import { UserPassword } from '../../domain/value-objects/password.vo';
import { UserUUID } from '../../domain/value-objects/uuid.vo';
import { User as PrismaUser } from '@packages/api-db';

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
