import { User } from '../entities/user.entity';

export interface UserCommandRepository {
  findByUuid(uuid: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
