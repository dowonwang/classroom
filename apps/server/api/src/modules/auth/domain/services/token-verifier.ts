import { AccessTokenPayload } from './token-issuer';

export interface TokenVerifier {
  verifyAccessToken(token: string): Promise<AccessTokenPayload>;
}
