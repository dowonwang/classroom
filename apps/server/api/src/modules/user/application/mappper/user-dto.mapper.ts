import { User } from '../../domain/entities/user.entity';
import { UserTimeStampsRequired } from '../../domain/errors/user-timestamps-required.error';
import { UserDetailDto } from '../dto/user-detail.dto';

const name = Symbol('UserDtoMapper');

export const UserDtoMapper = {
  fromEntity(entity: User): UserDetailDto {
    if (!(entity.createdAt && entity.updatedAt)) {
      throw new UserTimeStampsRequired(name.toString());
    }

    return {
      uuid: entity.uuid.getValue(),
      email: entity.email.getValue(),
      name: entity.name.getValue(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  },
} as const;
