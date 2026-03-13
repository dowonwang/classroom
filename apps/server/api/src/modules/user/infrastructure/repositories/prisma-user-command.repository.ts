import { User } from '../../domain/entities/user.entity';
import { UserCommandRepository } from '../../domain/repositories/user-command.repository';
import { UserPrismaMapper } from '../mappers/user-prisma.mapper';
import { PrismaClient } from '@packages/api-db';

export class PrismaUserCommandRepository implements UserCommandRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByUuid(uuid: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({
      where: {
        uuid,
      },
    });

    return record ? UserPrismaMapper.toDomain(record) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const record = await this.prisma.user.findFirst({
      where: { email },
    });

    return record ? UserPrismaMapper.toDomain(record) : null;
  }

  async save(user: User): Promise<void> {
    const data = {
      uuid: user.uuid,
      email: user.email.getValue(),
      name: user.name.getValue(),
      role: user.role,
      password: user.password.getValue(),
    };

    if (user.id) {
      await this.prisma.user.update({
        where: { id: user.id },
        data,
      });

      return;
    }

    await this.prisma.user.create({ data });
  }
}
