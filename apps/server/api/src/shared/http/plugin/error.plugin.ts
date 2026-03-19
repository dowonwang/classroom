import { AppError } from '../../errors/app.error';
import { UnprocessableContent } from '../../errors/common.erorr';
import { LOG_EVENT } from '../../logger/constant/log-event';
import { LOG_MESSAGE } from '../../logger/constant/log-message';
import { logger } from '../../logger/logger';
import { ApiResponseBuilder } from '../../responses/api-response-builder';
import { getRouteLogScope } from '../constants/route-log-scope';
import { VaildationErrorMapper } from '../mapper/vaildation-error.mapper';
import { randomUUIDv7 } from 'bun';
import Elysia, { ValidationError } from 'elysia';

export const errorPlugin = new Elysia().onError(
  { as: 'scoped' },
  ({ set, error, request, path }) => {
    const uuid = randomUUIDv7();
    const searchParams = Object.fromEntries(new URL(request.url).searchParams);

    if (error instanceof ValidationError) {
      const appError = VaildationErrorMapper(error);
      const scope = getRouteLogScope(path);

      set.status = appError.status;

      logger.error(
        {
          event: appError.event,
          requestId: uuid,
          method: request.method,
          path,
          searchParams,
          status: appError.status,
          details: appError.details,
          scope,
        },
        appError.message,
      );

      return ApiResponseBuilder.error({
        message: appError.userMessage,
        requestId: uuid,
        details: appError.details,
      });
    }

    if (error instanceof AppError) {
      set.status = error.status;

      if (error instanceof UnprocessableContent) {
        return ApiResponseBuilder.error({
          message: error.userMessage,
          details: error.details,
          requestId: uuid,
        });
      }

      logger.error(
        {
          event: error.event,
          requestId: uuid,
          method: request.method,
          path,
          searchParams,
          status: error.status,
          details: error.details,
          scope: error.scope || 'APP',
        },
        error.message,
      );

      return ApiResponseBuilder.error({
        message: error.userMessage,
        requestId: uuid,
      });
    }

    set.status = 500;

    logger.error(
      {
        event: LOG_EVENT.APP_ERROR_OCCURRED,
        requestId: uuid,
        method: request.method,
        path,
        searchParams,
        status: set.status,
        err: error,
      },
      (error as any)?.message || LOG_MESSAGE.APP_ERROR_OCCURRED,
    );

    return ApiResponseBuilder.error({
      message: '일시적인 오류가 발생했습니다.',
      requestId: uuid,
    });
  },
);
