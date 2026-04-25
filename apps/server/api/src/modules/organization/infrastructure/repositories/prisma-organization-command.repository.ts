import { OrganizationPrismaMapper } from '$modules/organization/infrastructure/mappers/organization-prisma.mapper';

import type { Organization } from '$modules/organization/domain/entities/organization.entity';
import type { OrganizationCommandRepository } from '$modules/organization/domain/repositories/organization-command.repository';
import type { PrismaClient } from '@packages/api-db';
import type { OrganizationMemberCreateManyArgs } from '@packages/api-db/generated/prisma/models';

export class PrismaOrganizationCommandRepository implements OrganizationCommandRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(organization: Organization): Promise<void> {
    const members = organization.getMembers();
    const membersRecord: OrganizationMemberCreateManyArgs['data'] = members.map(
      (member) => ({
        id: member.id.getValue(),
        userId: member.userId.getValue(),
        organizationId: member.organizationId.getValue(),
        role: member.role,
      }),
    );

    await this.prisma.$transaction(async (tx) => {
      await tx.organization.create({
        data: {
          id: organization.id.getValue(),
          title: organization.title,
        },
      });

      await tx.organizationMember.createMany({
        data: membersRecord,
      });
    });
  }

  async findOrganizationById(id: string): Promise<Organization | null> {
    const organization = await this.prisma.organization.findUnique({
      where: { id },
      include: { organizationMembers: true },
    });

    const members = organization?.organizationMembers;

    if (organization && members) {
      return OrganizationPrismaMapper.toOrganizationDomain(
        organization,
        members,
      );
    }

    return null;
  }
}
