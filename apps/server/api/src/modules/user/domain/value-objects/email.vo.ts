import { ZodErrorMapper } from '../../../../shared/http/mapper/zod-error.mapper';
import z from 'zod';

const emailSchema = z.object({
  email: z.email(),
});

export class UserEmail {
  private constructor(private readonly value: string) {}

  static create(input: string): UserEmail {
    const vaildation = emailSchema.safeParse({
      email: input,
    });

    if (!vaildation.success) {
      throw ZodErrorMapper(vaildation.error, UserEmail.name);
    }

    return new UserEmail(vaildation.data.email);
  }

  equals(other: UserEmail): boolean {
    return this.value === other.value;
  }

  getValue(): string {
    return this.value;
  }
}
