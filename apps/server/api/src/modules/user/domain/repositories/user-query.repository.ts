import { UserDetailDto } from '../../application/dto/user-detail.dto';

export interface UserQueryRepository {
  getByUuid(uuid: string): Promise<UserDetailDto | null>;
}
