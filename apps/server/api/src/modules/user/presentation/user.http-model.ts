import z from 'zod';

export const UserHttpModel = {};

export type UserHttpModel = {
  [K in keyof typeof UserHttpModel]: z.infer<(typeof UserHttpModel)[K]>;
};
