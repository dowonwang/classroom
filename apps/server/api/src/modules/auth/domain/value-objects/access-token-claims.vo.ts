import { InvalidAccessTokenClaims } from '../errors/invalid-access-token-claims.error';
import z from 'zod';

const payloadSchema = z.object({
  sub: z.uuidv7(),
});

type AccessTokenPayload = z.infer<typeof payloadSchema>;

export class AccessTokenClaims {
  private constructor(private readonly payload: AccessTokenPayload) {}

  static create(payload: AccessTokenPayload | unknown): AccessTokenClaims {
    try {
      const vaildated = payloadSchema.parse(payload);

      return new AccessTokenClaims(vaildated);
    } catch (error) {
      throw new InvalidAccessTokenClaims(AccessTokenClaims.name);
    }
  }

  getSubject(): string {
    return this.payload.sub;
  }

  toPrimitives(): AccessTokenPayload {
    return this.payload;
  }
}
