import { User } from '../entities/user.entity';

export interface UserQueryRepository {
  findByUUID(uuid: string): Promise<User | null>;
}
