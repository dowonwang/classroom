export const USER_LOG_EVENT = {
  USER_NOT_FOUND: 'user.not_found',
} as const;

export type UserLogEventMessage = Record<keyof typeof USER_LOG_EVENT, string>;
