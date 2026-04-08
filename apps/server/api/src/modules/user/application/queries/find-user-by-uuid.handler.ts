import { UserDtoMapper } from '$modules/user/application/mapper/user-dto.mapper';

import type { UserDetailDto } from '$modules/user/application/dto/user-detail.dto';
import type { UserQueryRepository } from '$modules/user/domain/repositories/user-query.repository';
import type { FindUserByUuidQuery } from './find-user-by-uuid.query';

export class FindUserByUuidHandler {
  constructor(private readonly userQueryRepository: UserQueryRepository) {}

  async execute(query: FindUserByUuidQuery): Promise<UserDetailDto | null> {
    const user = await this.userQueryRepository.findByUUID(query.uuid);

    return user ? UserDtoMapper.fromEntity(user) : null;
  }
}
