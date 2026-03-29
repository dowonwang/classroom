import { PrismaUserCommandRepository } from '../user/infrastructure/repositories/prisma-user-command.repository';
import { SignUpHandler } from './application/commands/sign-up/sign-up.handler';
import { BcryptPasswordHasher } from './infrastructure/services/bcrypt-password-hasher';
import { createAuthController } from './presentation/auth.controller';
import { prismaApiClient } from '@packages/api-db';

export default function authModule() {
  const userCommandRepository = new PrismaUserCommandRepository(
    prismaApiClient,
  );
  const passwordHasher = new BcryptPasswordHasher();

  const signUpHandler = new SignUpHandler(
    userCommandRepository,
    passwordHasher,
  );

  return createAuthController({
    signUpHandler,
  });
}
