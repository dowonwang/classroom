import type { Organization } from '$modules/organization/domain/entities/organization.entity';

export interface OrganizationCommandRepository {
  save(organization: Organization): Promise<void>;
  findById(id: bigint): Promise<Organization | null>;
}
