import type { User } from '$modules/user/domain/entities/user.entity';

export interface UserQueryRepository {
  findById(id: string): Promise<User | null>;
}
