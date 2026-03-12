import { UserDetailDto } from '../../application/dto/user-detail.dto';
import { User as PrismaUser } from '@packages/api-db';

export class UserDtoMapper {
  static toDetailDto(record: PrismaUser): UserDetailDto {
    return {
      uuid: record.uuid,
      email: record.email,
      name: record.name,
      role: record.role,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };
  }
}
