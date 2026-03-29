import { errorPlugin } from '../../../shared/http/plugin/error.plugin';
import { ApiResponseBuilder } from '../../../shared/responses/api-response-builder';
import { SignUpHandler } from '../application/commands/sign-up/sign-up.handler';
import { AuthHttpModel } from './auth.http-model';
import Elysia from 'elysia';

type AuthControllerDependencies = {
  signUpHandler: SignUpHandler;
};

export function createAuthController(deps: AuthControllerDependencies) {
  return new Elysia({ prefix: '/auth' })
    .use(errorPlugin)
    .model(AuthHttpModel)
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
          tags: ['Auth'],
          summary: 'Sign Up User',
        },
      },
    );
}
