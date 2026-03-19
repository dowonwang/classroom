import { LOG_EVENT } from '../logger/constant/log-event';
import { LOG_MESSAGE } from '../logger/constant/log-message';
import { AppError } from './app.error';

export class BadRequestError extends AppError {
  constructor(
    event: string = LOG_EVENT.HTTP_BAD_REQUEST,
    message: string = LOG_MESSAGE.HTTP_BAD_REQUEST,
    userMessage: string = '잘못된 요청입니다.',
    scope?: string,
    details?: unknown,
  ) {
    super({
      event,
      status: 400,
      message,
      userMessage,
      details,
      scope,
    });
  }
}

export class UnauthorizedError extends AppError {
  constructor(
    event: string = LOG_EVENT.HTTP_UNAUTHORIZED,
    message: string = LOG_MESSAGE.HTTP_UNAUTHORIZED,
    userMessage: string = '인증이 필요합니다.',
    scope?: string,
    details?: unknown,
  ) {
    super({
      event,
      status: 401,
      userMessage,
      message,
      details,
      scope,
    });
  }
}

export class ForbiddenError extends AppError {
  constructor(
    event: string = LOG_EVENT.HTTP_FORBIDDEN,
    message: string = LOG_MESSAGE.HTTP_FORBIDDEN,
    userMessage: string = '접근 권한이 없습니다.',
    scope?: string,
    details?: unknown,
  ) {
    super({
      event,
      status: 403,
      userMessage,
      message,
      details,
      scope,
    });
  }
}

export class NotFoundError extends AppError {
  constructor(
    event: string = LOG_EVENT.HTTP_NOT_FOUND,
    message: string = LOG_MESSAGE.HTTP_NOT_FOUND,
    userMessage: string = '요청한 리소스를 찾을 수 없습니다.',
    scope?: string,
    details?: unknown,
  ) {
    super({
      event,
      status: 404,
      userMessage,
      message,
      details,
      scope,
    });
  }
}

export class ConflictError extends AppError {
  constructor(
    event: string = LOG_EVENT.HTTP_CONFLICT,
    message: string = LOG_MESSAGE.HTTP_CONFLICT,
    userMessage: string = '이미 존재하는 데이터입니다.',
    scope?: string,
    details?: unknown,
  ) {
    super({
      event,
      status: 409,
      userMessage,
      message,
      details,
      scope,
    });
  }
}

export class UnprocessableContent extends AppError {
  constructor(
    event: string = LOG_EVENT.HTTP_UNPROCESSABLE_CONTENT,
    message: string = LOG_MESSAGE.HTTP_UNPROCESSABLE_CONTENT,
    userMessage: string = '유효성 검사 실패',
    scope?: string,
    details?: unknown,
  ) {
    super({
      event,
      status: 422,
      userMessage,
      message,
      details,
      scope,
    });
  }
}

export class InternalServerError extends AppError {
  constructor(
    event: string = LOG_EVENT.HTTP_INTERNAL_SERVER_ERROR,
    message: string = LOG_MESSAGE.HTTP_INTERNAL_SERVER_ERROR,
    userMessage: string = '일시적인 오류가 발생했습니다.',
    scope?: string,
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
      scope,
    });
  }
}
