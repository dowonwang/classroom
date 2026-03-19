import { ZodErrorMapper } from '../../../../shared/http/mapper/zod-error.mapper';
import z from 'zod';

const emailSchema = z.object({
  email: z.email(),
});

export class Email {
  private constructor(private readonly value: string) {}

  static create(input: string): Email {
    const vaildation = emailSchema.safeParse({
      email: input,
    });

    if (vaildation.error) {
      throw ZodErrorMapper(vaildation.error, Email.name);
    }

    return new Email(vaildation.data.email);
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  getValue(): string {
    return this.value;
  }
}
