import { AppError } from './app.error';

export class BadRequestError extends AppError {
  constructor(
    message = 'Bad request',
    userMessage = '잚못된 요청입니다.',
    details?: unknown,
  ) {
    super({
      code: 'BAD_REQUEST',
      status: 400,
      message,
      userMessage,
      details,
    });
  }
}

export class UnauthorizedError extends AppError {
  constructor(
    message = 'Unauthorized',
    userMessage = '인증이 필요합니다.',
    details?: unknown,
  ) {
    super({
      code: 'UNAUTHORIZED',
      status: 401,
      userMessage,
      message,
      details,
    });
  }
}

export class ForbiddenError extends AppError {
  constructor(
    message = 'Forbidden',
    userMessage = '접근 권한이 없습니다.',
    details?: unknown,
  ) {
    super({
      code: 'FORBIDDEN',
      status: 403,
      userMessage,
      message,
      details,
    });
  }
}

export class NotFoundError extends AppError {
  constructor(
    message = 'Resource not found.',
    userMessage = '요청한 리소스를 찾을 수 없습니다.',
    details?: unknown,
  ) {
    super({
      code: 'NOT_FOUND',
      status: 404,
      userMessage,
      message,
      details,
    });
  }
}

export class ConflictError extends AppError {
  constructor(
    message = 'Resource conflict.',
    userMessage = '이미 존재하는 데이터입니다.',
    details?: unknown,
  ) {
    super({
      code: 'CONFLICT',
      status: 409,
      userMessage,
      message,
      details,
    });
  }
}

export class InternalServerError extends AppError {
  constructor(
    message = 'Internal server error.',
    userMessage = '일시적인 오류가 발생했습니다.',
    details?: unknown,
    cause?: unknown,
  ) {
    super({
      code: 'INTERNAL_SERVER_ERROR',
      status: 500,
      userMessage,
      message,
      details,
      cause,
    });
  }
}
