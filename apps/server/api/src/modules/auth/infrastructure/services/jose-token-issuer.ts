import {
  AccessTokenPayload,
  TokenIssuer,
} from '../../domain/services/token-issuer';
import { MissingJwtExpires } from '../errors/missing-jwt-expires.error';
import { MissingJwtSecret } from '../errors/missing-jwt-secret.error';
import { SignJWT } from 'jose';

export class JoseTokenIssuer implements TokenIssuer {
  public readonly issueAccessToken: (
    payload: AccessTokenPayload,
  ) => Promise<string>;

  constructor(
    secret: string | null | undefined,
    expiresIn: string | null | undefined,
    private readonly alg: string = 'HS256',
  ) {
    if (!secret) {
      throw new MissingJwtSecret(JoseTokenIssuer.name);
    }

    if (!expiresIn) {
      throw new MissingJwtExpires(JoseTokenIssuer.name);
    }

    const secretBuffer = new TextEncoder().encode(secret);

    // 클로저 사용해서 민감한 내용 접근 방지
    this.issueAccessToken = async (payload) => {
      return await new SignJWT(payload)
        .setProtectedHeader({ alg: this.alg })
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(secretBuffer);
    };

    Object.freeze(this);
  }
}
