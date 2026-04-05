import { PasswordHaser } from '../../domain/services/password-hasher';
import bcrypt from 'bcrypt';

export class BcryptPasswordHasher implements PasswordHaser {
  constructor(private readonly saltRounds = 10) {}

  hash(rawPassword: string): Promise<string> {
    return bcrypt.hash(rawPassword, this.saltRounds);
  }

  compare(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, hashedPassword);
  }
}
