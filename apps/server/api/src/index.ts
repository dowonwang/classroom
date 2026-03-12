import { userModule } from './modules/user';
import 'dotenv/config';
import { Elysia } from 'elysia';

const app = new Elysia().use(userModule).listen(process.env.APP_PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
