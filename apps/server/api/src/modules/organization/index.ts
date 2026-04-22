import { prismaApiClient } from '@packages/api-db';

import { CreateHandler } from '$modules/organization/application/commands/create/create.handler';
import { PrismaOrganizationCommandRepository } from '$modules/organization/infrastructure/repositories/prisma-organization-command.repository';
import { createOrganizationController } from '$modules/organization/presentation/organization.controller';

const organizationCommandRepository = new PrismaOrganizationCommandRepository(
  prismaApiClient,
);

export default function organizationModule() {
  const createHandler = new CreateHandler(organizationCommandRepository);

  return createOrganizationController({
    createHandler,
  });
}
