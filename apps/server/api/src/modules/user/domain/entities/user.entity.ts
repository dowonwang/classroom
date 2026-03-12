import { Email } from '../value-objects/email.vo';
import { UserName } from '../value-objects/name.vo';
import { Password } from '../value-objects/password.vo';
import type { User as UserType, UserRole } from '@packages/api-db';

type UserTypeOverrides = {
  password: Password;
  email: Email;
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

  changePassword(password: Password) {
    this.props.password = password;
  }

  get id(): UserProps['id'] {
    return this.id;
  }

  get uuid(): UserProps['uuid'] {
    return this.uuid;
  }

  get email(): Email {
    return this.email;
  }

  get name(): UserName {
    return this.name;
  }

  get role(): UserProps['role'] {
    return this.role;
  }

  get password(): Password {
    return this.password;
  }
}
