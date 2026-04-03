import { User } from '../../domain/entities/user.entity';
import { UserQueryRepository } from '../../domain/repositories/user-query.repository';
import { UserEntityMapper } from '../mappers/user-entity.mapper';
import { PrismaClient } from '@packages/api-db';

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
