import { PrismaUserCommandRepository } from '../user/infrastructure/repositories/prisma-user-command.repository';
import { SignInHandler } from './application/commands/sign-in/sign-in.handler';
import { SignUpHandler } from './application/commands/sign-up/sign-up.handler';
import { BcryptPasswordHasher } from './infrastructure/services/bcrypt-password-hasher';
import { JwtTokenIssuer } from './infrastructure/services/jwt-token-issuer';
import { createAuthController } from './presentation/auth.controller';
import { prismaApiClient } from '@packages/api-db';
import 'dotenv/config';

export default function authModule() {
  const userCommandRepository = new PrismaUserCommandRepository(
    prismaApiClient,
  );
  const passwordHasher = new BcryptPasswordHasher();
  const tokenIssuer = new JwtTokenIssuer(
    process.env.JWT_SECRET,
    process.env.JWT_EXPIRES,
  );

  const signUpHandler = new SignUpHandler(
    userCommandRepository,
    passwordHasher,
  );

  const signInHandler = new SignInHandler(
    userCommandRepository,
    passwordHasher,
    tokenIssuer,
  );

  return createAuthController({
    signUpHandler,
    signInHandler,
  });
}
