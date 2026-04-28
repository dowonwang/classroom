import { OrganizationUuid } from '$modules/organization/domain/value-objects/organization-uuid.vo';
import { UserUuid } from '$modules/user/domain/value-objects/uuid.vo';

import type { OrganizationCommandRepository } from '$modules/organization/domain/repositories/organization-command.repository';
import type { AddMemberCommand } from './add-member.command';

export class AddMemberHandler {
  constructor(
    private readonly organizationCommandRepository: OrganizationCommandRepository,
  ) {}

  async execute(command: AddMemberCommand): Promise<void> {
    const organizationId = OrganizationUuid.create(command.organizationId);

    const organization =
      await this.organizationCommandRepository.findOrganizationById(
        organizationId.getValue(),
      );

    if (!organization) {
      throw Error('조직 찾을 수 없음');
    }

    organization.addMember(
      UserUuid.create(command.userId),
      command.members.map((member) => ({
        userId: UserUuid.create(member.userId),
        role: member.role,
      })),
    );

    await this.organizationCommandRepository.save(organization);
  }
}
