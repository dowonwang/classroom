import createMiddleware from 'next-intl/middleware';

import { routing } from '$app/i18n';

import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export function handleI18n(request: NextRequest) {
  return intlMiddleware(request);
}
