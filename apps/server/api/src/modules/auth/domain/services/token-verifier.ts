import type { AccessTokenClaims } from '$modules/auth/domain/value-objects/access-token-claims.vo';

export interface TokenVerifier {
  verifyAccessToken(token: string): Promise<AccessTokenClaims>;
}
