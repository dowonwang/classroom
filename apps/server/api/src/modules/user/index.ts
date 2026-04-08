import { createUserController } from './presentation/user.controller';

export const userModule = () => {
  return createUserController();
};
