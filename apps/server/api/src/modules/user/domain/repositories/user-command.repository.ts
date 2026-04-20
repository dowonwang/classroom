import type { User } from '$modules/user/domain/entities/user.entity';

export interface UserCommandRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
