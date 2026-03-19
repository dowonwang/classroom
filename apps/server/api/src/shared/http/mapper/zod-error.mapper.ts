import { UnprocessableContent } from '../../errors/common.erorr';
import { ZodError } from 'zod';

export function ZodErrorMapper(
  error: ZodError,
  scope: string,
): UnprocessableContent {
  return new UnprocessableContent(
    undefined,
    undefined,
    undefined,
    scope,
    error.issues.map(({ path, message }) => ({ path, message })),
  );
}
