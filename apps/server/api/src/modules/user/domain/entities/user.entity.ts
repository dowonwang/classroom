import { UserEmail } from '../value-objects/email.vo';
import { UserName } from '../value-objects/name.vo';
import { UserPassword } from '../value-objects/password.vo';
import { UserUUID } from '../value-objects/uuid.vo';

export interface UserProps {
  uuid: UserUUID;
  email: UserEmail;
  password: UserPassword;
  name: UserName;

  id?: bigint;
  createdAt?: Date;
  updatedAt?: Date;
}

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

  changePassword(password: UserPassword) {
    this.props.password = password;
  }

  get id(): UserProps['id'] {
    return this.props.id;
  }

  get uuid(): UserUUID {
    return this.props.uuid;
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get name(): UserName {
    return this.props.name;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
}
