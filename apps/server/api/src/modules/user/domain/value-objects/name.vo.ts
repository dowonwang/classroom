import z from 'zod';

const nameSchema = z.string().trim().min(1).max(20);

export class UserName {
  private constructor(private readonly value: string) {}

  static create(input: string): UserName {
    const normalized = nameSchema.parse(input);
    return new UserName(normalized);
  }

  equals(other: UserName): boolean {
    return this.value === other.value;
  }

  getValue(): string {
    return this.value;
  }
}
