import { prismaApiClient } from '@packages/api-db';

import { AddMemberHandler } from '$modules/organization/application/commands/add-member/add-member.handler';
import { CreateHandler } from '$modules/organization/application/commands/create/create.handler';
import { PrismaOrganizationCommandRepository } from '$modules/organization/infrastructure/repositories/prisma-organization-command.repository';
import { createOrganizationController } from '$modules/organization/presentation/organization.controller';

// repository
const organizationCommandRepository = new PrismaOrganizationCommandRepository(
  prismaApiClient,
);

// handler
const createHandler = new CreateHandler(organizationCommandRepository);
const addMemberHandler = new AddMemberHandler(organizationCommandRepository);

// module
const organizationModule = createOrganizationController({
  createHandler,
  addMemberHandler,
});

export default organizationModule;
