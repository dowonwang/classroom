import { AuthLogEventMessage } from './auth-log-event';

export const AUTH_LOG_MESSAGE: AuthLogEventMessage = {
  AUTH_MISSING_JWT_TOKEN_SECRET:
    'Missing required environment variable: JWT_SECRET',
  AUTH_MISSING_JWT_TOKEN_EXPIRES:
    'Missing required environment variable: JWT_EXPIRES',
} as const;
