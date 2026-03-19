import { User } from '../../../domain/entities/user.entity';
import { EmailAlreadyExists } from '../../../domain/errors/email-already-exists.error';
import { UserCommandRepository } from '../../../domain/repositories/user-command.repository';
import { PasswordHasher } from '../../../domain/services/password-hasher';
import { UserEmail } from '../../../domain/value-objects/email.vo';
import { UserName } from '../../../domain/value-objects/name.vo';
import { UserPassword } from '../../../domain/value-objects/password.vo';
import { CreateUserCommand } from './create-user.command';
import { randomUUIDv7 } from 'bun';

export class CreateUserHandler {
  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly passwordHaser: PasswordHasher,
  ) {}

  async execute(command: CreateUserCommand): Promise<{ uuid: string }> {
    const email = UserEmail.create(command.email);

    const existing = await this.userCommandRepository.findByEmail(
      email.getValue(),
    );

    if (existing) {
      throw new EmailAlreadyExists(CreateUserHandler.name, existing.id);
    }

    const hashedPassword = await this.passwordHaser.hash(command.password);
    const name = UserName.create(command.name);

    const user = User.create({
      uuid: randomUUIDv7(),
      email,
      name,
      password: UserPassword.fromHashed(hashedPassword),
      role: command.role,
    });

    await this.userCommandRepository.save(user);

    return { uuid: user.uuid };
  }
}
