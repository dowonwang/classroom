interface OrganizationProps {
  uuid: string;
  name: string;
  ownerUserId: bigint;

  id?: bigint;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Organization {
  private props: OrganizationProps;

  private constructor(props: OrganizationProps) {
    this.props = { ...props };
  }

  static create(props: OrganizationProps): Organization {
    return new Organization(props);
  }
}
