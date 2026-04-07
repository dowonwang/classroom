import { UnprocessableContent } from '$shared/errors/common.erorr';

import type { ZodError } from 'zod';

export function ZodErrorMapper(
  error: ZodError,
  scope: string,
): UnprocessableContent {
  return new UnprocessableContent({
    scope,
    detail: error.issues.map(({ path, message }) => ({ path, message })),
  });
}
