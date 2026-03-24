import { User } from '../entities/user.entity';

export interface UserCommandRepository {
  findById(id: bigint): Promise<User | null>;
  existsByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
