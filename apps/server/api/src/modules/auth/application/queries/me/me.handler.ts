import { UserNotFound } from '$modules/user/application/errors/user-not-found.error';
import { UserDtoMapper } from '$modules/user/application/mapper/user-dto.mapper';
import { UserUUID } from '$modules/user/domain/value-objects/uuid.vo';

import type { UserDetailDto } from '$modules/user/application/dto/user-detail.dto';
import type { UserQueryRepository } from '$modules/user/domain/repositories/user-query.repository';
import type { MeQuery } from './me.query';

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
