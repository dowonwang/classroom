import { AccessTokenClaims } from '../value-objects/access-token-claims.vo';

export interface TokenIssuer {
  issueAccessToken(claims: AccessTokenClaims): Promise<string>;
}
