import { InvalidUserUUID } from '../errors/inavalid-user-uuid.error';
import { randomUUIDv7 } from 'bun';
import z from 'zod';

const uuidSchema = z.uuidv7();

export class UserUUID {
  private constructor(private readonly value: string) {}

  static create(input: string) {
    const uuid = this.validation(input);
    return new UserUUID(uuid);
  }

  static generate() {
    return new UserUUID(randomUUIDv7());
  }

  static validation(input: string) {
    const vaildation = uuidSchema.safeParse(input);

    if (!vaildation.success) {
      throw new InvalidUserUUID(UserUUID.name, { input });
    }

    return vaildation.data;
  }

  equals(other: UserUUID): boolean {
    return this.value === other.value;
  }

  getValue(): string {
    return this.value;
  }
}
