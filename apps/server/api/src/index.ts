import { Elysia } from "elysia";
import "dotenv/config";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .listen(process.env.APP_PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
