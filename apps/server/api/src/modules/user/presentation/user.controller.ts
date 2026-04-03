import { errorPlugin } from '../../../shared/http/plugin/error.plugin';
import Elysia from 'elysia';

type Dependencies = {};

export const createUserController = (deps: Dependencies) =>
  new Elysia({ prefix: '/users' }).use(errorPlugin);
