import { z } from 'zod';

import type { OrganizationMember } from '$modules/organization/domain/entities/organization-member.entity';

interface OrganizationProps {
  id: bigint;
  title: string;
  members: OrganizationMember[];
}

export class Organization {
  private readonly id: bigint;
  private title: string;
  private members: OrganizationMember[] = [];

  private constructor({ id, title, members }: OrganizationProps) {
    this.validation({ id, title });

    this.id = id;
    this.title = title;
    this.members = [...members];
  }

  static create(props: OrganizationProps): Organization {
    return new Organization(props);
  }

  private validation({ id, title }: Omit<OrganizationProps, 'members'>): void {
    const trimTitle = title.trim();
    const schema = z.bigint().positive();

    const { success } = schema.safeParse(id);

    if (!success) {
      throw new Error('잘못된 형식');
    }

    if (trimTitle === '') {
      throw new Error('잘못된 형식');
    }
  }

  addMember(members: OrganizationMember[]) {
    if (members.length > 0) {
      this.members = [...this.members, ...members];
    }
  }

  hasMember;
}
