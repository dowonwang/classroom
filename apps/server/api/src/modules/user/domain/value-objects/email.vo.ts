import z from 'zod';

const emailSchema = z.string().trim().toLowerCase().pipe(z.email());

export class Email {
  private constructor(private readonly value: string) {}

  static create(input: string): Email {
    const normalized = emailSchema.parse(input);
    return new Email(normalized);
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  getValue(): string {
    return this.value;
  }
}
