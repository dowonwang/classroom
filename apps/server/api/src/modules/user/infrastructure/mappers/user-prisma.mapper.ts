import { User } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { UserName } from '../../domain/value-objects/name.vo';
import { Password } from '../../domain/value-objects/password.vo';
import { User as PrismaUser } from '@packages/api-db';

export class UserPrismaMapper {
  static toDomain(record: PrismaUser): User {
    return User.create({
      ...record,
      email: Email.create(record.email),
      password: Password.fromHashed(record.password),
      name: UserName.create(record.name),
    });
  }
}
