import { UserDetailDto } from '../../application/dto/user-detail.dto';
import { UserQueryRepository } from '../../domain/repositories/user-query.repository';
import { UserDtoMapper } from '../mappers/user-dto.mapper';
import { PrismaClient } from '@packages/api-db';

export class PrismaUserQueryRepository implements UserQueryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByUUID(uuid: string): Promise<UserDetailDto | null> {
    const record = await this.prisma.user.findUnique({
      where: {
        uuid,
      },
    });

    return record ? UserDtoMapper.toDetailDto(record) : null;
  }
}
