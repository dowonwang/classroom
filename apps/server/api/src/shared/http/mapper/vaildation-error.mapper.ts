import { UnprocessableContent } from '../../errors/common.erorr';
import { ValidationError } from 'elysia';

export function VaildationErrorMapper(
  error: ValidationError,
): UnprocessableContent {
  const detail = error.detail('Vaildation', false);

  if (typeof detail !== 'string') {
    const errors = detail.errors;

    if (errors && Array.isArray(errors)) {
      return new UnprocessableContent(
        undefined,
        undefined,
        undefined,
        undefined,
        errors.map(({ path, message }) => ({
          path,
          message,
        })),
      );
    }
  }

  return new UnprocessableContent();
}
