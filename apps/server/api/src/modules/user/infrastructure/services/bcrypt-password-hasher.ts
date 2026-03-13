import { PasswordHasher } from '../../domain/services/password-hasher';
import bcrypt from 'bcrypt';

export class BcryptPasswordHasher implements PasswordHasher {
  async hash(rawPassword: string): Promise<string> {
    return bcrypt.hash(rawPassword, 10);
  }

  async compare(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, hashedPassword);
  }
}
