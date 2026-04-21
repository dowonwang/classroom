import { OrganizationMember } from '$modules/organization/domain/entities/organization-member.entity';
import { OrganizationMemberUuid } from '$modules/organization/domain/value-objects/organization-member-uuid.vo';
import { Entity } from '$shared/ddd/entity.abstract';

import type { OrganizationMemberRole } from '$modules/organization/domain/entities/organization-member.entity';
import type { OrganizationUuid } from '$modules/organization/domain/value-objects/organization-uuid.vo';
import type { UserUuid } from '$modules/user/domain/value-objects/uuid.vo';

interface OrganizationProps {
  title: string;
}

export class Organization extends Entity<OrganizationUuid> {
  private members: OrganizationMember[] = [];
  private props: OrganizationProps;

  private constructor(
    id: OrganizationUuid,
    props: OrganizationProps,
    members: OrganizationMember[],
  ) {
    super(id);

    this.validateTitle(props.title);
    this.validateInitialMembers(id, members);

    this.props = { ...props };
    this.members = [...members];
  }

  static create(
    id: OrganizationUuid,
    props: OrganizationProps,
    members: OrganizationMember[],
  ): Organization {
    return new Organization(id, props, members);
  }

  private validateTitle(title: string): void {
    const trimmed = title.trim();

    if (!trimmed) {
      throw new Error('조직명은 비어 있을 수 없음');
    }
  }

  private validateInitialMembers(
    organizationId: OrganizationUuid,
    members: OrganizationMember[],
  ): void {
    if (members.length === 0) {
      throw new Error('초기 생성 시 멤버는 최소 한 명 이상이어야 함');
    }

    for (const member of members) {
      if (!member.organizationId.equals(organizationId)) {
        throw new Error('조직에 속하지 않은 멤버 데이터');
      }
    }

    const uniqueUserIds = new Set(
      members.map((member) => member.userId.getValue()),
    );

    if (uniqueUserIds.size !== members.length) {
      throw new Error('중복 멤버 데이터 존재');
    }

    const adminUser = members.filter((member) => member.role === 'ADMIN');

    if (adminUser.length === 0) {
      throw new Error('관리자는 1명 필수');
    }

    if (adminUser.length > 1) {
      throw new Error('관리자는 1명 초과 불가');
    }
  }

  private validateDuplicateEntries(
    entries: { userId: UserUuid; role: OrganizationMemberRole }[],
  ): void {
    const uniqueUserIds = new Set(
      entries.map((entry) => entry.userId.getValue()),
    );

    if (uniqueUserIds.size !== entries.length) {
      throw new Error('중복 데이터 있음');
    }
  }

  addMember(
    executorUserId: UserUuid,
    entries: { userId: UserUuid; role: OrganizationMemberRole }[],
  ) {
    this.validateDuplicateEntries(entries);

    const executor = this.members.find((member) =>
      member.userId.equals(executorUserId),
    );

    if (!executor) {
      throw new Error('조직에 속한 멤버만 추가 가능');
    }

    if (!executor.organizationId.equals(super.id)) {
      /**
       * 위 조건이랑 중복인 검증
       * 의도치 않은 데이터 방지 위해 유지
       */
      throw new Error('잘못된 멤버 데이터');
    }

    if (!executor.canAddMember()) {
      throw new Error('추가 권한 없음');
    }

    const newMembers = entries.map((entry) => {
      if (this.hasMember(entry.userId)) {
        throw new Error('이미 속한 멤버');
      }

      return OrganizationMember.create(OrganizationMemberUuid.generate(), {
        userId: entry.userId,
        organizationId: this.id,
        role: entry.role,
      });
    });

    this.members = [...this.members, ...newMembers];
  }

  hasMember(userId: UserUuid): boolean {
    return this.members.some((member) => member.userId.equals(userId));
  }

  getAdmin(): OrganizationMember | null {
    return this.members.find((member) => member.role === 'ADMIN') ?? null;
  }

  getMembers() {
    return [...this.members];
  }

  get title() {
    return this.props.title;
  }
}
