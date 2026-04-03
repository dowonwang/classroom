export const AUTH_LOG_EVENT = {
  AUTH_INVAILD_ACCESS_TOKEN_CLAIMS: 'auth.invaild_access_token_claims',
} as const;

export type AuthLogEventMessage = Record<keyof typeof AUTH_LOG_EVENT, string>;
