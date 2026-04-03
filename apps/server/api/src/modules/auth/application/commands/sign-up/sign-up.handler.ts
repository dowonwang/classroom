import { User } from '../../../../user/domain/entities/user.entity';
import { EmailAlreadyExists } from '../../../../user/domain/errors/email-already-exists.error';
import { UserCommandRepository } from '../../../../user/domain/repositories/user-command.repository';
import { UserEmail } from '../../../../user/domain/value-objects/email.vo';
import { UserName } from '../../../../user/domain/value-objects/name.vo';
import { UserPassword } from '../../../../user/domain/value-objects/password.vo';
import { UserUUID } from '../../../../user/domain/value-objects/uuid.vo';
import { PasswordHaser } from '../../../domain/services/password-hasher';
import { SignUpCommand } from './sign-up.command';

export class SignUpHandler {
  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly passwordHasher: PasswordHaser,
  ) {}

  async execute(command: SignUpCommand): Promise<{ uuid: string }> {
    const email = UserEmail.create(command.email);

    const existing = await this.userCommandRepository.findByEmail(
      email.getValue(),
    );

    if (existing) {
      throw new EmailAlreadyExists(SignUpHandler.name, existing.id);
    }

    const hashedPassword = await this.passwordHasher.hash(command.password);
    const name = UserName.create(command.name);

    const user = User.create({
      uuid: UserUUID.generate(),
      email,
      name,
      password: UserPassword.fromHashed(hashedPassword),
    });

    await this.userCommandRepository.save(user);

    return { uuid: user.uuid.getValue() };
  }
}
