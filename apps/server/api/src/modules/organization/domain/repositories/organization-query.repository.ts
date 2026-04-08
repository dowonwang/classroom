import type { Organization } from '$modules/organization/domain/entities/organization.entity';

export interface OrganizationQueryRepository {
  findByUUID(uuid: string): Promise<Organization | null>;
}
