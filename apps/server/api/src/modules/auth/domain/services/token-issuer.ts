export type AccessTokenPayload = {
  sub: string;
};

export interface TokenIssuer {
  issueAccessToken(payload: AccessTokenPayload): Promise<string>;
}
