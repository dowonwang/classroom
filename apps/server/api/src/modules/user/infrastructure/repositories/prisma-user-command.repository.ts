import { UserPrismaMapper } from '$modules/user/infrastructure/mappers/user-prisma.mapper';

import type { User } from '$modules/user/domain/entities/user.entity';
import type { UserCommandRepository } from '$modules/user/domain/repositories/user-command.repository';
import type { PrismaClient } from '@packages/api-db';

export class PrismaUserCommandRepository implements UserCommandRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({ where: { id } });

    return record ? UserPrismaMapper.toDomain(record) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({
      where: { email },
    });

    return record ? UserPrismaMapper.toDomain(record) : null;
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id.getValue() },
      create: {
        id: user.id.getValue(),
        email: user.email.getValue(),
        name: user.name.getValue(),
        password: user.password.getValue(),
      },
      update: {
        email: user.email.getValue(),
        name: user.name.getValue(),
        password: user.password.getValue(),
      },
    });
  }
}
