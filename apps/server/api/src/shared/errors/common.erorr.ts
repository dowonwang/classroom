import { LOG_EVENT } from '../logger/constant/log-event';
import { LOG_MESSAGE } from '../logger/constant/log-message';
import { AppError } from './app.error';

interface CommonErrorOptions {
  event?: string;
  message?: string;
  userMessage?: string;
  scope?: string;
  detail?: unknown;
  cause?: unknown;
}

export class BadRequestError extends AppError {
  constructor(options: CommonErrorOptions = {}) {
    super({
      status: 400,
      event: options.event ?? LOG_EVENT.HTTP_BAD_REQUEST,
      message: options.message ?? LOG_MESSAGE.HTTP_BAD_REQUEST,
      userMessage: options.userMessage ?? '잘못된 요청입니다.',
      details: options.detail,
      scope: options.scope,
      cause: options.cause,
    });
  }
}

export class UnauthorizedError extends AppError {
  constructor(options: CommonErrorOptions = {}) {
    super({
      status: 401,
      event: options.event ?? LOG_EVENT.HTTP_UNAUTHORIZED,
      message: options.message ?? LOG_MESSAGE.HTTP_UNAUTHORIZED,
      userMessage: options.userMessage ?? '인증이 필요합니다.',
      details: options.detail,
      scope: options.scope,
      cause: options.cause,
    });
  }
}

export class ForbiddenError extends AppError {
  constructor(options: CommonErrorOptions = {}) {
    super({
      status: 403,
      event: options.event ?? LOG_EVENT.HTTP_FORBIDDEN,
      message: options.message ?? LOG_MESSAGE.HTTP_FORBIDDEN,
      userMessage: options.userMessage ?? '접근 권한이 없습니다.',
      details: options.detail,
      scope: options.scope,
      cause: options.cause,
    });
  }
}

export class NotFoundError extends AppError {
  constructor(options: CommonErrorOptions = {}) {
    super({
      status: 404,
      event: options.event ?? LOG_EVENT.HTTP_NOT_FOUND,
      message: options.message ?? LOG_MESSAGE.HTTP_NOT_FOUND,
      userMessage: '요청한 리소스를 찾을 수 없습니다.',
      details: options.detail,
      scope: options.scope,
      cause: options.cause,
    });
  }
}

export class ConflictError extends AppError {
  constructor(options: CommonErrorOptions = {}) {
    super({
      status: 409,
      event: options.event ?? LOG_EVENT.HTTP_CONFLICT,
      message: options.message ?? LOG_MESSAGE.HTTP_CONFLICT,
      userMessage: '이미 존재하는 데이터입니다.',
      details: options.detail,
      scope: options.scope,
      cause: options.cause,
    });
  }
}

export class UnprocessableContent extends AppError {
  constructor(options: CommonErrorOptions = {}) {
    super({
      status: 422,
      event: options.event ?? LOG_EVENT.HTTP_UNPROCESSABLE_CONTENT,
      message: options.message ?? LOG_MESSAGE.HTTP_UNPROCESSABLE_CONTENT,
      userMessage: options.userMessage ?? '유효성 검사 실패',
      details: options.detail,
      scope: options.scope,
      cause: options.cause,
    });
  }
}

export class InternalServerError extends AppError {
  constructor(options: CommonErrorOptions = {}) {
    super({
      status: 500,
      event: options.event ?? LOG_EVENT.HTTP_INTERNAL_SERVER_ERROR,
      message: options.message ?? LOG_MESSAGE.HTTP_INTERNAL_SERVER_ERROR,
      userMessage: options.userMessage ?? '일시적인 오류가 발생했습니다.',
      details: options.detail,
      cause: options.cause,
      scope: options.scope,
    });
  }
}
