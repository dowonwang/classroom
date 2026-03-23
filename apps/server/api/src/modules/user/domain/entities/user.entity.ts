import { UserEmail } from '../value-objects/email.vo';
import { UserName } from '../value-objects/name.vo';
import { UserPassword } from '../value-objects/password.vo';

export const USER_ROLE = {
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
export type UserProps = {
  name: UserName;
  uuid: string;
  email: UserEmail;
  role: UserRole;
  password: UserPassword;
  id?: bigint;
  createdAt?: Date;
  updatedAt?: Date;
};

export class User {
  private props: UserProps;

  private constructor(props: UserProps) {
    this.props = props;
  }

  static create(props: UserProps): User {
    return new User(props);
  }

  changeName(name: UserName) {
    this.props.name = name;
  }

  changeRole(role: UserRole) {
    this.props.role = role;
  }

  changePassword(password: UserPassword) {
    this.props.password = password;
  }

  get id(): UserProps['id'] {
    return this.props.id;
  }

  get uuid(): UserProps['uuid'] {
    return this.props.uuid;
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get name(): UserName {
    return this.props.name;
  }

  get role(): UserProps['role'] {
    return this.props.role;
  }

  get password(): UserPassword {
    return this.props.password;
  }
}
