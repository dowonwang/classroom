import { LOG_EVENT } from '../logger/constant/log-event';
import { LOG_MESSAGE } from '../logger/constant/log-message';
import { AppError } from './app.error';

export class BadRequestError extends AppError {
  constructor(
    event = LOG_EVENT.HTTP_BAD_REQUEST,
    message = LOG_MESSAGE.HTTP_BAD_REQUEST,
    userMessage = '잘못된 요청입니다.',
    details?: unknown,
  ) {
    super({
      event,
      status: 400,
      message,
      userMessage,
      details,
    });
  }
}

export class UnauthorizedError extends AppError {
  constructor(
    event = LOG_EVENT.HTTP_UNAUTHORIZED,
    message = LOG_MESSAGE.HTTP_UNAUTHORIZED,
    userMessage = '인증이 필요합니다.',
    details?: unknown,
  ) {
    super({
      event,
      status: 401,
      userMessage,
      message,
      details,
    });
  }
}

export class ForbiddenError extends AppError {
  constructor(
    event = LOG_EVENT.HTTP_FORBIDDEN,
    message = LOG_MESSAGE.HTTP_FORBIDDEN,
    userMessage = '접근 권한이 없습니다.',
    details?: unknown,
  ) {
    super({
      event,
      status: 403,
      userMessage,
      message,
      details,
    });
  }
}

export class NotFoundError extends AppError {
  constructor(
    event = LOG_EVENT.HTTP_NOT_FOUND,
    message = LOG_MESSAGE.HTTP_NOT_FOUND,
    userMessage = '요청한 리소스를 찾을 수 없습니다.',
    details?: unknown,
  ) {
    super({
      event,
      status: 404,
      userMessage,
      message,
      details,
    });
  }
}

export class ConflictError extends AppError {
  constructor(
    event = LOG_EVENT.HTTP_CONFLICT,
    message = LOG_MESSAGE.HTTP_CONFLICT,
    userMessage = '이미 존재하는 데이터입니다.',
    details?: unknown,
  ) {
    super({
      event,
      status: 409,
      userMessage,
      message,
      details,
    });
  }
}

export class InternalServerError extends AppError {
  constructor(
    event = LOG_EVENT.HTTP_INTERNAL_SERVER_ERROR,
    message = LOG_MESSAGE.HTTP_INTERNAL_SERVER_ERROR,
    userMessage = '일시적인 오류가 발생했습니다.',
    details?: unknown,
    cause?: unknown,
  ) {
    super({
      event,
      status: 500,
      userMessage,
      message,
      details,
      cause,
    });
  }
}
