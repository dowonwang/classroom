import { authGuard } from '..';
import { errorPlugin } from '../../../shared/http/plugin/error.plugin';
import { ApiResponseBuilder } from '../../../shared/responses/api-response-builder';
import { SignInHandler } from '../application/commands/sign-in/sign-in.handler';
import { SignUpHandler } from '../application/commands/sign-up/sign-up.handler';
import { MeHandler } from '../application/queries/me/me.handler';
import { AuthHttpModel } from './auth.http-model';
import Elysia from 'elysia';

type AuthControllerDependencies = {
  signUpHandler: SignUpHandler;
  signInHandler: SignInHandler;
  meHandler: MeHandler;
};

export function createAuthController(deps: AuthControllerDependencies) {
  return (
    new Elysia({
      prefix: '/auth',
      detail: {
        tags: ['Auth'],
      },
    })
      .use(errorPlugin)
      .model(AuthHttpModel)
      // POST /auth/sign-up
      .post(
        '/sign-up',
        async ({ body, set }) => {
          const result = await deps.signUpHandler.execute(body);
          set.status = 201;

          return ApiResponseBuilder.success(result);
        },
        {
          body: 'signUpBody',
          detail: {
            summary: 'Sign Up User',
          },
        },
      )
      // POST /auth/sign-in
      .post(
        '/sign-in',
        async ({ body }) => {
          const result = await deps.signInHandler.excute(body);

          return ApiResponseBuilder.success(result);
        },
        {
          body: 'signInBody',
          detail: {
            summary: 'Sign In User',
          },
        },
      )
      // 액세스 토큰 검증 필요 라우터
      .use(authGuard)
      // GET /auth/me
      .get(
        '/me',
        async ({ authUser }) => {
          const result = await deps.meHandler.excute(authUser);

          return ApiResponseBuilder.success(result);
        },
        {
          detail: {
            summary: 'Get Current User',
          },
        },
      )
  );
}
