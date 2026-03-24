import { UserQueryRepository } from '../../domain/repositories/user-query.repository';
import { UserDetailDto } from '../dto/user-detail.dto';
import { FindUserByUuidQuery } from './find-user-by-uuid.query';

export class FindUserByUuidHandler {
  constructor(private readonly userQueryRepository: UserQueryRepository) {}

  async execute(query: FindUserByUuidQuery): Promise<UserDetailDto | null> {
    return this.userQueryRepository.findByUUID(query.uuid);
  }
}
