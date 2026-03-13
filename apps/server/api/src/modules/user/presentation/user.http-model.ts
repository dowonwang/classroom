import z from 'zod';

export const UserHttpModel = {
  createUserBody: z.object({
    email: z.email(),
    name: z.string(),
    role: z.enum(['STUDENT', 'TEACHER']),
    password: z.string(),
  }),
};

export type UserHttpModel = {
  [K in keyof typeof UserHttpModel]: z.infer<(typeof UserHttpModel)[K]>;
};
