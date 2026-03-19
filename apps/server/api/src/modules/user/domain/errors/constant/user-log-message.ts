import { UserLogEventMessage } from './user-log-event';

export const USER_LOG_MESSAGE: UserLogEventMessage = {
  USER_EMAIL_ALREADY_EXIST: 'User with this email already exists',
} as const;
