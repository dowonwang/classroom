export type OrganizationMemberRole = 'ADMIN' | 'MAINTAINER' | 'MEMBER';

interface Props {
  id: bigint;
  organizationId: bigint;
  userId: bigint;
  role: OrganizationMemberRole;
}

export class OrganizationMember {
  private constructor(private props: Props) {
    this.props = { ...props };
  }

  static create(props: Props) {
    return new OrganizationMember(props);
  }

  canAddMember(): boolean {
    const allowRole: OrganizationMemberRole[] = ['ADMIN', 'MAINTAINER'];

    return allowRole.includes(this.props.role);
  }

  get id() {
    return this.props.id;
  }

  get userId() {
    return this.props.userId;
  }

  get role() {
    return this.props.role;
  }

  get organizationId() {
    return this.props.organizationId;
  }
}
