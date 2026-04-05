import { User } from '../../domain/entities/user.entity';
import { UserEmail } from '../../domain/value-objects/email.vo';
import { UserName } from '../../domain/value-objects/name.vo';
import { UserPassword } from '../../domain/value-objects/password.vo';
import { UserUUID } from '../../domain/value-objects/uuid.vo';
import { User as PrismaUser } from '@packages/api-db';

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
