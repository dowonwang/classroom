import { AppError } from '../errors/app.error';
import { LOG_EVENT } from '../logger/constant/log-event';
import { LOG_MESSAGE } from '../logger/constant/log-message';
import { logger } from '../logger/logger';
import { ApiResponseBuilder } from '../responses/api-response-builder';
import { randomUUIDv7 } from 'bun';
import Elysia from 'elysia';

export const errorPlugin = new Elysia().onError(
  { as: 'scoped' },
  ({ set, error, request, path }) => {
    const uuid = randomUUIDv7();
    const searchParams = Object.fromEntries(new URL(request.url).searchParams);

    if (error instanceof AppError) {
      logger.warn(
        {
          event: error.event,
          requestId: uuid,
          method: request.method,
          path,
          searchParams,
          status: error.status,
          details: error.details,
        },
        error.message,
      );

      set.status = error.status;

      return ApiResponseBuilder.error({
        message: error.userMessage,
        requestId: uuid,
      });
    }

    set.status = 500;

    logger.warn(
      {
        event: LOG_EVENT.APP_ERROR_OCCURRED,
        requestId: uuid,
        method: request.method,
        path,
        searchParams,
        status: set.status,
      },
      (error as any)?.message || LOG_MESSAGE.APP_ERROR_OCCURRED,
    );

    return ApiResponseBuilder.error({
      message: '일시적인 오류가 발생했습니다.',
      requestId: uuid,
    });
  },
);
