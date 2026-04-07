import { UserEntityMapper } from '$modules/user/infrastructure/mappers/user-entity.mapper';

import type { User } from '$modules/user/domain/entities/user.entity';
import type { UserQueryRepository } from '$modules/user/domain/repositories/user-query.repository';
import type { PrismaClient } from '@packages/api-db';

export class PrismaUserQueryRepository implements UserQueryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByUUID(uuid: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({
      where: {
        uuid,
      },
    });

    return record ? UserEntityMapper.fromRecord(record) : null;
  }
}
