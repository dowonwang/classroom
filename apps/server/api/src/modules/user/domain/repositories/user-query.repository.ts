import { UserDetailDto } from '../../application/dto/user-detail.dto';

export interface UserQueryRepository {
  findByUUID(uuid: string): Promise<UserDetailDto | null>;
}
