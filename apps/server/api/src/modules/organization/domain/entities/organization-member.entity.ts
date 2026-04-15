export type OrganizationMemberRole = 'ADMIN' | 'MAINTAINER' | 'MEMBER';

interface Props {
  id: bigint;
  organizationId: bigint;
  userId: bigint;
  role: OrganizationMemberRole;
}

export class OrganizationMember {
  private readonly id: bigint;
  private readonly organizationId: bigint;
  private readonly userId: bigint;
  private role: OrganizationMemberRole;

  constructor({ id, organizationId, role, userId }: Props) {
    this.id = id;
    this.organizationId = organizationId;
    this.role = role;
    this.userId = userId;
  }
}
