import { UserDetailDto } from '../../../../user/application/dto/user-detail.dto';
import { UserDtoMapper } from '../../../../user/application/mappper/user-dto.mapper';
import { InvaildCredentials } from '../../../../user/domain/errors/invaild-credentials.error';
import { UserCommandRepository } from '../../../../user/domain/repositories/user-command.repository';
import { UserEmail } from '../../../../user/domain/value-objects/email.vo';
import { PasswordHaser } from '../../../domain/services/password-hasher';
import { TokenIssuer } from '../../../domain/services/token-issuer';
import { SignInCommand } from './sign-in.command';

export class SignInHandler {
  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly passwordHasher: PasswordHaser,
    private readonly tokenIssuer: TokenIssuer,
  ) {}

  async excute(command: SignInCommand): Promise<{
    accessToken: string;
    user: UserDetailDto;
  }> {
    const email = UserEmail.create(command.email);
    const user = await this.userCommandRepository.findByEmail(email.getValue());

    if (!user) {
      throw new InvaildCredentials(SignInHandler.name);
    }

    const isMatched = await this.passwordHasher.compare(
      command.password,
      user.password.getValue(),
    );

    if (!isMatched) {
      throw new InvaildCredentials(SignInHandler.name);
    }

    const accessToken = await this.tokenIssuer.issueAccessToken({
      sub: user.uuid.getValue(),
    });

    return {
      accessToken,
      user: UserDtoMapper.fromEntity(user),
    };
  }
}
