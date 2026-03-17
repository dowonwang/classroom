export const LOG_EVENT = {
  HTTP_REQUEST_RECEIVED: 'http.request.received',
  HTTP_REQUEST_COMPLETED: 'http.request.completed',
  HTTP_REQUEST_FAILED: 'http.request.failed',

  HTTP_BAD_REQUEST: 'http.request_bad',
  HTTP_UNAUTHORIZED: 'http.unauthorized',
  HTTP_FORBIDDEN: 'http.forbidden',
  HTTP_NOT_FOUND: 'http.not_found',
  HTTP_CONFLICT: 'http.conflict',
  HTTP_INTERNAL_SERVER_ERROR: 'http.internal_server_error',

  APP_START: 'app.start',
  APP_ERROR_OCCURRED: 'app.error.occurred',
  APP_UNHANDLED_EXCEPTION: 'app.unhandled.exception',
} as const;

export type LogEventMessage = Record<keyof typeof LOG_EVENT, string>;
