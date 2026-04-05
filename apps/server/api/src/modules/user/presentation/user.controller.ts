import { errorPlugin } from '../../../shared/http/plugin/error.plugin';
import Elysia from 'elysia';

export const createUserController = () =>
  new Elysia({ prefix: '/users' }).use(errorPlugin);
