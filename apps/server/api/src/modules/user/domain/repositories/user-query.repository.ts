import type { User } from '$modules/user/domain/entities/user.entity';

export interface UserQueryRepository {
  findByUUID(uuid: string): Promise<User | null>;
}
