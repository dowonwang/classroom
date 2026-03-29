import { UserCommandRepository } from '../../../../user/domain/repositories/user-command.repository';

export class SignInHandler {
  constructor(private readonly userCommandRepository: UserCommandRepository) {}
}
