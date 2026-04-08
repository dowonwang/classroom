import type { AccessTokenClaims } from '$modules/auth/domain/value-objects/access-token-claims.vo';

export interface TokenIssuer {
  issueAccessToken(claims: AccessTokenClaims): Promise<string>;
}
