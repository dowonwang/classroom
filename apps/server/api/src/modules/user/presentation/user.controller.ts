import { errorPlugin } from '../../../shared/http/plugin/error.plugin';
import { CreateUserHandler } from '../application/commands/create-user/create-user.handler';
import { UserHttpModel } from './user.http-model';
import Elysia from 'elysia';

type Dependencies = {
  createUserHandler: CreateUserHandler;
};

export const createUserController = (deps: Dependencies) =>
  new Elysia({ prefix: '/users' })
    .use(errorPlugin)
    .model(UserHttpModel)
    .post(
      '/',
      async ({ body, set }) => {
        const result = await deps.createUserHandler.execute(body);
        set.status = 201;
        return result;
      },
      {
        body: 'createUserBody',
        detail: {
          tags: ['User'],
          summary: 'Create user',
        },
      },
    );
