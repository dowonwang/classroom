import { z } from 'zod';

export const AuthHttpModel = {
  signUpBody: z.object({
    email: z.string().trim().toLowerCase(),
    name: z.string().trim(),
    password: z.string().trim(),
  }),

  signInBody: z.object({
    email: z.string().trim().toLowerCase(),
    password: z.string().trim(),
  }),
};

export type AuthHttpModel = {
  [K in keyof typeof AuthHttpModel]: z.infer<(typeof AuthHttpModel)[K]>;
};
