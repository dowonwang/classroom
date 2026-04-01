export const AUTH_LOG_EVENT = {
  AUTH_MISSING_JWT_TOKEN_SECRET: 'auth.missing_jwt_token_secret',
  AUTH_MISSING_JWT_TOKEN_EXPIRES: 'auth.missing_jwt_token_expires',
} as const;

export type AuthLogEventMessage = Record<keyof typeof AUTH_LOG_EVENT, string>;
