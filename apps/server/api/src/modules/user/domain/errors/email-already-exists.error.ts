import { ConflictError } from '../../../../shared/errors/common.erorr';
import { User } from '../entities/user.entity';
import { USER_LOG_EVENT } from './constant/user-log-event';
import { USER_LOG_MESSAGE } from './constant/user-log-message';

export class EmailAlreadyExists extends ConflictError {
  constructor(scope: string, userId: User['id']) {
    super(
      USER_LOG_EVENT.USER_EMAIL_ALREADY_EXIST,
      USER_LOG_MESSAGE.USER_EMAIL_ALREADY_EXIST,
      undefined,
      scope,
      { userId },
    );
  }
}
