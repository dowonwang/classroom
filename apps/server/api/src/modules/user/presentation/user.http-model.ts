import z from 'zod';

export const UserHttpModel = {
  createUserBody: z.object({
    email: z.string().trim().toLowerCase(),
    name: z.string().trim(),
    password: z.string().trim(),
  }),
};

export type UserHttpModel = {
  [K in keyof typeof UserHttpModel]: z.infer<(typeof UserHttpModel)[K]>;
};
