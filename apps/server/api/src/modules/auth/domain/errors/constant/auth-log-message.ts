import type { AuthLogEventMessage } from './auth-log-event';

export const AUTH_LOG_MESSAGE: AuthLogEventMessage = {
  AUTH_INVAILD_ACCESS_TOKEN_CLAIMS: 'Required fields are missing or mismatched',
} as const;
