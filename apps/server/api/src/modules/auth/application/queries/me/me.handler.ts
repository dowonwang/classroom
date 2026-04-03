import { UserDetailDto } from '../../../../user/application/dto/user-detail.dto';
import { UserNotFound } from '../../../../user/application/errors/user-not-found.error';
import { UserDtoMapper } from '../../../../user/application/mappper/user-dto.mapper';
import { UserQueryRepository } from '../../../../user/domain/repositories/user-query.repository';
import { UserUUID } from '../../../../user/domain/value-objects/uuid.vo';
import { MeQuery } from './me.query';

export class MeHandler {
  constructor(private readonly userQueryRepository: UserQueryRepository) {}

  async excute(query: MeQuery): Promise<UserDetailDto> {
    const uuid = UserUUID.create(query.uuid);

    const user = await this.userQueryRepository.findByUUID(uuid.getValue());

    if (!user) {
      throw new UserNotFound(MeHandler.name);
    }

    return UserDtoMapper.fromEntity(user);
  }
}
