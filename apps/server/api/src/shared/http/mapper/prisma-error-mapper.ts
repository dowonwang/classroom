import { AppError } from '../../errors/app.error';
import {
  BadRequestError,
  ConflictError,
  InternalServerError,
} from '../../errors/common.erorr';
import { LOG_EVENT } from '../../logger/constant/log-event';
import { LOG_MESSAGE } from '../../logger/constant/log-message';
import { Prisma } from '@packages/api-db';

const SCOPE = 'PRISMA' as const;

export function PrismaErrorMapper(error: unknown): AppError | null {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(error.code);

    return new ConflictError({
      scope: SCOPE,
      event: LOG_EVENT.PRISMA_CLIENT_KNOWN_REQUEST,
      message: LOG_MESSAGE.PRISMA_CLIENT_KNOWN_REQUEST,
      detail: error.code,
      cause: error.message,
    });
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return new InternalServerError({
      scope: SCOPE,
      event: LOG_EVENT.PRISMA_CLIENT_UNKNOWN_REQUEST,
      message: LOG_MESSAGE.PRISMA_CLIENT_UNKNOWN_REQUEST,
      cause: error.message,
    });
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return new InternalServerError({
      scope: SCOPE,
      event: LOG_EVENT.PRISMA_CLINET_RUST_PANIC,
      message: LOG_MESSAGE.PRISMA_CLINET_RUST_PANIC,
      cause: error.message,
    });
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return new InternalServerError({
      scope: SCOPE,
      event: LOG_EVENT.PRISMA_CLIENT_INITIALIZATION,
      message: LOG_MESSAGE.PRISMA_CLIENT_INITIALIZATION,
      cause: error.message,
    });
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return new BadRequestError({
      scope: SCOPE,
      event: LOG_MESSAGE.PRISMA_CLIENT_VALIDATION,
      message: LOG_MESSAGE.PRISMA_CLIENT_VALIDATION,
      cause: error.message,
    });
  }

  return null;
}
