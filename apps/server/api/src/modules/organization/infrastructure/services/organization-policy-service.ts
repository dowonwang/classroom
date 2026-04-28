import type { OrganizationQueryRepository } from '$modules/organization/domain/repositories/organization-query.repository';
import type { OrganizationPolicy } from '$modules/organization/domain/services/organization-policy';

export class OrganizationPolicyService implements OrganizationPolicy {
  constructor(
    private readonly organizationQueryRepository: OrganizationQueryRepository,
  ) {}

  async assertCreatableTitleByUser(
    userId: string,
    title: string,
  ): Promise<void> {
    const exist =
      await this.organizationQueryRepository.findOrganizationIdByUserIdAndTitle(
        userId,
        title,
      );

    if (exist) {
      throw new Error('이미 같은 이름의 조직을 생성했거나 관리하고 있습니다.');
    }
  }
}
