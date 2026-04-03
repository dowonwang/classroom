import { User } from '../../domain/entities/user.entity';
import { UserTimeStampsRequired } from '../../domain/errors/user-timestamps-required.error';
import { UserDetailDto } from '../dto/user-detail.dto';

export class UserDtoMapper {
  static fromEntity(entity: User): UserDetailDto {
    if (!(entity.createdAt && entity.updatedAt)) {
      throw new UserTimeStampsRequired(UserDtoMapper.name);
    }

    return {
      uuid: entity.uuid.getValue(),
      email: entity.email.getValue(),
      name: entity.name.getValue(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
