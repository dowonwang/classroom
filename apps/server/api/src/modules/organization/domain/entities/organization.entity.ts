import { OrganizationMember } from '$modules/organization/domain/entities/organization-member.entity';

import type { OrganizationMemberRole } from '@packages/api-db';

interface OrganizationProps {
  id: bigint;
  title: string;
}

export class Organization {
  private members: OrganizationMember[] = [];

  private constructor(
    private props: OrganizationProps,
    members: OrganizationMember[],
  ) {
    this.props = { ...props };
    this.members = [...members];
  }

  static create(
    props: OrganizationProps,
    members: OrganizationMember[],
  ): Organization {
    return new Organization(props, members);
  }

  addMember(
    executor: OrganizationMember,
    entries: { userId: bigint; role: OrganizationMemberRole }[],
  ) {
    if (!executor.canAddMember()) {
      throw new Error('추가 권한 없음');
    }

    if (executor.organizationId !== this.props.id) {
      throw new Error('같은 조직만 멤버 추가 가능');
    }

    if (!this.hasMember(executor.id)) {
      throw new Error('조직에 속한 멤버만 추가 가능');
    }

    const newMembers = entries.map((entry) => {
      if (this.hasMember(entry.userId)) {
        throw new Error('이미 속한 멤버');
      }

      return OrganizationMember.create({
        id: BigInt(10),
        organizationId: this.props.id,
        role: entry.role,
        userId: entry.userId,
      });
    });

    this.members = [...this.members, ...newMembers];
  }

  hasMember(userId: bigint): boolean {
    return this.members.some((member) => member.userId === userId);
  }

  getAdmin(): OrganizationMember | null {
    return this.members.find((member) => member.role === 'ADMIN') ?? null;
  }

  getMembers() {
    return [...this.members];
  }

  get id() {
    return this.props.id;
  }

  get title() {
    return this.props.title;
  }
}
