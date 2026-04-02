import { InvalidAccessTokenClaims } from '../../domain/errors/invalid-access-token-claims.error';
import { TokenVerifier } from '../../domain/services/token-verifier';
import { AccessTokenClaims } from '../../domain/value-objects/access-token-claims.vo';
import { MissingJwtSecret } from '../errors/missing-jwt-secret.error';
import { jwtVerify } from 'jose';

export class JwtTokenVerifier implements TokenVerifier {
  public readonly verifyAccessToken: (
    token: string,
  ) => Promise<AccessTokenClaims>;

  constructor(secret: string | null | undefined) {
    if (!secret) {
      throw new MissingJwtSecret(JwtTokenVerifier.name);
    }

    const secretBuffer = new TextEncoder().encode(secret);

    this.verifyAccessToken = async (token: string) => {
      try {
        const { payload } = await jwtVerify(token, secretBuffer, {
          algorithms: ['HS256'],
        });

        const claims = AccessTokenClaims.create(payload as unknown);

        return claims;
      } catch (error) {
        throw new InvalidAccessTokenClaims(JwtTokenVerifier.name);
      }
    };
  }
}
