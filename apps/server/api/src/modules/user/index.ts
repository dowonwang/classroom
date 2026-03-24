import { CreateUserHandler } from './application/commands/create-user/create-user.handler';
import { PrismaUserCommandRepository } from './infrastructure/repositories/prisma-user-command.repository';
import { PrismaUserQueryRepository } from './infrastructure/repositories/prisma-user-query.repository';
import { BcryptPasswordHasher } from './infrastructure/services/bcrypt-password-hasher';
import { createUserController } from './presentation/user.controller';
import { prismaApiClient } from '@packages/api-db';

export const userModule = () => {
  const userCommandRepository = new PrismaUserCommandRepository(
    prismaApiClient,
  );
  const userQueryRepository = new PrismaUserQueryRepository(prismaApiClient);
  const passwordHasher = new BcryptPasswordHasher();

  const createUserHandler = new CreateUserHandler(
    userCommandRepository,
    passwordHasher,
  );

  return createUserController({
    createUserHandler,
  });
};
