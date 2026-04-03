import { AccessTokenClaims } from '../value-objects/access-token-claims.vo';

export interface TokenVerifier {
  verifyAccessToken(token: string): Promise<AccessTokenClaims>;
}
