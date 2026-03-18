import { LogEventMessage } from './log-event';

export const LOG_MESSAGE: LogEventMessage = {
  HTTP_REQUEST_RECEIVED: 'Request received',
  HTTP_REQUEST_COMPLETED: 'Request completed',
  HTTP_REQUEST_FAILED: 'Request failed',

  HTTP_BAD_REQUEST: 'Bad request',
  HTTP_UNAUTHORIZED: 'Unauthorized',
  HTTP_FORBIDDEN: 'Forbidden',
  HTTP_NOT_FOUND: 'Resource not found',
  HTTP_CONFLICT: 'Resource conflict',
  HTTP_UNPROCESSABLE_CONTENT: 'Unprocessable Content',
  HTTP_INTERNAL_SERVER_ERROR: 'Internal server error',

  APP_START: 'REST API server is running at',
  APP_ERROR_OCCURRED: 'Application error occured',
  APP_UNHANDLED_EXCEPTION: 'Unhandled exception occurred',
} as const;
