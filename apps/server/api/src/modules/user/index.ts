import { PrismaUserCommandRepository } from './infrastructure/repositories/prisma-user-command.repository';
import { PrismaUserQueryRepository } from './infrastructure/repositories/prisma-user-query.repository';
import { createUserController } from './presentation/user.controller';
import { prismaApiClient } from '@packages/api-db';

export const userModule = () => {
  const userCommandRepository = new PrismaUserCommandRepository(
    prismaApiClient,
  );
  const userQueryRepository = new PrismaUserQueryRepository(prismaApiClient);

  return createUserController({});
};
