import { Elysia } from 'elysia';

import { errorPlugin } from '$shared/http/plugin/error.plugin';

export const createUserController = () =>
  new Elysia({ prefix: '/users' }).use(errorPlugin);
