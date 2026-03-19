export const USER_LOG_EVENT = {
  USER_EMAIL_ALREADY_EXIST: 'user.email_already_exist',
} as const;

export type UserLogEventMessage = Record<keyof typeof USER_LOG_EVENT, string>;
