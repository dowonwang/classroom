import { Elysia } from 'elysia';

import { UnauthorizedError } from '$shared/errors/common.erorr';

import type { JwtTokenVerifier } from '$modules/auth/infrastructure/services/jwt-token-verifier';

export interface AuthUser {
  uuid: string;
}

export function createAuthGuard(tokenVerifier: JwtTokenVerifier) {
  const authGuard = new Elysia({ name: 'auth.guard' })
    .derive(async ({ headers }) => {
      const authorization = headers.authorization;

      if (!authorization) {
        throw new UnauthorizedError({
          scope: createAuthGuard.name,
        });
      }

      const [type, token] = authorization.split(' ');

      if (type !== 'Bearer' || !token) {
        throw new UnauthorizedError({
          scope: createAuthGuard.name,
        });
      }

      const claims = await tokenVerifier.verifyAccessToken(token);

      return {
        authUser: {
          uuid: claims.getSubject(),
        } satisfies AuthUser,
      };
    })
    .as('scoped');

  return authGuard;
}
