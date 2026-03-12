import z from 'zod';

const passewordHashSchema = z
  .string()
  .trim()
  .regex(/^\$2[ayb]\$[0-9]{2}\$[./A-Za-z0-9]{53}$/);

export class Password {
  private constructor(private readonly hashedPassword: string) {}

  static fromHashed(hashed: string) {
    const normalized = passewordHashSchema.parse(hashed);
    return new Password(normalized);
  }

  getValue(): string {
    return this.hashedPassword;
  }
}
