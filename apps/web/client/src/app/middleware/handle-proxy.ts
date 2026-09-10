import { clearAuthCookieToResponse } from '$shared/lib/cookie/server';

import { handleI18n } from './handle-i18n';
import { handleSession } from './handle-session';
import { createSignInRedirect } from './lib/create-sign-in-redirect';
import { mergeResponseCookies } from './lib/merge-response-cookies';
import { resolveRouteScope } from './lib/resolve-route-scope';

import type { NextResponse, NextRequest } from 'next/server';

export async function handleProxy(request: NextRequest): Promise<NextResponse> {
  const scope = resolveRouteScope(request.nextUrl.pathname);
  const session = await handleSession(request);

  if (scope === 'private') {
    // private route

    if (session.status === 'anonymous' || session.status === 'invalid') {
      return createSignInRedirect(request);
    }

    return session.response;
  }

  // public route
  const response = handleI18n(request);

  if (session.status !== 'invalid') {
    return mergeResponseCookies(session.response, response);
  }

  clearAuthCookieToResponse(response);

  return response;
}
