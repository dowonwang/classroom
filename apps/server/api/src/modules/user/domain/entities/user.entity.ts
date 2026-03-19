import { UserEmail } from '../value-objects/email.vo';
import { UserName } from '../value-objects/name.vo';
import { UserPassword } from '../value-objects/password.vo';
import type { UserRole, User as UserType } from '@packages/api-db';

type UserTypeOverrides = {
  password: UserPassword;
  email: UserEmail;
  name: UserName;
  id?: UserType['id'];
  createdAt?: UserType['createdAt'];
  updatedAt?: UserType['updatedAt'];
};

export type UserProps = Omit<UserType, keyof UserTypeOverrides> &
  UserTypeOverrides;

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
