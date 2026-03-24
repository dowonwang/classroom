import { ZodErrorMapper } from '../../../../shared/http/mapper/zod-error.mapper';
import z from 'zod';

const nameSchema = z.object({
  name: z.string().min(1).max(20),
});

export class UserName {
  private constructor(private readonly value: string) {}

  static create(input: string): UserName {
    const vaildation = nameSchema.safeParse({ name: input });

    if (!vaildation.success) {
      throw ZodErrorMapper(vaildation.error, UserName.name);
    }

    return new UserName(vaildation.data.name);
  }

  equals(other: UserName): boolean {
    return this.value === other.value;
  }

  getValue(): string {
    return this.value;
  }
}
