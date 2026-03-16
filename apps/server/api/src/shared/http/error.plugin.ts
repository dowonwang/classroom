import { AppError } from '../errors/app.error';
import { logger } from '../logger/logger';
import { ApiResponseBuilder } from '../responses/api-response-builder';
import { randomUUIDv7 } from 'bun';
import Elysia from 'elysia';

export const errorPlugin = new Elysia().onError(
  { as: 'scoped' },
  ({ code, set, error, request }) => {
    const uuid = randomUUIDv7();

    if (error instanceof AppError) {
      logger.warn({
        requestId: uuid,
        code: error.code,
        status: error.status,
        message: error.message,
        details: error.details,
        cause: error.cause,
        method: request.method,
        body: request.body,
        path: new URL(request.url).pathname,
        searchParams: Object.fromEntries(new URL(request.url).searchParams),
      });

      set.status = error.status;

      return ApiResponseBuilder.error({
        code: error.code,
        message: error.userMessage,
        requestId: uuid,
      });
    }

    set.status = 500;

    logger.warn({
      requestId: uuid,
      code,
      method: request.method,
      body: request.body,
      path: new URL(request.url).pathname,
      searchParams: Object.fromEntries(new URL(request.url).searchParams),
    });

    return ApiResponseBuilder.error({
      code: 'INTERNAL_SERVER_ERROR',
      message: '일시적인 오류가 발생했습니다.',
      requestId: uuid,
    });
  },
);
